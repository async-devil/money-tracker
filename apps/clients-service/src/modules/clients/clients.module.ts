import { Module } from "@nestjs/common";
import { Client } from "@nestjs/microservices";
import { TypeOrmModule } from "@nestjs/typeorm";

import { typeOrmConfigBase } from "../../database/ormconfig";
import { ClientsController } from "./clients.controller";
import { ClientsRepository } from "./clients.repository";
import { ClientsService } from "./clients.service";

@Module({
	imports: [TypeOrmModule.forRoot(typeOrmConfigBase()), TypeOrmModule.forFeature([Client])],
	controllers: [ClientsController],
	providers: [ClientsService, ClientsRepository],
	exports: [ClientsService],
})
export class ClientsModule {}
