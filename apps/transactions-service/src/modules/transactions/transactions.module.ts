import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";

import { typeOrmConfigBase } from "src/database/ormconfig";
import { Transaction } from "src/entities/transaction.entity";

import { TransactionsController } from "./transactions.controller";
import { TransactionsRepository } from "./transactions.repository";
import { TransactionsService } from "./transactions.service";

@Module({
	imports: [TypeOrmModule.forRoot(typeOrmConfigBase()), TypeOrmModule.forFeature([Transaction])],
	controllers: [TransactionsController],
	providers: [TransactionsService, TransactionsRepository],
	exports: [TransactionsService],
})
export class TransactionsModule {}
