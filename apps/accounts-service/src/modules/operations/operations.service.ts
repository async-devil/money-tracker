import { BadRequestException, Injectable, Logger } from "@nestjs/common";

import { Account } from "src/entities/account.entity";
import { AccountsService } from "src/modules/accounts/accounts.service";

import { OperateAccountDto, TransactionType } from "./dtos/operate-account.dto";

@Injectable()
export class OperationsService {
	constructor(private readonly accountsService: AccountsService) {}

	private operateByType(balance: string, ammount: number, type: TransactionType): number {
		const parsedBalance = parseFloat(balance);

		switch (type) {
			case TransactionType.RECHARGE:
				return parsedBalance + ammount;

			case TransactionType.WITHDRAW:
				return parsedBalance - ammount;

			default:
				throw new BadRequestException("Invalid transaction type");
		}
	}

	public async operateAccount(dto: OperateAccountDto): Promise<Account> {
		const account = await this.accountsService.getAccountById({ id: dto.accountId });

		Logger.log(dto, account);

		const balance = this.operateByType(account.balance, dto.ammount, dto.type).toFixed(8);

		return await this.accountsService.updateAccountById({
			id: dto.accountId,
			data: { balance: parseFloat(balance) },
		});
	}
}
