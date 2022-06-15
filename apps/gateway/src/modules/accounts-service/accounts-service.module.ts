import { Module } from "@nestjs/common";
import { ClientsModule, Transport } from "@nestjs/microservices";

import { RequestService } from "src/common/request.service";
import { ConfigService } from "src/config/config.service";
import { AuthServiceModule } from "src/modules/auth-service/auth-service.module";

import { AccountsService } from "./accounts-service.service";
import { AccountsRouteController } from "./routes/accounts-route.controller";
import { OperationsRouteController } from "./routes/operations-route.controller";

const config = new ConfigService();
const rmqConfig = config.get<{ host: string; user: string; password: string }>("rmq");

const accountsServiceConfig = config.get<{ queue: string; options: unknown }>("accountsService");

const url = `amqp://${rmqConfig.user}:${rmqConfig.password}@${rmqConfig.host}:5672`;

@Module({
	imports: [
		AuthServiceModule,
		ClientsModule.register([
			{
				name: "ACCOUNTS_SERVICE",
				transport: Transport.RMQ,
				options: {
					urls: [url],
					queue: accountsServiceConfig.queue,
					queueOptions: accountsServiceConfig.options,
				},
			},
		]),
	],
	controllers: [AccountsRouteController, OperationsRouteController],
	providers: [AccountsService, RequestService],
	exports: [AccountsService],
})
export class AccountsServiceModule {}
