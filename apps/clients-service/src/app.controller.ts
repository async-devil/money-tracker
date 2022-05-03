import { Controller } from "@nestjs/common";
import { MessagePattern, Payload } from "@nestjs/microservices";

import { AppService } from "./app.service";
import { CreateClientDto } from "./dtos/create-client.dto";
import { GetClientByEmailDto } from "./dtos/get-client-by-email.dto";
import { GetClientByIdDto } from "./dtos/get-client-by-id.dto";
import { UpdateClientByIdDto } from "./dtos/update-client-by-id.dto";
import { Client } from "./entities/client.entity";

@Controller()
export class AppController {
	constructor(private readonly appService: AppService) {}

	@MessagePattern({ cmd: "ping" })
	public ping(@Payload() data: { text: string }): string {
		return this.appService.ping(data.text);
	}

	/**
	 *	Create new user from dto and return it if successfully
	 *
	 * 	Throws:
	 * 	- { statusCode: 400, message: ["email must be email"], error: "Bad request" }
	 * 	- { statusCode: 400, message: "Duplicate error", error: "Bad request" }
	 * 	- { statusCode: 500, message: "Unknown error", error: "Internal server error" }
	 */
	@MessagePattern({ cmd: "create-client" })
	public async createClient(@Payload() dto: CreateClientDto): Promise<Client> {
		return await this.appService.createClient(dto);
	}

	/**
	 *	Get client by its id and return it if found
	 *
	 * 	Throws:
	 * 	- { statusCode: 400, message: ["id must be UUID"], error: "Bad request" }
	 * 	- { statusCode: 404, message: "Client not found", error: "Not found" }
	 * 	- { statusCode: 500, message: "Unknown error", error: "Internal server error" }
	 */
	@MessagePattern({ cmd: "get-client-by-id" })
	public async getClientById(@Payload() dto: GetClientByIdDto) {
		return await this.appService.getClientById(dto.id);
	}

	/**
	 *	Get client by its email and return it if found
	 *
	 * 	Throws:
	 *  - { statusCode: 400, message: ["email must be email"], error: "Bad request" }
	 * 	- { statusCode: 404, message: "Client not found", error: "Not found" }
	 * 	- { statusCode: 500, message: "Unknown error", error: "Internal server error" }
	 */
	@MessagePattern({ cmd: "get-client-by-email" })
	public async getClientByEmail(@Payload() dto: GetClientByEmailDto) {
		return await this.appService.getClientByEmail(dto.email);
	}

	/**
	 *	Update client credentials by its id and return it if update successfully
	 *
	 * 	Throws:
	 *  - { statusCode: 400, message: ["id must be UUID"], error: "Bad request" }
	 * 	- { statusCode: 404, message: "Client not found", error: "Not found" }
	 * 	- { statusCode: 500, message: "Unknown error", error: "Internal server error" }
	 */
	@MessagePattern({ cmd: "update-client-by-id" })
	public async updateClientByID(@Payload() dto: UpdateClientByIdDto) {
		return await this.appService.updateClientById(dto);
	}
}
