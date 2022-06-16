import { Module } from "@nestjs/common";
import { ClientsModule, Transport } from "@nestjs/microservices";

import { RequestService } from "src/common/request.service";
import { ConfigService } from "src/config/config.service";

import { CategoriesService } from "./categories-service.service";

const config = new ConfigService();
const rmqConfig = config.get<{ host: string; user: string; password: string }>("rmq");

const categoriesServiceConfig = config.get<{ queue: string; options: unknown }>(
	"categoriesService"
);

const url = `amqp://${rmqConfig.user}:${rmqConfig.password}@${rmqConfig.host}:5672`;

@Module({
	imports: [
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
	controllers: [],
	providers: [CategoriesService, RequestService],
	exports: [CategoriesService],
})
export class CategoriesServiceModule {}
