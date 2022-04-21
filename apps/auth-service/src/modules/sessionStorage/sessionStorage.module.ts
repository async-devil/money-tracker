import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";

import { typeOrmConfigBase } from "src/database/ormconfig";
import { Session } from "src/entities/session.entity";

import { SessionStorageController } from "./sessionStorage.controller";
import { SessionStorageRepository } from "./sessionStorage.repository";
import { SessionStorageService } from "./sessionStorage.service";

@Module({
	imports: [TypeOrmModule.forRoot(typeOrmConfigBase()), TypeOrmModule.forFeature([Session])],
	controllers: [SessionStorageController],
	providers: [SessionStorageService, SessionStorageRepository],
	exports: [SessionStorageService],
})
export class SessionStorageModule {}
