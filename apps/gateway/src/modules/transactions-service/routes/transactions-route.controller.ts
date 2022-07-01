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
import { ApiCookieAuth, ApiExtraModels, ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";

import { HttpException } from "src/common/HttpException";
import { AccessTokenGuard } from "src/modules/auth-service/guards/access-token.guard";
import { IRequest } from "src/modules/auth-service/types/interfaces/IRequest";

import { TransactionsOperationsService } from "../services/transactions-operations.service";
import { TransactionsService } from "../transactions-service.service";
import { CreateTransactionControllerDto } from "../types/request/create-transaction.dto";
import {
	GetTransactionsByQueryControllerDto,
	GetTransactionsByQueryDto,
	GetTransactionsByQueryTypeDto,
} from "../types/request/get-transactions-by-query.dto";
import { UpdateTransactionProperties } from "../types/request/update-transaction-by-id.dto";
import { Transaction } from "../types/response/transaction.entity";

@ApiTags("Transactions service")
@Controller()
export class TransactionsRouteController {
	constructor(
		private readonly transactionsService: TransactionsService,
		private readonly transactionsOperationsService: TransactionsOperationsService
	) {}

	@ApiOperation({ summary: "Create transaction using current client id" })
	@ApiResponse({
		status: 201,
		type: Transaction,
	})
	@ApiResponse({ status: 400, type: HttpException, description: "Invalid request" })
	@ApiResponse({ status: 400, type: HttpException, description: "Duplicate error" })
	@ApiResponse({ status: 401, type: HttpException, description: "No access token provided" })
	@ApiResponse({ status: 401, type: HttpException, description: "Invalid access token" })
	@ApiResponse({ status: 504, type: HttpException, description: "Microservice timeout" })
	@ApiResponse({ status: 502, type: HttpException, description: "Bad gateway" })
	@ApiCookieAuth()
	@UseGuards(AccessTokenGuard)
	@Post("/")
	public async createCategory(
		@Req() request: IRequest,
		@Body() dto: CreateTransactionControllerDto
	) {
		return await this.transactionsOperationsService.createTransaction({
			owner: request.clientId,
			...dto,
		});
	}

	@ApiOperation({ summary: "Get transactions by properties or just all" })
	@ApiResponse({
		status: 200,
		type: [Transaction],
	})
	@ApiResponse({ status: 400, type: HttpException, description: "Invalid request" })
	@ApiResponse({ status: 401, type: HttpException, description: "No access token provided" })
	@ApiResponse({ status: 401, type: HttpException, description: "Invalid access token" })
	@ApiResponse({ status: 504, type: HttpException, description: "Microservice timeout" })
	@ApiResponse({ status: 502, type: HttpException, description: "Bad gateway" })
	@ApiExtraModels(GetTransactionsByQueryControllerDto)
	@ApiCookieAuth()
	@UseGuards(AccessTokenGuard)
	@Get("/")
	public async getTransactionsByQuery(
		@Req() request: IRequest,
		@Query() dto: GetTransactionsByQueryControllerDto
	) {
		//? "e30" - "{}" in base64
		const json = Buffer.from(dto.query || "e30", "base64url").toString("utf-8");

		let query: GetTransactionsByQueryTypeDto;

		try {
			query = JSON.parse(json) as GetTransactionsByQueryTypeDto;
		} catch (err) {
			throw new BadRequestException("Invalid JSON");
		}

		query.filters = Object.assign(query.filters || {}, { owner: request.clientId });

		return await this.transactionsService.getByQuery(query as GetTransactionsByQueryDto);
	}

	@ApiOperation({ summary: "Get transaction by id" })
	@ApiResponse({
		status: 200,
		type: Transaction,
	})
	@ApiCookieAuth()
	@UseGuards(AccessTokenGuard)
	@Get("/:id")
	public async getTransactionById(@Req() request: IRequest, @Param("id") id: string) {
		const transaction = await this.transactionsService.getById({ id });

		if (transaction.owner !== request.clientId)
			throw new NotFoundException("Transaction not found");

		return transaction;
	}

	@ApiOperation({ summary: "Update transaction by id" })
	@ApiResponse({
		status: 200,
		type: Transaction,
	})
	@ApiResponse({ status: 400, type: HttpException, description: "Invalid request" })
	@ApiResponse({ status: 400, type: HttpException, description: "Duplicate error" })
	@ApiResponse({ status: 401, type: HttpException, description: "No access token provided" })
	@ApiResponse({ status: 401, type: HttpException, description: "Invalid access token" })
	@ApiResponse({ status: 404, type: HttpException, description: "Transaction not found" })
	@ApiResponse({ status: 504, type: HttpException, description: "Microservice timeout" })
	@ApiResponse({ status: 502, type: HttpException, description: "Bad gateway" })
	@ApiCookieAuth()
	@UseGuards(AccessTokenGuard)
	@Put("/:id")
	public async updateTransactionById(
		@Req() request: IRequest,
		@Param("id") id: string,
		@Body() dto: UpdateTransactionProperties
	) {
		const transaction = await this.transactionsService.getById({ id });

		if (transaction.owner !== request.clientId)
			throw new NotFoundException("Transaction not found");

		return await this.transactionsOperationsService.updateTransaction({ id, data: dto });
	}

	@ApiOperation({ summary: "Delete transaction by id" })
	@ApiResponse({ status: 200 })
	@ApiResponse({ status: 400, type: HttpException, description: "Invalid request" })
	@ApiResponse({ status: 401, type: HttpException, description: "No access token provided" })
	@ApiResponse({ status: 401, type: HttpException, description: "Invalid access token" })
	@ApiResponse({ status: 404, type: HttpException, description: "Transaction not found" })
	@ApiResponse({ status: 504, type: HttpException, description: "Microservice timeout" })
	@ApiResponse({ status: 502, type: HttpException, description: "Bad gateway" })
	@ApiCookieAuth()
	@UseGuards(AccessTokenGuard)
	@Delete("/:id")
	public async deleteCategoryById(@Req() request: IRequest, @Param("id") id: string) {
		const transaction = await this.transactionsService.getById({ id });

		if (transaction.owner !== request.clientId)
			throw new NotFoundException("Transaction not found");

		return await this.transactionsOperationsService.deleteTransaction({ id });
	}
}
