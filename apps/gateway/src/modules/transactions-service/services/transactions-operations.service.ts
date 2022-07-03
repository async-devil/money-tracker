import { BadRequestException, Injectable } from "@nestjs/common";

import { AccountsService } from "src/modules/accounts-service/accounts-service.service";
import { TransactionOperationType } from "src/modules/accounts-service/types/request/operate-account-dto";
import { Account } from "src/modules/accounts-service/types/response/account.entity";
import { CategoriesService } from "src/modules/categories-service/categories-service.service";

import { TransactionsService } from "../transactions-service.service";
import { CreateTransactionDto } from "../types/request/create-transaction.dto";
import { DeleteAllTransactionsByAccountIdDto } from "../types/request/delete-all-transactions-by-account-id.dto";
import { DeleteAllTransactionsByCategoryIdDto } from "../types/request/delete-all-transactions-by-category-id.dto";
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
		ids: { from?: string; to?: string },
		currencies: { currency_from?: string; currency_to?: string }
	): Promise<void> {
		const services = this.getSenderAndRecipientServices(type);

		const { from, to } = ids;
		const { currency_from, currency_to } = currencies;

		if (from) {
			const sender = (await services[0].getById({ id: from })) as Account;

			if (sender.type && currency_from && sender?.currency && sender?.currency !== currency_from)
				throw new BadRequestException("Currency does not mactch account one");
		}

		if (to) {
			const recipient = (await services[1].getById({ id: to })) as Account;

			if (
				recipient.type &&
				currency_to &&
				recipient?.currency &&
				recipient?.currency !== currency_to
			)
				throw new BadRequestException("Currency does not mactch account one");
		}
	}

	private async operateAccount(
		destination: string,
		amount: string,
		type: TransactionOperationType
	) {
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
		await this.checkIfSenderAndRecipientExist(
			dto.type,
			{ from: dto.from, to: dto.to },
			{ currency_from: dto.currency_from, currency_to: dto.currency_to }
		);

		const transaction = await this.transactionsService.create(dto);

		switch (transaction.type) {
			case TransactionType.RECHARGE:
				await this.operateAccount(transaction.to, transaction.amount_to, TransactionType.RECHARGE);
				break;

			case TransactionType.WITHDRAW:
				await this.operateAccount(
					transaction.from,
					transaction.amount_from,
					TransactionType.WITHDRAW
				);
				break;

			case TransactionType.TRANSFER:
				await this.operateAccount(
					transaction.from,
					transaction.amount_from,
					TransactionType.WITHDRAW
				);

				await this.operateAccount(transaction.to, transaction.amount_to, TransactionType.RECHARGE);
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
			await this.checkIfSenderAndRecipientExist(
				transaction.type,
				{
					from: dto.data.from || transaction.from,
					to: dto.data.to || transaction.to,
				},
				{
					currency_from: dto.data.currency_from || transaction.currency_from,
					currency_to: dto.data.currency_to || transaction.currency_to,
				}
			);

			switch (transaction.type) {
				case TransactionType.RECHARGE:
					await this.operateAccount(
						transaction.to,
						transaction.amount_to,
						TransactionType.WITHDRAW
					);

					await this.operateAccount(
						dto.data.to || transaction.to,
						dto.data.amount_to || transaction.amount_to,
						TransactionType.RECHARGE
					);
					break;

				case TransactionType.WITHDRAW:
					await this.operateAccount(
						transaction.from,
						transaction.amount_from,
						TransactionType.RECHARGE
					);

					await this.operateAccount(
						dto.data.from || transaction.from,
						dto.data.amount_from || transaction.amount_from,
						TransactionType.WITHDRAW
					);

					break;

				case TransactionType.TRANSFER:
					await this.operateAccount(
						transaction.from,
						transaction.amount_from,
						TransactionType.RECHARGE
					);

					await this.operateAccount(
						transaction.to,
						transaction.amount_to,
						TransactionType.WITHDRAW
					);

					await this.operateAccount(
						dto.data.from || transaction.from,
						dto.data.amount_from || transaction.amount_from,
						TransactionType.WITHDRAW
					);

					await this.operateAccount(
						dto.data.to || transaction.to,
						dto.data.amount_to || transaction.amount_to,
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
				await this.operateAccount(transaction.to, transaction.amount_to, TransactionType.WITHDRAW);
				break;

			case TransactionType.WITHDRAW:
				await this.operateAccount(
					transaction.from,
					transaction.amount_from,
					TransactionType.RECHARGE
				);
				break;

			case TransactionType.TRANSFER:
				await this.operateAccount(
					transaction.from,
					transaction.amount_from,
					TransactionType.RECHARGE
				);

				await this.operateAccount(transaction.to, transaction.amount_to, TransactionType.WITHDRAW);
				break;
		}

		return await this.transactionsService.deleteById(dto);
	}

	public async deleteAllTransactionsByAccountId(dto: DeleteAllTransactionsByAccountIdDto) {
		const accountFromTransactions = await this.transactionsService.getByQuery({
			filters: { owner: dto.owner, from: dto.accountId },
		});
		const accountToTransactions = await this.transactionsService.getByQuery({
			filters: { owner: dto.owner, to: dto.accountId },
		});

		const transactions = [...accountFromTransactions, ...accountToTransactions];

		for (const transaction of transactions) {
			await this.deleteTransaction({ id: transaction.id });
		}
	}

	public async deleteAllTransactionsByCategoryId(dto: DeleteAllTransactionsByCategoryIdDto) {
		const categoryFromTransactions = await this.transactionsService.getByQuery({
			filters: { owner: dto.owner, from: dto.categoryId },
		});
		const categoryToTransactions = await this.transactionsService.getByQuery({
			filters: { owner: dto.owner, to: dto.categoryId },
		});

		const transactions = [...categoryFromTransactions, ...categoryToTransactions];

		for (const transaction of transactions) {
			await this.deleteTransaction({ id: transaction.id });
		}
	}
}
