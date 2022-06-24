import {
	BadRequestException,
	Injectable,
	InternalServerErrorException,
	NotFoundException,
} from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

import { Transaction } from "src/entities/transaction.entity";

@Injectable()
export class TransactionsRepository {
	constructor(
		@InjectRepository(Transaction) private readonly transactionsRepository: Repository<Transaction>
	) {}

	private throwDefaultError(message?: string) {
		throw new InternalServerErrorException(message || "Internal Server Error");
	}

	public async getOneByProperty(property: { [key: string]: unknown }): Promise<Transaction> {
		let transaction: Transaction;

		try {
			transaction = await this.transactionsRepository.findOne({
				where: property,
			});
		} catch (err) {
			this.throwDefaultError();
		}

		if (!transaction) throw new NotFoundException("Transaction not found");
		return transaction;
	}

	public async getManyByProperties(properties: { [key: string]: unknown }): Promise<Transaction[]> {
		let transactions: Transaction[];

		try {
			transactions = await this.transactionsRepository.find({
				where: properties,
			});
		} catch (err) {
			this.throwDefaultError();
		}

		return transactions;
	}

	public async save(transaction: Transaction): Promise<Transaction> {
		try {
			return await this.transactionsRepository.save(transaction);
		} catch (err) {
			const error = err as Error;

			if (error.message.includes("duplicate key value violates unique constraint")) {
				throw new BadRequestException("Duplicate transaction");
			}

			if (error.message.includes("numeric field overflow")) {
				throw new BadRequestException("Invalid balance value");
			}

			this.throwDefaultError();
		}
	}

	public async deleteOneByProperty(property: { [key: string]: unknown }) {
		try {
			await this.transactionsRepository.delete(property);
		} catch (err) {
			this.throwDefaultError();
		}

		return {};
	}

	public async deleteManyByProperties(properties: { [key: string]: unknown }) {
		try {
			await this.transactionsRepository.delete(properties);
		} catch (err) {
			this.throwDefaultError();
		}

		return {};
	}
}
