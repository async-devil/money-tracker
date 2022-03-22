import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import * as bcrypt from "bcrypt";
import { Repository } from "typeorm";

import { CreateClientDto } from "./dtos/create-client.dto";
import { UpdateClientByIdDto } from "./dtos/update-client-by-id.dto";
import { Client } from "./entities/client.entity";
import { ClientsRepository } from "./repositories/clients.repository";

@Injectable()
export class AppService {
	constructor(
		@InjectRepository(Client) private readonly repository: Repository<Client>,
		private readonly clientsRepository: ClientsRepository
	) {}

	public ping(): string {
		return "pong";
	}

	public async createClient(dto: CreateClientDto): Promise<Client> {
		const password = await bcrypt.hash(dto.password, 5);
		return this.clientsRepository.save(Object.assign(dto, { password }));
	}

	public async getClientById(id: string): Promise<Client> {
		return this.clientsRepository.getOneByCredential({ name: "id", value: id });
	}

	public async getClientByEmail(email: string): Promise<Client> {
		return this.clientsRepository.getOneByCredential({ name: "email", value: email });
	}

	public async updateClientById(dto: UpdateClientByIdDto): Promise<Client> {
		const client = await this.getClientById(dto.id);

		Object.assign(client, {
			...dto.data,
			password: dto.data.password ? await bcrypt.hash(dto.data.password, 5) : undefined,
		});

		return await this.clientsRepository.save(client);
	}
}
