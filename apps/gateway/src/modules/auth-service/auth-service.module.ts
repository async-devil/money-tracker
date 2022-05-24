import { forwardRef, Module } from "@nestjs/common";
import { ClientsModule, Transport } from "@nestjs/microservices";

import { RequestService } from "../../common/request.service";
import { ConfigService } from "../../config/config.service";
import { ClientsServiceModule } from "../clients-service/clients-service.module";
import { AuthService } from "./auth-service.service";
import { AuthRouteController } from "./routes/auth-route.controller";
import { SessionRouteController } from "./routes/session-route.controller";

const config = new ConfigService();
const rmqConfig = config.get<{ host: string; user: string; password: string }>("rmq");

const authServiceConfig = config.get<{ queue: string; options: unknown }>("authService");

const url = `amqp://${rmqConfig.user}:${rmqConfig.password}@${rmqConfig.host}:5672`;

@Module({
	imports: [
		forwardRef(() => ClientsServiceModule),
		ClientsModule.register([
			{
				name: "AUTH_SERVICE",
				transport: Transport.RMQ,
				options: {
					urls: [url],
					queue: authServiceConfig.queue,
					queueOptions: authServiceConfig.options,
				},
			},
		]),
	],
	controllers: [AuthRouteController, SessionRouteController],
	providers: [AuthService, RequestService],
	exports: [AuthService],
})
export class AuthServiceModule {}
