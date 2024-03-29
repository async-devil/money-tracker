/* eslint-disable sonarjs/no-duplicate-string */
import {
	BadRequestException,
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
import { ApiBearerAuth, ApiExtraModels, ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";

import { HttpException } from "src/common/HttpException";
import { AccessTokenGuard } from "src/modules/auth-service/guards/access-token.guard";
import { IRequest } from "src/modules/auth-service/types/interfaces/IRequest";
import { TransactionsOperationsService } from "src/modules/transactions-service/services/transactions-operations.service";

import { AccountsService } from "../accounts-service.service";
import { CreateAccountControllerDto } from "../types/request/create-account.dto";
import {
	GetAccountsByPropertiesTypeDto,
	GetAccountsByQuery,
} from "../types/request/get-accounts-by-properties.dto";
import { UpdateAccountProperties } from "../types/request/update-account-by-id.dto";
import { Account } from "../types/response/account.entity";

@ApiTags("Accounts service")
@Controller()
export class AccountsRouteController {
	constructor(
		private readonly accountsService: AccountsService,
		private readonly transactionsOperationsService: TransactionsOperationsService
	) {}

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
	@ApiBearerAuth()
	@UseGuards(AccessTokenGuard)
	@Post("/")
	public async createAccount(
		@Req() request: IRequest,
		@Body() dto: CreateAccountControllerDto
	): Promise<Account> {
		return await this.accountsService.create({ owner: request.clientId, ...dto });
	}

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
	@ApiBearerAuth()
	@UseGuards(AccessTokenGuard)
	@Get("/:id")
	public async getAccountById(@Req() request: IRequest, @Param("id") id: string): Promise<Account> {
		const account = await this.accountsService.getById({ id });

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
	@ApiExtraModels(GetAccountsByQuery)
	@ApiBearerAuth()
	@UseGuards(AccessTokenGuard)
	@Get("/")
	public async getAccountsByQuery(
		@Req() req: IRequest,
		@Query() dto: GetAccountsByQuery
	): Promise<Account[]> {
		//? "e30" - "{}" in base64
		const json = Buffer.from(dto.query || "e30", "base64url").toString("utf-8");

		let query: GetAccountsByPropertiesTypeDto;

		try {
			query = JSON.parse(json) as GetAccountsByPropertiesTypeDto;
		} catch (err) {
			throw new BadRequestException("Invalid JSON");
		}

		return await this.accountsService.getByProperties({ owner: req.clientId, ...query });
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
	@ApiBearerAuth()
	@UseGuards(AccessTokenGuard)
	@Put("/:id")
	public async updateAccountById(
		@Req() request: IRequest,
		@Param("id") id: string,
		@Body() dto: UpdateAccountProperties
	): Promise<Account> {
		const account = await this.accountsService.getById({ id });

		if (account.owner !== request.clientId) throw new NotFoundException("Account not found");

		return await this.accountsService.updateById({ id, data: dto });
	}

	@ApiOperation({ summary: "Delete account by id" })
	@ApiResponse({ status: 200 })
	@ApiResponse({ status: 400, type: HttpException, description: "Invalid request" })
	@ApiResponse({ status: 401, type: HttpException, description: "No access token provided" })
	@ApiResponse({ status: 401, type: HttpException, description: "Invalid access token" })
	@ApiResponse({ status: 404, type: HttpException, description: "Account not found" })
	@ApiResponse({ status: 504, type: HttpException, description: "Microservice timeout" })
	@ApiResponse({ status: 502, type: HttpException, description: "Bad gateway" })
	@ApiBearerAuth()
	@UseGuards(AccessTokenGuard)
	@Delete("/:id")
	public async deleteAccountById(@Req() request: IRequest, @Param("id") id: string) {
		const account = await this.accountsService.getById({ id });

		if (account.owner !== request.clientId) throw new NotFoundException("Account not found");

		await this.transactionsOperationsService.deleteAllTransactionsByAccountId({
			owner: request.clientId,
			accountId: id,
		});

		return await this.accountsService.deleteById({ id });
	}
}
