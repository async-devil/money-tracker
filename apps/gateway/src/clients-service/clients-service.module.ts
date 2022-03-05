import { Module } from "@nestjs/common";
import { ClientsModule, Transport } from "@nestjs/microservices";

import { ConfigService } from "../config/config.service";
import { ClientsController } from "./clients-service.controller";
import { ClientsService } from "./clients-service.service";

const config = new ConfigService();
const rmqConfig = config.get<{ host: string; user: string; password: string }>("rmq");

const clientsServiceConfig = config.get<{ queue: string }>("clientsService");

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
		]),
	],
	controllers: [ClientsController],
	providers: [ClientsService],
})
export class ClientsServiceModule {}
