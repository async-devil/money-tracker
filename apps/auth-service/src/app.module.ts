import { Module } from "@nestjs/common";

import { AuthModule } from "src/modules/auth/auth.module";
import { SessionModule } from "src/modules/session/session.module";

import { AppController } from "./app.controller";
import { AppService } from "./app.service";

@Module({
	imports: [SessionModule, AuthModule],
	controllers: [AppController],
	providers: [AppService],
})
export class AppModule {}
