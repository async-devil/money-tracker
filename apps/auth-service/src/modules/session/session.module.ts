import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";

import { typeOrmConfigBase } from "src/database/ormconfig";
import { Session } from "src/entities/session.entity";
import { RefreshTokenService } from "src/services/refreshToken.service";

import { SessionController } from "./session.controller";
import { SessionRepository } from "./session.repository";
import { SessionService } from "./session.service";

@Module({
	imports: [TypeOrmModule.forRoot(typeOrmConfigBase()), TypeOrmModule.forFeature([Session])],
	controllers: [SessionController],
	providers: [SessionService, SessionRepository, RefreshTokenService],
	exports: [SessionService],
})
export class SessionModule {}
