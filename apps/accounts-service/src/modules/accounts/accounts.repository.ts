import { Injectable, InternalServerErrorException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

import { Account } from "src/entities/account.entity";

@Injectable()
export class AccountsRepository {
	constructor(
		@InjectRepository(Account) private readonly accountsRepository: Repository<Account>
	) {}

	private throwDefaultError(message?: string) {
		throw new InternalServerErrorException(message || "Internal Server Error");
	}
}
