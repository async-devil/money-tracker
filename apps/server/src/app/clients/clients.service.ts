import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

import { ErrorsService } from "../errors/errors.service";
import { CreateClientDto } from "./dtos/create-client.dto";
import { Client } from "./models/client.entity";

@Injectable()
export class ClientsService {
	constructor(
		@InjectRepository(Client) private readonly clientRepository: Repository<Client>,
		private readonly errorsService: ErrorsService
	) {}

	public async getById(id: string): Promise<Client> {
		const client = await this.clientRepository.findOne(id);

		if (!client) throw new NotFoundException();

		return client;
	}

	public async getByEmail(email: string): Promise<Client> {
		const client = await this.clientRepository.findOne({ email });

		if (!client) this.errorsService.throwNotFoundError();

		return client;
	}

	public async create(clientDto: CreateClientDto): Promise<Client> {
		try {
			return await this.clientRepository.save(clientDto);
		} catch (err) {
			this.errorsService.checkDuplicationError(err as Error);
			this.errorsService.throwDefaultError(err as Error);
		}
	}
}
