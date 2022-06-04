import { Injectable } from "@nestjs/common";

import { Account } from "src/entities/account.entity";

import { AccountsRepository } from "./accounts.repository";
import { CreateAccountDto } from "./dtos/create-account.dto";
import { DeleteAccountByIdDto } from "./dtos/delete-account-by-id.dto";
import { DeleteAllAccountsByOwnerIdDto } from "./dtos/delete-all-accounts-by-owner-id.dto";
import { GetAccountByIdDto } from "./dtos/get-account-by-id.dto";
import { GetAccountsByPropertiesDto } from "./dtos/get-accounts-by-properties.dto";
import { UpdateAccountByIdDto } from "./dtos/update-account-by-id.dto";

@Injectable()
export class AccountsService {
	constructor(private readonly accountsRepository: AccountsRepository) {}

	public async createAccount(dto: CreateAccountDto): Promise<Account> {
		const account = new Account();

		Object.assign(account, dto);

		return await this.accountsRepository.save(account);
	}

	public async getAccountById(dto: GetAccountByIdDto): Promise<Account> {
		return await this.accountsRepository.getOneByProperty({ ...dto });
	}

	public async getAccountsByProperties(dto: GetAccountsByPropertiesDto): Promise<Account[]> {
		return await this.accountsRepository.getManyByProperties({ ...dto });
	}

	public async updateAccountById(dto: UpdateAccountByIdDto): Promise<Account> {
		const account = await this.getAccountById({ id: dto.id });

		Object.assign(account, dto.data);

		return await this.accountsRepository.save(account);
	}

	public async deleteAccountById(dto: DeleteAccountByIdDto) {
		return await this.accountsRepository.deleteOneByProperty({ ...dto });
	}

	public async deleteAllAccountsByOwnerId(dto: DeleteAllAccountsByOwnerIdDto) {
		return await this.accountsRepository.deleteManyByProperties({ ...dto });
	}
}
