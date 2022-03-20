import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";

import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { typeOrmConfigBase } from "./database/ormconfig";
import { Client } from "./entities/client.entity";
import { ClientsRepository } from "./repositories/clients.repository";

@Module({
	imports: [TypeOrmModule.forRoot(typeOrmConfigBase()), TypeOrmModule.forFeature([Client])],
	controllers: [AppController],
	providers: [AppService, ClientsRepository],
})
export class AppModule {}
