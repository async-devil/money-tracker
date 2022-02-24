import { Controller, Get, UseGuards, Req, Body, Post } from "@nestjs/common";
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";

import { ClientsService } from "./clients.service";
import { CreateClientDto } from "./dtos/create-client.dto";
import { Client } from "./models/client.entity";

@ApiTags("Clients")
@Controller("clients")
export class ClientsController {
	constructor(private readonly clientsService: ClientsService) {}

	@ApiOperation({ summary: "update client by id" })
	@ApiResponse({ status: 201, type: Client })
	@ApiResponse({ status: 404, description: "Not found" })
	@ApiResponse({ status: 401, description: "Unauthorized" })
	@Post()
	public create(@Body() clientDto: CreateClientDto): Promise<Client> {
		return this.clientsService.create(clientDto);
	}
}
