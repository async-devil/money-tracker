import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

import { Transaction } from "src/entities/transaction.entity";

@Injectable()
export class TransactionsRepository {
	constructor(
		@InjectRepository(Transaction) private readonly transactionsRepository: Repository<Transaction>
	) {}
}
