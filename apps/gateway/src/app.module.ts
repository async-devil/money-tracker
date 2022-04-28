import { Module } from "@nestjs/common";
import { RouterModule } from "@nestjs/core";

import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { AccountsServiceModule } from "./modules/accounts-service/accounts-service.module";
import { AuthServiceModule } from "./modules/auth-service/auth-service.module";
import { ClientsServiceModule } from "./modules/clients-service/clients-service.module";

@Module({
	imports: [
		AuthServiceModule,
		ClientsServiceModule,
		AccountsServiceModule,
		RouterModule.register([
			{
				path: "auth",
				module: AuthServiceModule,
			},
			{
				path: "clients",
				module: ClientsServiceModule,
			},
			{
				path: "accounts",
				module: AccountsServiceModule,
			},
		]),
	],
	controllers: [AppController],
	providers: [AppService],
})
export class AppModule {}
