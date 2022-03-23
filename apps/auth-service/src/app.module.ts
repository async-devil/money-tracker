import { Module } from "@nestjs/common";
import { Client } from "@nestjs/microservices";
import { TypeOrmModule } from "@nestjs/typeorm";

import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { typeOrmConfigBase } from "./database/ormconfig";

@Module({
	imports: [TypeOrmModule.forRoot(typeOrmConfigBase()), TypeOrmModule.forFeature([Client])],
	controllers: [AppController],
	providers: [AppService],
})
export class AppModule {}
