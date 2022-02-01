import { join } from "path";

import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { MongooseModule } from "@nestjs/mongoose";
import { ServeStaticModule } from "@nestjs/serve-static";

import { AppController } from "./app.controller";
import { AppService } from "./app.service";

const HOST = `${process.env.MONGO_HOST || "mongodb://localhost"}`;
const PORT = `${process.env.MONGO_PORT || "27017"}`;
const DB = `${process.env.MONGO_DB || "test"}`;

@Module({
	imports: [
		ServeStaticModule.forRoot({
			rootPath: join(__dirname, "../build"),
			exclude: ["/api*"],
		}),
		ConfigModule.forRoot({
			envFilePath: join(__dirname, `../.env.${process.env.NODE_ENV}`),
		}),
		MongooseModule.forRoot(`${HOST}:${PORT}/${DB}`),
	],
	controllers: [AppController],
	providers: [AppService],
})
export class AppModule {}
