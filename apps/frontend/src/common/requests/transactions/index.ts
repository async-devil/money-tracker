import { ApiRequests } from "..";
import { CreateTransactionDto } from "./types/request/create-transaction.dto";
import { DeleteTransactionByIdDto } from "./types/request/delete-transaction-by-id.dto";
import { GetTransactionByIdDto } from "./types/request/get-transaction-by-id.dto";
import { GetTransactionsByQueryDto } from "./types/request/get-transactions-by-query.dto";
import { UpdateTransactionByIdDto } from "./types/request/update-transaction-by-id.dto";
import { Transaction } from "./types/response/transaction.entity";

export class TransactionsApiRequests {
	public static async create(dto: CreateTransactionDto) {
		return await ApiRequests.request<Transaction>("/api/transactions", "post", dto);
	}

	public static async getById(dto: GetTransactionByIdDto) {
		return await ApiRequests.request<Transaction>(`/api/transactions/${dto.id}`, "get");
	}

	public static async getByQuery(dto: GetTransactionsByQueryDto) {
		const query = ApiRequests.dtoToBase64Query(dto);

		return await ApiRequests.request<Transaction[]>(`/api/transactions?query=${query}`, "get");
	}

	public static async updateById(dto: UpdateTransactionByIdDto) {
		return await ApiRequests.request<Transaction>("/api/transactions", "put", dto);
	}

	public static async deleteById(dto: DeleteTransactionByIdDto) {
		return await ApiRequests.request(`/api/transactions/${dto.id}`, "delete");
	}
}
