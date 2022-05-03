import { Module } from "@nestjs/common";
import { ClientsModule, Transport } from "@nestjs/microservices";

import { RequestService } from "src/common/request.service";
import { ConfigService } from "src/config/config.service";

import { TransactionsService } from "./transactions-service.service";

const config = new ConfigService();
const rmqConfig = config.get<{ host: string; user: string; password: string }>("rmq");

const transactionsServiceConfig = config.get<{ queue: string; options: unknown }>(
	"transactionsService"
);

const url = `amqp://${rmqConfig.user}:${rmqConfig.password}@${rmqConfig.host}:5672`;

@Module({
	imports: [
		ClientsModule.register([
			{
				name: "TRANSACTIONS_SERVICE",
				transport: Transport.RMQ,
				options: {
					urls: [url],
					queue: transactionsServiceConfig.queue,
					queueOptions: transactionsServiceConfig.options,
				},
			},
		]),
	],
	controllers: [],
	providers: [TransactionsService, RequestService],
	exports: [TransactionsService],
})
export class TransactionsServiceModule {}
