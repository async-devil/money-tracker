import { Inject, Injectable } from "@nestjs/common";
import { ClientProxy } from "@nestjs/microservices";

import { RequestService } from "../common/request.service";
import { CreateClientDto } from "./types/create-client.dto";

@Injectable()
export class ClientsService {
	constructor(
		@Inject("CLIENTS_SERVICE") private readonly clientsService: ClientProxy,
		private readonly requestService: RequestService
	) {}

	public async createClient(dto: CreateClientDto) {
		return await this.requestService.sendRequest(this.clientsService, "create-client", dto);
	}

	public async getClientById(id: string) {
		return await this.requestService.sendRequest(this.clientsService, "get-client-by-id", { id });
	}
}
