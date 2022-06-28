import { Controller } from "@nestjs/common";
import { MessagePattern } from "@nestjs/microservices";

import { Transaction } from "src/entities/transaction.entity";

import { CreateTransactionDto } from "./dtos/create-transaction.dto";
import { DeleteAllTransactionsByOwnerIdDto } from "./dtos/delete-all-transactions-by-owner-id.dto";
import { DeleteTransactionByIdDto } from "./dtos/delete-transaction-by-id.dto";
import { GetTransactionByIdDto } from "./dtos/get-transaction-by-id.dto";
import { GetTransactionsByQueryDto } from "./dtos/get-transactions-by-query.dto";
import { UpdateTransactionByIdDto } from "./dtos/update-transaction-by-id.dto";
import { TransactionsService } from "./transactions.service";

@Controller()
export class TransactionsController {
	constructor(private readonly transactionsService: TransactionsService) {}

	/**
	 *	Create new transaction from dto and return it if successfully
	 *
	 * 	Throws:
	 * 	- { statusCode: 400, message: ["name must be string"], error: "Bad request" }
	 * 	- { statusCode: 400, message: "Duplicate error", error: "Bad request" }
	 * 	- { statusCode: 500, message: "Unknown error", error: "Internal server error" }
	 */
	@MessagePattern({ cmd: "create-transaction" })
	public async createTransaction(dto: CreateTransactionDto): Promise<Transaction> {
		return await this.transactionsService.createTransaction(dto);
	}

	/**
	 *	Get transaction by it's id
	 *
	 * 	Throws:
	 * 	- { statusCode: 400, message: ["id must be a UUID"], error: "Bad request" }
	 * 	- { statusCode: 404, message: "Transaction not found", error: "Not found"}
	 * 	- { statusCode: 500, message: "Unknown error", error: "Internal server error" }
	 */
	@MessagePattern({ cmd: "get-transaction-by-id" })
	public async getTransactionById(dto: GetTransactionByIdDto): Promise<Transaction> {
		return await this.transactionsService.getTransactionById(dto);
	}

	/**
	 *	Get transactions by similar properties, would pass even if no matching transactions found
	 *
	 * 	Throws:
	 * 	- { statusCode: 400, message: ["owner must be a UUID"], error: "Bad request" }
	 * 	- { statusCode: 500, message: "Unknown error", error: "Internal server error" }
	 */
	@MessagePattern({ cmd: "get-transactions-by-query" })
	public async getTransactionsByQuery(dto: GetTransactionsByQueryDto): Promise<Transaction[]> {
		return await this.transactionsService.getTransactionsByQuery(dto);
	}

	/**
	 *	Update transaction by it's id
	 *
	 * 	Throws:
	 * 	- { statusCode: 400, message: ["id must be a UUID"], error: "Bad request" }
	 * 	- { statusCode: 400, message: "Duplicate error", error: "Bad request" }
	 * 	- { statusCode: 404, message: "Transaction not found", error: "Not found"}
	 * 	- { statusCode: 500, message: "Unknown error", error: "Internal server error" }
	 */
	@MessagePattern({ cmd: "update-transaction-by-id" })
	public async updateTransactionById(dto: UpdateTransactionByIdDto): Promise<Transaction> {
		return await this.transactionsService.updateTransactionById(dto);
	}

	/**
	 *	Delete transaction by it's id, would pass even if transaction not found
	 *
	 * 	Throws:
	 * 	- { statusCode: 400, message: ["id must be a UUID"], error: "Bad request" }
	 * 	- { statusCode: 500, message: "Unknown error", error: "Internal server error" }
	 */
	@MessagePattern({ cmd: "delete-transaction-by-id" })
	public async deleteTransactionById(dto: DeleteTransactionByIdDto) {
		return await this.transactionsService.deleteTransactionById(dto);
	}

	/**
	 *	Delete all transactions by owner's id, would pass even if transactions not found
	 *
	 * 	Throws:
	 * 	- { statusCode: 400, message: ["owner must be a UUID"], error: "Bad request" }
	 * 	- { statusCode: 500, message: "Unknown error", error: "Internal server error" }
	 */
	@MessagePattern({ cmd: "delete-all-transactions-by-owner-id" })
	public async deleteAllTransactionsByOwnerId(dto: DeleteAllTransactionsByOwnerIdDto) {
		return await this.transactionsService.deleteAllTransactionsByOwnerId(dto);
	}
}
