import { Injectable } from "@nestjs/common";

import { Transaction } from "src/entities/transaction.entity";

import { CreateTransactionDto } from "./dtos/create-transaction.dto";
import { DeleteAllTransactionsByOwnerIdDto } from "./dtos/delete-all-transactions-by-owner-id.dto";
import { DeleteTransactionByIdDto } from "./dtos/delete-transaction-by-id.dto";
import { GetTransactionByIdDto } from "./dtos/get-transaction-by-id.dto";
import { GetTransactionsByQueryDto } from "./dtos/get-transactions-by-query.dto";
import { UpdateTransactionByIdDto } from "./dtos/update-transaction-by-id.dto";
import { TransactionsRepository } from "./transactions.repository";

@Injectable()
export class TransactionsService {
	constructor(private readonly transactionsRepository: TransactionsRepository) {}

	public async createTransaction(dto: CreateTransactionDto): Promise<Transaction> {
		const transaction = new Transaction();

		Object.assign(transaction, dto);

		return await this.transactionsRepository.save(transaction);
	}

	public async getTransactionById(dto: GetTransactionByIdDto): Promise<Transaction> {
		return await this.transactionsRepository.getOneByProperty({ ...dto });
	}

	public async getTransactionsByQuery(dto: GetTransactionsByQueryDto): Promise<Transaction[]> {
		return await this.transactionsRepository.getManyByQuery(dto);
	}

	public async updateTransactionById(dto: UpdateTransactionByIdDto): Promise<Transaction> {
		const transaction = await this.getTransactionById({ id: dto.id });

		Object.assign(transaction, dto.data);

		return await this.transactionsRepository.save(transaction);
	}

	public async deleteTransactionById(dto: DeleteTransactionByIdDto) {
		return await this.transactionsRepository.deleteOneByProperty({ ...dto });
	}

	public async deleteAllTransactionsByOwnerId(dto: DeleteAllTransactionsByOwnerIdDto) {
		return await this.transactionsRepository.deleteManyByProperties({ ...dto });
	}
}
