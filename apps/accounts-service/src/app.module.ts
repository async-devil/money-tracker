import { Module } from "@nestjs/common";

import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { AccountsModule } from "./modules/accounts/accounts.module";
import { OperationsModule } from "./modules/operations/operations.module";

@Module({
	imports: [AccountsModule, OperationsModule],
	controllers: [AppController],
	providers: [AppService],
})
export class AppModule {}
