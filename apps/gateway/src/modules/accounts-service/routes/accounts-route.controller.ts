/* eslint-disable sonarjs/no-duplicate-string */
import {
	Body,
	Controller,
	Delete,
	Get,
	NotFoundException,
	Param,
	Post,
	Put,
	Query,
	Req,
	UseGuards,
} from "@nestjs/common";
import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";

import { HttpException } from "src/common/HttpException";
import { AccessTokenGuard } from "src/modules/auth-service/guards/access-token.guard";
import { IRequest } from "src/modules/auth-service/types/interfaces/IRequest";

import { AccountsService } from "../accounts-service.service";
import { CreateAccountControllerDto } from "../types/request/create-account.dto";
import { GetAccountsByPropertiesControllerDto } from "../types/request/get-accounts-by-properties.dto";
import { UpdateProperties } from "../types/request/update-account-by-id.dto";
import { Account } from "../types/response/account.entity";

@ApiTags("Accounts service")
@Controller()
export class AccountsRouteController {
	constructor(private readonly accountsService: AccountsService) {}

	@ApiOperation({ summary: "Get account by id" })
	@ApiResponse({
		status: 200,
		type: Account,
	})
	@ApiResponse({ status: 400, type: HttpException, description: "Invalid request" })
	@ApiResponse({ status: 401, type: HttpException, description: "No access token provided" })
	@ApiResponse({ status: 401, type: HttpException, description: "Invalid access token" })
	@ApiResponse({ status: 404, type: HttpException, description: "Account not found" })
	@ApiResponse({ status: 504, type: HttpException, description: "Microservice timeout" })
	@ApiResponse({ status: 502, type: HttpException, description: "Bad gateway" })
	@UseGuards(AccessTokenGuard)
	@Get("/:id")
	public async getAccountById(@Req() request: IRequest, @Param("id") id: string): Promise<Account> {
		const account = await this.accountsService.getAccountById({ id });

		if (account.owner !== request.clientId) throw new NotFoundException("Account not found");

		return account;
	}

	@ApiOperation({ summary: "Get accounts by properties or just all" })
	@ApiResponse({
		status: 200,
		type: [Account],
	})
	@ApiResponse({ status: 400, type: HttpException, description: "Invalid request" })
	@ApiResponse({ status: 401, type: HttpException, description: "No access token provided" })
	@ApiResponse({ status: 401, type: HttpException, description: "Invalid access token" })
	@ApiResponse({ status: 504, type: HttpException, description: "Microservice timeout" })
	@ApiResponse({ status: 502, type: HttpException, description: "Bad gateway" })
	@UseGuards(AccessTokenGuard)
	@Get("/")
	public async getAccountsByProperties(
		@Req() req: IRequest,
		@Query() dto: GetAccountsByPropertiesControllerDto
	): Promise<Account[]> {
		return await this.accountsService.getAccountsByProperties({ owner: req.clientId, ...dto });
	}

	@ApiOperation({ summary: "Create account using current client id" })
	@ApiResponse({
		status: 201,
		type: Account,
	})
	@ApiResponse({ status: 400, type: HttpException, description: "Invalid request" })
	@ApiResponse({ status: 400, type: HttpException, description: "Duplicate error" })
	@ApiResponse({ status: 401, type: HttpException, description: "No access token provided" })
	@ApiResponse({ status: 401, type: HttpException, description: "Invalid access token" })
	@ApiResponse({ status: 504, type: HttpException, description: "Microservice timeout" })
	@ApiResponse({ status: 502, type: HttpException, description: "Bad gateway" })
	@UseGuards(AccessTokenGuard)
	@Post("/")
	public async createAccount(
		@Req() request: IRequest,
		@Body() dto: CreateAccountControllerDto
	): Promise<Account> {
		return await this.accountsService.createAccount({ owner: request.clientId, ...dto });
	}

	@ApiOperation({ summary: "Delete account by id" })
	@ApiResponse({ status: 200 })
	@ApiResponse({ status: 400, type: HttpException, description: "Invalid request" })
	@ApiResponse({ status: 401, type: HttpException, description: "No access token provided" })
	@ApiResponse({ status: 401, type: HttpException, description: "Invalid access token" })
	@ApiResponse({ status: 404, type: HttpException, description: "Account not found" })
	@ApiResponse({ status: 504, type: HttpException, description: "Microservice timeout" })
	@ApiResponse({ status: 502, type: HttpException, description: "Bad gateway" })
	@UseGuards(AccessTokenGuard)
	@Delete("/:id")
	public async deleteAccountById(@Req() request: IRequest, @Param("id") id: string) {
		const account = await this.accountsService.getAccountById({ id });

		if (account.owner !== request.clientId) throw new NotFoundException("Account not found");

		return await this.accountsService.deleteAccountById({ id });
	}

	@ApiOperation({ summary: "Update account by id" })
	@ApiResponse({ status: 200, type: Account })
	@ApiResponse({ status: 400, type: HttpException, description: "Invalid request" })
	@ApiResponse({ status: 400, type: HttpException, description: "Duplicate error" })
	@ApiResponse({ status: 401, type: HttpException, description: "No access token provided" })
	@ApiResponse({ status: 401, type: HttpException, description: "Invalid access token" })
	@ApiResponse({ status: 404, type: HttpException, description: "Account not found" })
	@ApiResponse({ status: 504, type: HttpException, description: "Microservice timeout" })
	@ApiResponse({ status: 502, type: HttpException, description: "Bad gateway" })
	@UseGuards(AccessTokenGuard)
	@Put("/:id")
	public async updateAccountById(
		@Req() request: IRequest,
		@Param("id") id: string,
		@Body() dto: UpdateProperties
	): Promise<Account> {
		const account = await this.accountsService.getAccountById({ id });

		if (account.owner !== request.clientId) throw new NotFoundException("Account not found");

		return await this.accountsService.updateAccountById({ id, data: dto });
	}
}
