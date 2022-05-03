import { Inject, Injectable } from "@nestjs/common";
import { ClientProxy } from "@nestjs/microservices";

import { RequestService } from "../../common/request.service";
import { CreateClientDto } from "./types/request/create-client.dto";
import { UpdateClientByIdDto } from "./types/request/update-client-by-id.dto";

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
		return await this.requestService.sendRequest(this.clientsService, "create-client", dto);
	}

	public async getClientById(id: string) {
		return await this.requestService.sendRequest(this.clientsService, "get-client-by-id", { id });
	}

	public async updateClientById(dto: UpdateClientByIdDto) {
		return await this.requestService.sendRequest(this.clientsService, "update-client-by-id", dto);
	}
}
