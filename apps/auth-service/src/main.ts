import { ValidationPipe } from "@nestjs/common";
import { NestFactory } from "@nestjs/core";
import { MicroserviceOptions, Transport } from "@nestjs/microservices";

import { AppModule } from "./app.module";
import { ConfigService } from "./config/config.service";
import { RpcValidationFilter } from "./filters/RpcValidation.filter";

async function bootstrap() {
	const config = new ConfigService();
	const rmqConfig = config.get<{ host: string; user: string; password: string }>("rmq");
	const queue = config.get<string>("queue");

	const url = `amqp://${rmqConfig.user}:${rmqConfig.password}@${rmqConfig.host}:5672`;

	const app = await NestFactory.createMicroservice<MicroserviceOptions>(AppModule, {
		transport: Transport.RMQ,
		options: {
			urls: [url],
			queue: queue,
			queueOptions: {
				durable: false,
			},
		},
	});

	app.useGlobalPipes(new ValidationPipe());
	app.useGlobalFilters(new RpcValidationFilter());

	await app.listen();
}

void bootstrap();
