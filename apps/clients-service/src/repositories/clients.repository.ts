import {
	BadRequestException,
	Injectable,
	InternalServerErrorException,
	NotFoundException,
} from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

import { CreateClientDto } from "../dtos/create-client.dto";
import { Client } from "../entities/client.entity";

@Injectable()
export class ClientsRepository {
	constructor(@InjectRepository(Client) private readonly repository: Repository<Client>) {}

	private throwDefaultError(message?: string) {
		throw new InternalServerErrorException(message || "Internal Server Error");
	}

	public async getOneByCredential(credential: { name: string; value: unknown }): Promise<Client> {
		let client: Client;

		try {
			client = await this.repository.findOne({ [`${credential.name}`]: credential.value });
		} catch (err) {
			this.throwDefaultError();
		}

		if (!client) throw new NotFoundException("Client not found");
		return client;
	}

	public async save(entity: CreateClientDto | Client): Promise<Client> {
		try {
			return await this.repository.save(entity);
		} catch (err) {
			const error = err as Error;

			if (error.message.includes("duplicate key value violates unique constraint")) {
				throw new BadRequestException("Duplicate client");
			}

			this.throwDefaultError();
		}
	}
}
