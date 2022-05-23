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

	public async createClient(dto: CreateClientDto) {
		return await this.requestService.sendRequest<Client>(this.clientsService, "create-client", dto);
	}

	public async getClientById(id: string) {
		return await this.requestService.sendRequest<Client>(this.clientsService, "get-client-by-id", {
			id,
		});
	}

	public async getClientByEmail(email: string) {
		return await this.requestService.sendRequest<Client>(
			this.clientsService,
			"get-client-by-email",
			{
				email,
			}
		);
	}

	public async updateClientById(dto: UpdateClientByIdDto) {
		return await this.requestService.sendRequest<Client>(
			this.clientsService,
			"update-client-by-id",
			dto
		);
	}

	public async validateClientCredentials(dto: ValidateClientCredentialsDto) {
		return await this.requestService.sendRequest(
			this.clientsService,
			"validate-client-credentials",
			dto
		);
	}
}
