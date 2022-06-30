import { Module } from "@nestjs/common";
import { ClientsModule, Transport } from "@nestjs/microservices";

import { RequestService } from "src/common/request.service";
import { ConfigService } from "src/config/config.service";

import { AuthServiceModule } from "../auth-service/auth-service.module";
import { TransactionsRouteController } from "./routes/transactions-route.controller";
import { TransactionsService } from "./transactions-service.service";

const config = new ConfigService();
const rmqConfig = config.get<{ host: string; user: string; password: string }>("rmq");

const transactionsServiceConfig = config.get<{ queue: string; options: unknown }>(
	"transactionsService"
);

const url = `amqp://${rmqConfig.user}:${rmqConfig.password}@${rmqConfig.host}:5672`;

@Module({
	imports: [
		AuthServiceModule,
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
	controllers: [TransactionsRouteController],
	providers: [TransactionsService, RequestService],
	exports: [TransactionsService],
})
export class TransactionsServiceModule {}
