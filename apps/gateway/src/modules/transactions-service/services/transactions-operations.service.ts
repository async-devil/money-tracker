import { BadRequestException, Injectable } from "@nestjs/common";

import { AccountsService } from "src/modules/accounts-service/accounts-service.service";
import { TransactionOperationType } from "src/modules/accounts-service/types/request/operate-account-dto";
import { CategoriesService } from "src/modules/categories-service/categories-service.service";

import { TransactionsService } from "../transactions-service.service";
import { CreateTransactionDto } from "../types/request/create-transaction.dto";
import { DeleteTransactionByIdDto } from "../types/request/delete-transaction-by-id.dto";
import { UpdateTransactionByIdDto } from "../types/request/update-transaction-by-id.dto";
import { Transaction, TransactionType } from "../types/response/transaction.entity";

@Injectable()
export class TransactionsOperationsService {
	constructor(
		private readonly transactionsService: TransactionsService,
		private readonly accountsService: AccountsService,
		private readonly categoriesService: CategoriesService
	) {}

	private checkIfObjectHasAtLeastOneProperty(
		object: { [name: string]: unknown },
		...properties: string[]
	): boolean {
		return !!Object.keys(object).find((key) => properties.includes(key));
	}

	/** Get array containing sender and recipient services */
	private getSenderAndRecipientServices(
		type: TransactionType
	): Array<CategoriesService | AccountsService> {
		switch (type) {
			case TransactionType.RECHARGE:
				return [this.categoriesService, this.accountsService];

			case TransactionType.WITHDRAW:
				return [this.accountsService, this.categoriesService];

			case TransactionType.TRANSFER:
				return [this.accountsService, this.accountsService];

			default:
				throw new BadRequestException("Unknow transaction type");
		}
	}

	private async checkIfSenderAndRecipientExist(
		type: TransactionType,
		ids: { from?: string; to?: string }
	): Promise<void> {
		const services = this.getSenderAndRecipientServices(type);

		const { from, to } = ids;

		if (from) await services[0].getById({ id: from });
		if (to) await services[1].getById({ id: to });
	}

	private async checkIfCurrencyMatchAccountOne(accountId: string, currency: string): Promise<void> {
		const account = await this.accountsService.getById({ id: accountId });

		if (account.currency !== currency)
			throw new BadRequestException("Currency does not mactch account one");
	}

	private async operateAccount(
		destination: string,
		amount: string,
		currency: string,
		type: TransactionOperationType
	) {
		await this.checkIfCurrencyMatchAccountOne(destination, currency);

		await this.accountsService.operate({
			accountId: destination,
			amount: amount,
			type,
		});
	}

	/**
	 * Create transaction:
	 *
	 * - Recharge type
	 *
	 * 		"Create -> Recharge.to"
	 * -------------------------------------------------------------------
	 * - Withdraw type
	 *
	 * 		"Create -> Withdraw.from"
	 * -------------------------------------------------------------------
	 * - Transfer type
	 *
	 * 		"Create -> Withdraw.from -> Recharge.to"
	 */
	public async createTransaction(dto: CreateTransactionDto): Promise<Transaction> {
		await this.checkIfSenderAndRecipientExist(dto.type, { from: dto.from, to: dto.to });

		const transaction = await this.transactionsService.create(dto);

		switch (transaction.type) {
			case TransactionType.RECHARGE:
				await this.operateAccount(
					transaction.to,
					transaction.amount_to,
					transaction.currency_to,
					TransactionType.RECHARGE
				);
				break;

			case TransactionType.WITHDRAW:
				await this.operateAccount(
					transaction.from,
					transaction.amount_from,
					transaction.currency_from,
					TransactionType.WITHDRAW
				);
				break;

			case TransactionType.TRANSFER:
				await this.operateAccount(
					transaction.from,
					transaction.amount_from,
					transaction.currency_from,
					TransactionType.WITHDRAW
				);

				await this.operateAccount(
					transaction.to,
					transaction.amount_to,
					transaction.currency_to,
					TransactionType.RECHARGE
				);
				break;

			default:
				throw new BadRequestException("Unknown transaction type");
		}

		return transaction;
	}

