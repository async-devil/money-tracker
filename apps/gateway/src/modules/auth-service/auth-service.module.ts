import { Module } from "@nestjs/common";
import { ClientsModule, Transport } from "@nestjs/microservices";

import { RequestService } from "../../common/request.service";
import { ConfigService } from "../../config/config.service";
import { AuthController } from "./auth-service.controller";
import { AuthService } from "./auth-service.service";
import { AuthRouteController } from "./routes/auth-route.controller";
import { SessionRouteController } from "./routes/session-route.controller";
import { SessionStorageRouteController } from "./routes/sessionStorage-route.controller";

const config = new ConfigService();
const rmqConfig = config.get<{ host: string; user: string; password: string }>("rmq");

const authServiceConfig = config.get<{ queue: string }>("authService");

const url = `amqp://${rmqConfig.user}:${rmqConfig.password}@${rmqConfig.host}:5672`;

@Module({
	imports: [
		ClientsModule.register([
			{
				name: "AUTH_SERVICE",
				transport: Transport.RMQ,
				options: {
					urls: [url],
					queue: authServiceConfig.queue,
					queueOptions: {
						durable: true,
						arguments: {
							"x-message-ttl": 2000,
						},
					},
				},
			},
		]),
	],
	controllers: [
		AuthController,
		AuthRouteController,
		SessionRouteController,
		SessionStorageRouteController,
	],
	providers: [AuthService, RequestService],
})
export class AuthServiceModule {}
