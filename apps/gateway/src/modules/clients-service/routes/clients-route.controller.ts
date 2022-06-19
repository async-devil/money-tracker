/* eslint-disable sonarjs/no-duplicate-string */
import { Body, Controller, Delete, Get, Put, Req, UseGuards } from "@nestjs/common";
import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";

import { HttpException } from "src/common/HttpException";
import { AccountsService } from "src/modules/accounts-service/accounts-service.service";
import { AuthService } from "src/modules/auth-service/auth-service.service";
import { AccessTokenGuard } from "src/modules/auth-service/guards/access-token.guard";
import { IRequest } from "src/modules/auth-service/types/interfaces/IRequest";
import { CategoriesService } from "src/modules/categories-service/categories-service.service";

import { ClientsService } from "../clients-service.service";
import { ClientData } from "../types/request/update-client-by-id.dto";

@ApiTags("Clients service")
@Controller()
export class ClientsRouteController {
	constructor(
		private readonly clientsService: ClientsService,
		private readonly accountsService: AccountsService,
		private readonly categoriesService: CategoriesService,
		private readonly authService: AuthService
	) {}

	@ApiOperation({ summary: "Get current client by access token" })
	@ApiResponse({
		status: 200,
		description: "Current client",
	})
	@ApiResponse({ status: 400, type: HttpException, description: "Invalid request" })
	@ApiResponse({ status: 401, type: HttpException, description: "No access token provided" })
	@ApiResponse({ status: 401, type: HttpException, description: "Invalid access token" })
	@ApiResponse({ status: 404, type: HttpException, description: "Client not found" })
	@ApiResponse({ status: 504, type: HttpException, description: "Microservice timeout" })
	@ApiResponse({ status: 502, type: HttpException, description: "Bad gateway" })
	@UseGuards(AccessTokenGuard)
	@Get("/me")
	public async getCurrentClient(@Req() request: IRequest) {
		return await this.clientsService.getClientById(request.clientId);
	}

	@ApiOperation({ summary: "Update current client by access token" })
	@ApiResponse({
		status: 201,
		description: "Updated current client",
	})
	@ApiResponse({ status: 400, type: HttpException, description: "Invalid request" })
	@ApiResponse({ status: 401, type: HttpException, description: "No access token provided" })
	@ApiResponse({ status: 401, type: HttpException, description: "Invalid access token" })
	@ApiResponse({ status: 404, type: HttpException, description: "Client not found" })
	@ApiResponse({ status: 504, type: HttpException, description: "Microservice timeout" })
	@ApiResponse({ status: 502, type: HttpException, description: "Bad gateway" })
	@UseGuards(AccessTokenGuard)
	@Put("/me")
	public async updateCurrentClient(@Req() request: IRequest, @Body() dto: ClientData) {
		return await this.clientsService.updateClientById({
			id: request.clientId,
			data: dto,
		});
	}

	@ApiOperation({ summary: "Delete current client by access token and all related entities" })
	@ApiResponse({
		status: 200,
	})
	@ApiResponse({ status: 400, type: HttpException, description: "Invalid request" })
	@ApiResponse({ status: 401, type: HttpException, description: "No access token provided" })
	@ApiResponse({ status: 401, type: HttpException, description: "Invalid access token" })
	@ApiResponse({ status: 504, type: HttpException, description: "Microservice timeout" })
	@ApiResponse({ status: 502, type: HttpException, description: "Bad gateway" })
	@UseGuards(AccessTokenGuard)
	@Delete("/me")
	public async deleteCurrentClient(@Req() request: IRequest) {
		await this.authService.deleteAllSessionsByClientId({ clientId: request.clientId });
		await this.accountsService.deleteAllAccountsByOwnerId({ owner: request.clientId });
		await this.categoriesService.deleteAllCategoriesByOwnerId({ owner: request.clientId });

		return await this.clientsService.deleteClientById(request.clientId);
	}
}
