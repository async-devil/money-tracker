import { Inject, Injectable } from "@nestjs/common";
import { ClientProxy } from "@nestjs/microservices";

import { RequestService } from "src/common/request.service";

import { CreateTransactionDto } from "./types/request/create-transaction.dto";
import { DeleteAllTransactionsByOwnerIdDto } from "./types/request/delete-all-transactions-by-owner-id.dto";
import { DeleteTransactionByIdDto } from "./types/request/delete-transaction-by-id.dto";
import { GetTransactionByIdDto } from "./types/request/get-transaction-by-id.dto";
import { GetTransactionsByQueryDto } from "./types/request/get-transactions-by-query.dto";
import { UpdateTransactionByIdDto } from "./types/request/update-transaction-by-id.dto";
import { Transaction } from "./types/response/transaction.entity";

@Injectable()
export class TransactionsService {
	constructor(
		@Inject("TRANSACTIONS_SERVICE") private readonly transactionsService: ClientProxy,
		private readonly requestService: RequestService
	) {}

	public async ping(text: string): Promise<string> {
		return await this.requestService.sendRequest<string>(this.transactionsService, "ping", {
			text,
		});
	}

	/**
	 *	Create new transaction from dto and return it if successfully
	 *
	 * 	Throws:
	 * 	- { statusCode: 400, message: ["name must be string"], error: "Bad request" }
	 * 	- { statusCode: 400, message: "Duplicate error", error: "Bad request" }
	 * 	- { statusCode: 500, message: "Unknown error", error: "Internal server error" }
	 */
	public async createTransaction(dto: CreateTransactionDto): Promise<Transaction> {
		return await this.requestService.sendRequest<Transaction>(
			this.transactionsService,
			"create-transaction",
			dto
		);
	}

	/**
	 *	Get transaction by it's id
	 *
	 * 	Throws:
	 * 	- { statusCode: 400, message: ["id must be a UUID"], error: "Bad request" }
	 * 	- { statusCode: 404, message: "Transaction not found", error: "Not found"}
	 * 	- { statusCode: 500, message: "Unknown error", error: "Internal server error" }
	 */
	public async getTransactionById(dto: GetTransactionByIdDto): Promise<Transaction> {
		return await this.requestService.sendRequest<Transaction>(
			this.transactionsService,
			"get-transaction-by-id",
			dto
		);
	}

	/**
	 *	Get transactions by similar properties, would pass even if no matching transactions found
	 *
	 * 	Throws:
	 * 	- { statusCode: 400, message: ["owner must be a UUID"], error: "Bad request" }
	 * 	- { statusCode: 500, message: "Unknown error", error: "Internal server error" }
	 */
	public async getTransactionsByQuery(dto: GetTransactionsByQueryDto): Promise<Transaction[]> {
		return await this.requestService.sendRequest<Transaction[]>(
			this.transactionsService,
			"get-transactions-by-query",
			dto
		);
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
	public async updateTransactionById(dto: UpdateTransactionByIdDto): Promise<Transaction> {
		return await this.requestService.sendRequest<Transaction>(
			this.transactionsService,
			"update-transaction-by-id",
			dto
		);
	}

	/**
	 *	Delete transaction by it's id, would pass even if transaction not found
	 *
	 * 	Throws:
	 * 	- { statusCode: 400, message: ["id must be a UUID"], error: "Bad request" }
	 * 	- { statusCode: 500, message: "Unknown error", error: "Internal server error" }
	 */
	public async deleteTransactionById(dto: DeleteTransactionByIdDto) {
		return await this.requestService.sendRequest(
			this.transactionsService,
			"delete-transaction-by-id",
			dto
		);
	}

	/**
	 *	Delete all transactions by owner's id, would pass even if transactions not found
	 *
	 * 	Throws:
	 * 	- { statusCode: 400, message: ["owner must be a UUID"], error: "Bad request" }
	 * 	- { statusCode: 500, message: "Unknown error", error: "Internal server error" }
	 */
	public async deleteAllTransactionsByOwnerId(dto: DeleteAllTransactionsByOwnerIdDto) {
		return await this.requestService.sendRequest(
			this.transactionsService,
			"delete-all-transactions-by-owner-id",
			dto
		);
	}
}
