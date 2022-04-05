import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";

import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { typeOrmConfigBase } from "./database/ormconfig";
import { Session } from "./entities/session.entity";
import { SessionStorage } from "./entities/sessionStorage.entity";
import { SessionRepository } from "./repositories/session.repository";
import { SessionStorageRepository } from "./repositories/sessionStorage.repository";
import { AccessTokenService } from "./services/accessToken.service";
import { RefreshTokenService } from "./services/refreshToken.service";

@Module({
	imports: [
		TypeOrmModule.forRoot(typeOrmConfigBase()),
		TypeOrmModule.forFeature([Session, SessionStorage]),
	],
	controllers: [AppController],
	providers: [
		AppService,
		AccessTokenService,
		RefreshTokenService,
		SessionRepository,
		SessionStorageRepository,
	],
})
export class AppModule {}
