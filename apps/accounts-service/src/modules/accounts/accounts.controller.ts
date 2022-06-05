import { Controller } from "@nestjs/common";
import { MessagePattern } from "@nestjs/microservices";

import { Account } from "src/entities/account.entity";

import { AccountsService } from "./accounts.service";
import { CreateAccountDto } from "./dtos/create-account.dto";
import { DeleteAccountByIdDto } from "./dtos/delete-account-by-id.dto";
import { DeleteAllAccountsByOwnerIdDto } from "./dtos/delete-all-accounts-by-owner-id.dto";
import { GetAccountByIdDto } from "./dtos/get-account-by-id.dto";
import { GetAccountsByPropertiesDto } from "./dtos/get-accounts-by-properties.dto";
import { UpdateAccountByIdDto } from "./dtos/update-account-by-id.dto";

@Controller()
export class AccountsController {
	constructor(private readonly accountsService: AccountsService) {}

	/**
	 *	Create new account from dto and return it if successfully
	 *
	 * 	Throws:
	 * 	- { statusCode: 400, message: ["name must be string"], error: "Bad request" }
	 * 	- { statusCode: 400, message: "Duplicate error", error: "Bad request" }
	 * 	- { statusCode: 500, message: "Unknown error", error: "Internal server error" }
	 */
	@MessagePattern({ cmd: "create-account" })
	public async createAccount(dto: CreateAccountDto): Promise<Account> {
		return await this.accountsService.createAccount(dto);
	}

	/**
	 *	Get account by it's id
	 *
	 * 	Throws:
	 * 	- { statusCode: 400, message: ["id must be a UUID"], error: "Bad request" }
	 * 	- { statusCode: 404, message: "Account not found", error: "Not found"}
	 * 	- { statusCode: 500, message: "Unknown error", error: "Internal server error" }
	 */
	@MessagePattern({ cmd: "get-account-by-id" })
	public async getAccountById(dto: GetAccountByIdDto): Promise<Account> {
		return await this.accountsService.getAccountById(dto);
	}

	/**
	 *	Get accounts by similar properties, would pass even if no matching accounts found
	 *
	 * 	Throws:
	 * 	- { statusCode: 400, message: ["owner must be a UUID"], error: "Bad request" }
	 * 	- { statusCode: 500, message: "Unknown error", error: "Internal server error" }
	 */
	@MessagePattern({ cmd: "get-accounts-by-properties" })
	public async getAccountsByProperties(dto: GetAccountsByPropertiesDto): Promise<Account[]> {
		return await this.accountsService.getAccountsByProperties(dto);
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
	@MessagePattern({ cmd: "update-account-by-id" })
	public async updateAccountById(dto: UpdateAccountByIdDto): Promise<Account> {
		return await this.accountsService.updateAccountById(dto);
	}

	/**
	 *	Delete account by it's id, would pass even if account not found
	 *
	 * 	Throws:
	 * 	- { statusCode: 400, message: ["id must be a UUID"], error: "Bad request" }
	 * 	- { statusCode: 500, message: "Unknown error", error: "Internal server error" }
	 */
	@MessagePattern({ cmd: "delete-account-by-id" })
	public async deleteAccountById(dto: DeleteAccountByIdDto) {
		return await this.accountsService.deleteAccountById(dto);
	}

	/**
	 *	Delete all accounts by owner's id, would pass even if accounts not found
	 *
	 * 	Throws:
	 * 	- { statusCode: 400, message: ["owner must be a UUID"], error: "Bad request" }
	 * 	- { statusCode: 500, message: "Unknown error", error: "Internal server error" }
	 */
	@MessagePattern({ cmd: "delete-all-accounts-by-owner-id" })
	public async deleteAllAccountsByOwnerId(dto: DeleteAllAccountsByOwnerIdDto) {
		return await this.accountsService.deleteAllAccountsByOwnerId(dto);
	}
}
