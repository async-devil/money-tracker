import { Module } from "@nestjs/common";

import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { AccountsModule } from "./modules/accounts/accounts.module";

@Module({
	imports: [AccountsModule],
	controllers: [AppController],
	providers: [AppService],
})
export class AppModule {}
