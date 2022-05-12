import { Injectable, UnauthorizedException } from "@nestjs/common";
import * as bcrypt from "bcrypt";

import { Client } from "src/entities/client.entity";
import { ClientsService } from "src/modules/clients/clients.service";

import { ValidateClientCredentialsDto } from "./dtos/validate-client-credentials.dto";

@Injectable()
export class AccessService {
	constructor(private readonly clientsService: ClientsService) {}

	public async validateClientCredentials(
		dto: ValidateClientCredentialsDto
	): Promise<{ result: boolean }> {
		let client: Client;

		try {
			client = await this.clientsService.getClientByEmail(dto.email);
		} catch (err) {
			throw new UnauthorizedException("Invalid client credentials");
		}

		const passwordMathes = await bcrypt.compare(dto.password, client.password);

		if (!passwordMathes) throw new UnauthorizedException("Invalid client credentials");

		return { result: passwordMathes };
	}
}
