import { Inject, Injectable } from "@nestjs/common";
import { ClientProxy } from "@nestjs/microservices";

import { RequestService } from "../../common/request.service";
import { CreateClientDto } from "./types/request/create-client.dto";
import { UpdateClientByIdDto } from "./types/request/update-client-by-id.dto";
import { ValidateClientCredentialsDto } from "./types/request/validate-client-credentials.dto";
import { Client } from "./types/response/client.entity";

@Injectable()
export class ClientsService {
	constructor(
		@Inject("CLIENTS_SERVICE") private readonly clientsService: ClientProxy,
		private readonly requestService: RequestService
	) {}

	public async ping(text: string): Promise<string> {
		return await this.requestService.sendRequest<string>(this.clientsService, "ping", { text });
	}

	/**
	 *	Create new client from dto and return it if successfully
	 *
	 * 	Throws:
	 * 	- { statusCode: 400, message: ["email must be email"], error: "Bad request" }
	 * 	- { statusCode: 400, message: "Duplicate error", error: "Bad request" }
	 * 	- { statusCode: 500, message: "Unknown error", error: "Internal server error" }
	 */
	public async create(dto: CreateClientDto) {
		return await this.requestService.sendRequest<Client>(this.clientsService, "create-client", dto);
	}

	/**
	 *	Get client by its id and return it if found
	 *
	 * 	Throws:
	 * 	- { statusCode: 400, message: ["id must be UUID"], error: "Bad request" }
	 * 	- { statusCode: 404, message: "Client not found", error: "Not found" }
	 * 	- { statusCode: 500, message: "Unknown error", error: "Internal server error" }
	 */
	public async getById(id: string) {
		return await this.requestService.sendRequest<Client>(this.clientsService, "get-client-by-id", {
			id,
		});
	}

	/**
	 *	Get client by its email and return it if found
	 *
	 * 	Throws:
	 * 	- { statusCode: 400, message: ["email must be email"], error: "Bad request" }
	 * 	- { statusCode: 404, message: "Client not found", error: "Not found" }
	 * 	- { statusCode: 500, message: "Unknown error", error: "Internal server error" }
	 */
	public async getByEmail(email: string) {
		return await this.requestService.sendRequest<Client>(
			this.clientsService,
			"get-client-by-email",
			{
				email,
			}
		);
	}

	/**
	 *	Delete client by its id, would pass even if client is not found
	 *
	 * 	Throws:
	 * 	- { statusCode: 400, message: ["id must be UUID"], error: "Bad request" }
	 * 	- { statusCode: 500, message: "Unknown error", error: "Internal server error" }
	 */
	public async deleteById(id: string) {
		return await this.requestService.sendRequest<Client>(
			this.clientsService,
			"delete-client-by-id",
			{
				id,
			}
		);
	}

	/**
	 *	Update client credentials by its id and return it if update successfully
	 *
	 * 	Throws:
	 * 	- { statusCode: 400, message: ["id must be UUID"], error: "Bad request" }
	 * 	- { statusCode: 404, message: "Client not found", error: "Not found" }
	 * 	- { statusCode: 500, message: "Unknown error", error: "Internal server error" }
	 */
	public async updateById(dto: UpdateClientByIdDto) {
		return await this.requestService.sendRequest<Client>(
			this.clientsService,
			"update-client-by-id",
			dto
		);
	}

	/**
	 *	Validate client email and password, if invalid throw
	 *
	 * 	Throws:
	 * 	- { statusCode: 400, message: ["email must be email"], error: "Bad request" }
	 * 	- { statusCode: 401, message: "Invalid client credentials", error: "Unauthorized" }
	 */
	public async validateCredentials(dto: ValidateClientCredentialsDto) {
		return await this.requestService.sendRequest(
			this.clientsService,
			"validate-client-credentials",
			dto
		);
	}
}
