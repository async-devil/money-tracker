import { Module } from "@nestjs/common";
import { ClientsModule, Transport } from "@nestjs/microservices";

import { RequestService } from "src/common/request.service";
import { ConfigService } from "src/config/config.service";

import { AccountsService } from "./accounts-service.service";

const config = new ConfigService();
const rmqConfig = config.get<{ host: string; user: string; password: string }>("rmq");

const accountsServiceConfig = config.get<{ queue: string; options: unknown }>("accountsService");

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
					queueOptions: accountsServiceConfig.options,
				},
			},
		]),
	],
	controllers: [],
	providers: [AccountsService, RequestService],
	exports: [AccountsService],
})
export class AccountsServiceModule {}
