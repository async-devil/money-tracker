import {
	BadRequestException,
	Injectable,
	InternalServerErrorException,
	NotFoundException,
} from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

import { Account } from "src/entities/account.entity";

@Injectable()
export class AccountsRepository {
	constructor(
		@InjectRepository(Account) private readonly accountsRepository: Repository<Account>
	) {}

	private throwDefaultError(message?: string) {
		throw new InternalServerErrorException(message || "Internal Server Error");
	}

	public async getOneByProperty(property: { [key: string]: unknown }): Promise<Account> {
		let account: Account;

		try {
			account = await this.accountsRepository.findOne({
				where: property,
			});
		} catch (err) {
			this.throwDefaultError();
		}

		if (!account) throw new NotFoundException("Account not found");
		return account;
	}

	public async getManyByProperties(properties: { [key: string]: unknown }): Promise<Account[]> {
		let accounts: Account[];

		try {
			accounts = await this.accountsRepository.find({
				where: properties,
			});
		} catch (err) {
			this.throwDefaultError();
		}

		return accounts;
	}

	public async save(account: Account): Promise<Account> {
		try {
			return await this.accountsRepository.save(account);
		} catch (err) {
			const error = err as Error;

			if (error.message.includes("duplicate key value violates unique constraint")) {
				throw new BadRequestException("Duplicate account");
			}

			this.throwDefaultError();
		}
	}

	public async deleteOneByProperty(property: { [key: string]: unknown }) {
		try {
			await this.accountsRepository.delete(property);
		} catch (err) {
			this.throwDefaultError();
		}

		return {};
	}

	public async deleteManyByProperties(properties: { [key: string]: unknown }) {
		try {
			await this.accountsRepository.delete(properties);
		} catch (err) {
			this.throwDefaultError();
		}

		return {};
	}
}
