import { Body, Controller, Post } from "@nestjs/common";
import { ApiOperation, ApiResponse } from "@nestjs/swagger";

import { HttpException } from "../common/HttpException";
import { ClientsService } from "./clients-service.service";
import { CreateClientDto } from "./types/create-client.dto";

@Controller("clients")
export class ClientsController {
	constructor(private readonly clientsService: ClientsService) {}

	@ApiOperation({ summary: "create user" })
	@ApiResponse({ status: 201, description: "Created user" })
	@ApiResponse({ status: 400, type: HttpException, description: "Invalid request" })
	@ApiResponse({ status: 504, type: HttpException, description: "Microservice timeout" })
	@ApiResponse({ status: 502, type: HttpException, description: "Bad gateway" })
	@Post("/")
	public createClient(@Body() dto: CreateClientDto) {
		return this.clientsService.createClient(dto);
	}
}
