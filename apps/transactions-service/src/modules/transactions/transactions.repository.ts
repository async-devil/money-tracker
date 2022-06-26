import {
	BadRequestException,
	Injectable,
	InternalServerErrorException,
	NotFoundException,
} from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Brackets, Repository } from "typeorm";

import { Transaction } from "src/entities/transaction.entity";

import { GetTransactionsByQueryDto } from "./dtos/get-transactions-by-query.dto";

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

	public async getManyByQuery(dto: GetTransactionsByQueryDto): Promise<Transaction[]> {
		let transactions: Transaction[];

		const query = this.transactionsRepository.createQueryBuilder("transaction");

		if (dto.filters) {
			const queries = [];

			Object.keys(dto.filters).forEach((key) => {
				queries.push(`transaction.${key} = :${key}`);
			});

			query.andWhere(queries.join(" AND "), dto.filters);
		}

		if (dto.range) {
			query.andWhere("transaction.date BETWEEN :dateStart AND :dateEnd", dto.range);
		}

		if (dto.query) {
			query.andWhere(
				new Brackets((qb) => {
					qb.where("transaction.notes ILIKE :query1", { query1: `%${dto.query}%` }).orWhere(
						"transaction.location ILIKE :query2",
						{ query2: `%${dto.query}%` }
					);
				})
			);
		}

		try {
			transactions = await query.getMany();
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
