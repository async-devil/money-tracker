import { Module } from "@nestjs/common";
import { ClientsModule, Transport } from "@nestjs/microservices";

import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { ConfigService } from "./config/config.service";

const config = new ConfigService();
const rmqConfig = config.get<{ host: string; port: number }>("rmq");
const clientServiceConfig = config.get<{ queue: string }>("clientService");

@Module({
	imports: [
		ClientsModule.register([
			{
				name: "CLIENTS_SERVICE",
				transport: Transport.RMQ,
				options: {
					urls: [`amqp://${rmqConfig.host}:${rmqConfig.port}`],
					queue: clientServiceConfig.queue,
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
