import { Controller, Get, Req, UseGuards } from "@nestjs/common";
import { ApiOperation, ApiResponse } from "@nestjs/swagger";

import { AccessTokenGuard } from "src/modules/auth-service/guards/access-token.guard";
import { IRequest } from "src/modules/auth-service/types/interfaces/IRequest";

import { ClientsService } from "../clients-service.service";

@Controller()
export class ClientsRouteController {
	constructor(private readonly clientsService: ClientsService) {}

	@ApiOperation({ summary: "Get current client by access token" })
	@ApiResponse({
		status: 200,
		description: "Current client",
	})
	@UseGuards(AccessTokenGuard)
	@Get("/me")
	public async getCurrentClient(@Req() request: IRequest) {
		return await this.clientsService.getClientById(request.clientId);
	}
}
