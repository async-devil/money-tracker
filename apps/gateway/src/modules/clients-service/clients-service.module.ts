import { forwardRef, Module } from "@nestjs/common";
import { ClientsModule, Transport } from "@nestjs/microservices";

import { AccountsServiceModule } from "src/modules/accounts-service/accounts-service.module";
import { AuthServiceModule } from "src/modules/auth-service/auth-service.module";

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
		forwardRef(() => AuthServiceModule),
		forwardRef(() => AccountsServiceModule),
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
