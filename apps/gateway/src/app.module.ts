import { Module } from "@nestjs/common";
import { RouterModule } from "@nestjs/core";

import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { AccountsServiceModule } from "./modules/accounts-service/accounts-service.module";
import { AuthServiceModule } from "./modules/auth-service/auth-service.module";
import { CategoriesServiceModule } from "./modules/categories-service/categories-service.module";
import { ClientsServiceModule } from "./modules/clients-service/clients-service.module";
import { TransactionsServiceModule } from "./modules/transactions-service/transactions-service.module";

@Module({
	imports: [
		AuthServiceModule,
		ClientsServiceModule,
		AccountsServiceModule,
		CategoriesServiceModule,
		TransactionsServiceModule,
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
			{
				path: "categories",
				module: CategoriesServiceModule,
			},
			{
				path: "transactions",
				module: TransactionsServiceModule,
			},
		]),
	],
	controllers: [AppController],
	providers: [AppService],
})
export class AppModule {}
