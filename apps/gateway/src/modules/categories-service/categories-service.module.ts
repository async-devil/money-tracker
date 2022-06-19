import { Module } from "@nestjs/common";
import { ClientsModule, Transport } from "@nestjs/microservices";

import { RequestService } from "src/common/request.service";
import { ConfigService } from "src/config/config.service";

import { AuthServiceModule } from "../auth-service/auth-service.module";
import { CategoriesService } from "./categories-service.service";
import { CategoriesRouteController } from "./routes/categories-route.controller";

const config = new ConfigService();
const rmqConfig = config.get<{ host: string; user: string; password: string }>("rmq");

const categoriesServiceConfig = config.get<{ queue: string; options: unknown }>(
	"categoriesService"
);

const url = `amqp://${rmqConfig.user}:${rmqConfig.password}@${rmqConfig.host}:5672`;

@Module({
	imports: [
		AuthServiceModule,
		ClientsModule.register([
			{
				name: "CATEGORIES_SERVICE",
				transport: Transport.RMQ,
				options: {
					urls: [url],
					queue: categoriesServiceConfig.queue,
					queueOptions: categoriesServiceConfig.options,
				},
			},
		]),
	],
	controllers: [CategoriesRouteController],
	providers: [CategoriesService, RequestService],
	exports: [CategoriesService],
})
export class CategoriesServiceModule {}
