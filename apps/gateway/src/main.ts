import { Logger } from "@nestjs/common";
import { NestFactory } from "@nestjs/core";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
import * as cookieParser from "cookie-parser";

import { AppModule } from "./app.module";
import { ConfigService } from "./config/config.service";

async function bootstrap() {
	const config = new ConfigService();
	const port = config.get<number>("port");
	const swaggerConfig = new DocumentBuilder()
		.setTitle("Nestjs template")
		.setVersion("1.0.0")
		.addBearerAuth()
		.build();

	const app = await NestFactory.create(AppModule);

	app.setGlobalPrefix("api");

	app.use(cookieParser());

	const document = SwaggerModule.createDocument(app, swaggerConfig);
	SwaggerModule.setup("/api/docs", app, document);

	await app.listen(port);
	Logger.log(`Gateway is started on http://localhost:${port}`, "NestApplication");
}

void bootstrap();
