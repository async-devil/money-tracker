import { Module } from "@nestjs/common";
import { ClientsModule, Transport } from "@nestjs/microservices";

import { RequestService } from "src/common/request.service";
import { ConfigService } from "src/config/config.service";

import { AccountsController } from "./accounts-service.controller";
import { AccountsService } from "./accounts-service.service";

const config = new ConfigService();
const rmqConfig = config.get<{ host: string; user: string; password: string }>("rmq");

const accountsServiceConfig = config.get<{ queue: string }>("accountsService");

const url = `amqp://${rmqConfig.user}:${rmqConfig.password}@${rmqConfig.host}:5672`;

@Module({
	imports: [
		ClientsModule.register([
			{
				name: "ACCOUNTS_SERVICE",
				transport: Transport.RMQ,
				options: {
					urls: [url],
					queue: accountsServiceConfig.queue,
					queueOptions: {
						expires: 2000,
					},
				},
			},
		]),
	],
	controllers: [AccountsController],
	providers: [AccountsService, RequestService],
})
export class AccountsServiceModule {}
