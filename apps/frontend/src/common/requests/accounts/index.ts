import { ApiRequests } from "..";
import { CreateAccountDto } from "./types/request/create-account.dto";
import { DeleteAccountByIdDto } from "./types/request/delete-account-by-id.dto";
import { GetAccountByIdDto } from "./types/request/get-account-by-id.dto";
import { GetAccountsByQueryDto } from "./types/request/get-accounts-by-properties.dto";
import { UpdateAccountByIdDto } from "./types/request/update-account-by-id.dto";
import { Account } from "./types/response/account.entity";

export class AccountsApiRequests {
	public static async create(dto: CreateAccountDto) {
		return await ApiRequests.request<Account>("/api/accounts", "post", dto);
	}

	public static async getById(dto: GetAccountByIdDto) {
		return await ApiRequests.request<Account>(`/api/accounts/${dto.id}`, "get");
	}

	public static async getByQuery(dto: GetAccountsByQueryDto) {
		const query = ApiRequests.dtoToBase64Query(dto);

		return await ApiRequests.request<Account[]>(`/api/accounts?query=${query}`, "get");
	}

	public static async updateById(dto: UpdateAccountByIdDto) {
		return await ApiRequests.request<Account>("/api/accounts", "put", dto);
	}

	public static async deleteById(dto: DeleteAccountByIdDto) {
		return await ApiRequests.request(`/api/accounts/${dto.id}`, "delete");
	}
}
