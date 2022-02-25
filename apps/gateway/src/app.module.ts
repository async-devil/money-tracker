import { Module } from "@nestjs/common";
import { ClientsModule, Transport } from "@nestjs/microservices";

import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { ConfigService } from "./config/config.service";

const config = new ConfigService();
const rmqConfig = config.get<{ host: string; port: number }>("rmq");

const clientsServiceConfig = config.get<{ queue: string }>("clientsService");
const accountsServiceConfig = config.get<{ queue: string }>("accountsService");
const transactionsServiceConfig = config.get<{ queue: string }>("transactionsService");
const authServiceConfig = config.get<{ queue: string }>("authService");

@Module({
	imports: [
		ClientsModule.register([
			{
				name: "CLIENTS_SERVICE",
				transport: Transport.RMQ,
				options: {
					urls: [`amqp://${rmqConfig.host}:${rmqConfig.port}`],
					queue: clientsServiceConfig.queue,
					queueOptions: {
						durable: false,
					},
				},
			},
			{
				name: "ACCOUNTS_SERVICE",
				transport: Transport.RMQ,
				options: {
					urls: [`amqp://${rmqConfig.host}:${rmqConfig.port}`],
					queue: accountsServiceConfig.queue,
					queueOptions: {
						durable: false,
					},
				},
			},
			{
				name: "TRANSACTIONS_SERVICE",
				transport: Transport.RMQ,
				options: {
					urls: [`amqp://${rmqConfig.host}:${rmqConfig.port}`],
					queue: transactionsServiceConfig.queue,
					queueOptions: {
						durable: false,
					},
				},
			},
			{
				name: "AUTH_SERVICE",
				transport: Transport.RMQ,
				options: {
					urls: [`amqp://${rmqConfig.host}:${rmqConfig.port}`],
					queue: authServiceConfig.queue,
					queueOptions: {
						durable: false,
					},
				},
			},
		]),
	],
	controllers: [AppController],
	providers: [AppService],
})
export class AppModule {}