	/**
	 * Update transaction:
	 *
	 * - Recharge type
	 *
	 * 		"Get -> Withdraw.to -> Recharge.to with new data -> Update"
	 * -------------------------------------------------------------------
	 * - Withdraw type
	 *
	 * 		"Get -> Recharge.from -> Withdraw.from with new data -> Update"
	 * -------------------------------------------------------------------
	 * - Transfer type
	 *
	 * 		"Get -> Recharge.from -> Withdraw.to -> Recharge.from with new data -> Withdraw.to with new data -> Update"
	 */
	public async updateTransaction(dto: UpdateTransactionByIdDto): Promise<Transaction> {
		const transaction = await this.transactionsService.getById({ id: dto.id });

		if (
			this.checkIfObjectHasAtLeastOneProperty(
				dto.data as { [key: string]: unknown },
				"amount_from",
				"amount_to",
				"currency_from",
				"currency_to",
				"from",
				"to"
			)
		) {
			await this.checkIfSenderAndRecipientExist(transaction.type, {
				from: dto.data.from,
				to: dto.data.to,
			});

			switch (transaction.type) {
				case TransactionType.RECHARGE:
					await this.operateAccount(
						transaction.to,
						transaction.amount_to,
						transaction.currency_to,
						TransactionType.WITHDRAW
					);

					await this.operateAccount(
						dto.data.to || transaction.to,
						dto.data.amount_to || transaction.amount_to,
						dto.data.currency_to || transaction.currency_to,
						TransactionType.RECHARGE
					);
					break;

				case TransactionType.WITHDRAW:
					await this.operateAccount(
						transaction.from,
						transaction.amount_from,
						transaction.currency_from,
						TransactionType.RECHARGE
					);

					await this.operateAccount(
						dto.data.from || transaction.from,
						dto.data.amount_from || transaction.amount_from,
						dto.data.currency_from || transaction.currency_from,
						TransactionType.WITHDRAW
					);

					break;

				case TransactionType.TRANSFER:
					await this.operateAccount(
						transaction.from,
						transaction.amount_from,
						transaction.currency_from,
						TransactionType.RECHARGE
					);

					await this.operateAccount(
						transaction.to,
						transaction.amount_to,
						transaction.currency_to,
						TransactionType.WITHDRAW
					);

					await this.operateAccount(
						dto.data.from || transaction.from,
						dto.data.amount_from || transaction.amount_from,
						dto.data.currency_from || transaction.currency_from,
						TransactionType.WITHDRAW
					);

					await this.operateAccount(
						dto.data.to || transaction.to,
						dto.data.amount_to || transaction.amount_to,
						dto.data.currency_to || transaction.currency_to,
						TransactionType.RECHARGE
					);
					break;

				default:
					throw new BadRequestException("Unknown transaction type");
			}
		}

		return await this.transactionsService.updateById(dto);
	}

	/**
	 * Delete transaction:
	 *
	 * - Recharge type
	 *
	 * 		"Get -> Withdraw.to -> Delete"
	 * -------------------------------------------------------------------
	 * - Withdraw type
	 *
	 * 		"Get -> Recharge.from -> Delete"
	 * -------------------------------------------------------------------
	 * - Transfer type
	 *
	 * 		"Get -> Recharge.from -> Withdraw.to -> Delete"
	 */
	public async deleteTransaction(dto: DeleteTransactionByIdDto) {
		const transaction = await this.transactionsService.getById(dto);

		switch (transaction.type) {
			case TransactionType.RECHARGE:
				await this.operateAccount(
					transaction.to,
					transaction.amount_to,
					transaction.currency_to,
					TransactionType.WITHDRAW
				);
				break;

			case TransactionType.WITHDRAW:
				await this.operateAccount(
					transaction.from,
					transaction.amount_from,
					transaction.currency_from,
					TransactionType.RECHARGE
				);
				break;

			case TransactionType.TRANSFER:
				await this.operateAccount(
					transaction.from,
					transaction.amount_from,
					transaction.currency_from,
					TransactionType.RECHARGE
				);

				await this.operateAccount(
					transaction.to,
					transaction.amount_to,
					transaction.currency_to,
					TransactionType.WITHDRAW
				);
				break;
		}

		return await this.transactionsService.deleteById(dto);
	}
}
