import { join } from "path";

import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { ServeStaticModule } from "@nestjs/serve-static";
import { TypeOrmModule } from "@nestjs/typeorm";

import { typeOrmConfigBase } from "../config/typeOrm.config";
import { AuthModule } from "./auth/auth.module";
import { ClientsModule } from "./clients/clients.module";

const HOST = `${process.env.MONGO_HOST || "localhost"}`;
const PORT = `${process.env.MONGO_PORT || "5432"}`;
const DB = `${process.env.MONGO_DB || "test"}`;

@Module({
	imports: [
		ServeStaticModule.forRoot({
			rootPath: join(__dirname, "../../build"),
			exclude: ["/api*"],
		}),
		ConfigModule.forRoot({
			envFilePath: join(__dirname, `../../.env.${process.env.NODE_ENV}`),
		}),
		TypeOrmModule.forRoot(typeOrmConfigBase()),
		ClientsModule,
		AuthModule,
	],
})
export class AppModule {}
