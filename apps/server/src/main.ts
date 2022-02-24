import { Logger } from "@nestjs/common";
import { NestFactory } from "@nestjs/core";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";

import { AppModule } from "./app/app.module";

const port = process.env.SERVER_PORT || 5000;
const host = process.env.SERVER_HOST || "localhost";

async function bootstrap() {
	const app = await NestFactory.create(AppModule);
	const config = new DocumentBuilder().setTitle("Nestjs template").setVersion("1.0.0").build();

	app.setGlobalPrefix("api");

	const document = SwaggerModule.createDocument(app, config);
	SwaggerModule.setup("/api/docs", app, document);

	await app.listen(port, host);
	Logger.log(`Server is starting on http://${host}:${port}`, "NestApplication");
}

void bootstrap();
