import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";

import { typeOrmConfigBase } from "src/database/ormconfig";
import { Account } from "src/entities/account.entity";

import { AccountsController } from "./accounts.controller";
import { AccountsRepository } from "./accounts.repository";
import { AccountsService } from "./accounts.service";

@Module({
	imports: [TypeOrmModule.forRoot(typeOrmConfigBase()), TypeOrmModule.forFeature([Account])],
	controllers: [AccountsController],
	providers: [AccountsService, AccountsRepository],
	exports: [AccountsService],
})
export class AccountsModule {}
