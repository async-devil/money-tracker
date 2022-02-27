import { Module } from "@nestjs/common";
import { ClientsModule, Transport } from "@nestjs/microservices";

import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { ConfigService } from "./config/config.service";

const config = new ConfigService();
const rmqConfig = config.get<{ host: string; user: string; password: string }>("rmq");

const clientsServiceConfig = config.get<{ queue: string }>("clientsService");
const accountsServiceConfig = config.get<{ queue: string }>("accountsService");
const transactionsServiceConfig = config.get<{ queue: string }>("transactionsService");
const authServiceConfig = config.get<{ queue: string }>("authService");

const url = `amqp://${rmqConfig.user}:${rmqConfig.password}@${rmqConfig.host}:5672`;

@Module({
	imports: [
		ClientsModule.register([
			{
				name: "CLIENTS_SERVICE",
				transport: Transport.RMQ,
				options: {
					urls: [url],
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
					urls: [url],
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
					urls: [url],
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
					urls: [url],
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
