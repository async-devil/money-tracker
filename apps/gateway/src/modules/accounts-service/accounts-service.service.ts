import { Inject, Injectable } from "@nestjs/common";
import { ClientProxy } from "@nestjs/microservices";

import { RequestService } from "src/common/request.service";

import { CreateAccountDto } from "./types/request/create-account.dto";
import { DeleteAccountByIdDto } from "./types/request/delete-account-by-id.dto";
import { DeleteAllAccountsByOwnerIdDto } from "./types/request/delete-all-accounts-by-owner-id.dto";
import { GetAccountByIdDto } from "./types/request/get-account-by-id.dto";
import { GetAccountsByPropertiesDto } from "./types/request/get-accounts-by-properties.dto";
import { UpdateAccountByIdDto } from "./types/request/update-account-by-id.dto";
import { Account } from "./types/response/account.entity";

@Injectable()
export class AccountsService {
	constructor(
		@Inject("ACCOUNTS_SERVICE") private readonly accountsService: ClientProxy,
		private readonly requestService: RequestService
	) {}

	public async ping(text: string): Promise<string> {
		return await this.requestService.sendRequest<string>(this.accountsService, "ping", { text });
	}

	/**
	 *	Create new account from dto and return it if successfully
	 *
	 * 	Throws:
	 * 	- { statusCode: 400, message: ["name must be string"], error: "Bad request" }
	 * 	- { statusCode: 400, message: "Duplicate error", error: "Bad request" }
	 * 	- { statusCode: 500, message: "Unknown error", error: "Internal server error" }
	 */
	public async createAccount(dto: CreateAccountDto): Promise<Account> {
		return await this.requestService.sendRequest<Account>(
			this.accountsService,
			"create-account",
			dto
		);
	}

	/**
	 *	Get account by it's id
	 *
	 * 	Throws:
	 * 	- { statusCode: 400, message: ["id must be a UUID"], error: "Bad request" }
	 * 	- { statusCode: 404, message: "Account not found", error: "Not found"}
	 * 	- { statusCode: 500, message: "Unknown error", error: "Internal server error" }
	 */
	public async getAccountById(dto: GetAccountByIdDto): Promise<Account> {
		return await this.requestService.sendRequest<Account>(
			this.accountsService,
			"get-account-by-id",
			dto
		);
	}

	/**
	 *	Get accounts by similar properties, would pass even if no matching accounts found
	 *
	 * 	Throws:
	 * 	- { statusCode: 400, message: ["owner must be a UUID"], error: "Bad request" }
	 * 	- { statusCode: 500, message: "Unknown error", error: "Internal server error" }
	 */
	public async getAccountsByProperties(dto: GetAccountsByPropertiesDto): Promise<Account[]> {
		return await this.requestService.sendRequest<Account[]>(
			this.accountsService,
			"get-accounts-by-properties",
			dto
		);
	}

	/**
	 *	Update account by it's id
	 *
	 * 	Throws:
	 * 	- { statusCode: 400, message: ["id must be a UUID"], error: "Bad request" }
	 * 	- { statusCode: 400, message: "Duplicate error", error: "Bad request" }
	 * 	- { statusCode: 404, message: "Account not found", error: "Not found"}
	 * 	- { statusCode: 500, message: "Unknown error", error: "Internal server error" }
	 */
	public async updateAccountById(dto: UpdateAccountByIdDto): Promise<Account> {
		return await this.requestService.sendRequest<Account>(
			this.accountsService,
			"update-account-by-id",
			dto
		);
	}

	/**
	 *	Delete account by it's id, would pass even if account not found
	 *
	 * 	Throws:
	 * 	- { statusCode: 400, message: ["id must be a UUID"], error: "Bad request" }
	 * 	- { statusCode: 500, message: "Unknown error", error: "Internal server error" }
	 */
	public async deleteAccountById(dto: DeleteAccountByIdDto) {
		return await this.requestService.sendRequest(this.accountsService, "delete-account-by-id", dto);
	}

	/**
	 *	Delete all accounts by owner's id, would pass even if accounts not found
	 *
	 * 	Throws:
	 * 	- { statusCode: 400, message: ["owner must be a UUID"], error: "Bad request" }
	 * 	- { statusCode: 500, message: "Unknown error", error: "Internal server error" }
	 */
	public async deleteAllAccountsByOwnerId(dto: DeleteAllAccountsByOwnerIdDto) {
		return await this.requestService.sendRequest(
			this.accountsService,
			"delete-all-accounts-by-owner-id",
			dto
		);
	}
}
