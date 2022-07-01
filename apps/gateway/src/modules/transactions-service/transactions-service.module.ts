import { Module, forwardRef } from "@nestjs/common";
import { ClientsModule, Transport } from "@nestjs/microservices";

import { RequestService } from "src/common/request.service";
import { ConfigService } from "src/config/config.service";

import { AccountsServiceModule } from "../accounts-service/accounts-service.module";
import { AuthServiceModule } from "../auth-service/auth-service.module";
import { CategoriesServiceModule } from "../categories-service/categories-service.module";
import { TransactionsRouteController } from "./routes/transactions-route.controller";
import { TransactionsOperationsService } from "./services/transactions-operations.service";
import { TransactionsService } from "./transactions-service.service";

const config = new ConfigService();
const rmqConfig = config.get<{ host: string; user: string; password: string }>("rmq");

const transactionsServiceConfig = config.get<{ queue: string; options: unknown }>(
	"transactionsService"
);

const url = `amqp://${rmqConfig.user}:${rmqConfig.password}@${rmqConfig.host}:5672`;

@Module({
	imports: [
		forwardRef(() => AuthServiceModule),
		forwardRef(() => AccountsServiceModule),
		forwardRef(() => CategoriesServiceModule),
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
	providers: [TransactionsService, TransactionsOperationsService, RequestService],
	exports: [TransactionsService, TransactionsOperationsService],
})
export class TransactionsServiceModule {}
