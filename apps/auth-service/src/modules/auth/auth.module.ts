import { Module } from "@nestjs/common";

import { AccessTokenService } from "src/services/accessToken.service";

import { SessionModule } from "../session/session.module";
import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";

@Module({
	imports: [SessionModule],
	controllers: [AuthController],
	providers: [AuthService, AccessTokenService],
})
export class AuthModule {}
