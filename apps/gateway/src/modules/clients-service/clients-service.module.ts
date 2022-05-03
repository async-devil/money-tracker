import { Module } from "@nestjs/common";
import { ClientsModule, Transport } from "@nestjs/microservices";

import { RequestService } from "../../common/request.service";
import { ConfigService } from "../../config/config.service";
import { ClientsService } from "./clients-service.service";
import { ClientsRouteController } from "./routes/clients-route.controller";

const config = new ConfigService();
const rmqConfig = config.get<{ host: string; user: string; password: string }>("rmq");

const clientsServiceConfig = config.get<{ queue: string; options: unknown }>("clientsService");

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
					queueOptions: clientsServiceConfig.options,
				},
			},
		]),
	],
	controllers: [ClientsRouteController],
	providers: [ClientsService, RequestService],
	exports: [ClientsService],
})
export class ClientsServiceModule {}
