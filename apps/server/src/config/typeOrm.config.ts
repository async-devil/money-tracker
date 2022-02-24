import { TypeOrmModuleOptions } from "@nestjs/typeorm";
import "dotenv/config";

export const typeOrmConfigBase = (): TypeOrmModuleOptions => {
	return {
		type: "postgres",

		host: process.env.TYPEORM_HOST || "127.0.0.1",
		port: parseInt(process.env.TYPEORM_PORT) || 5432,
		username: process.env.TYPEORM_USERNAME || "postgres",
		password: process.env.TYPEORM_PASSWORD || "toor",
		database: process.env.TYPEORM_DATABASE || "test",

		entities: ["**/*.entity.js"],
	};
};

export const typeOrmConfig = (): TypeOrmModuleOptions => {
	return Object.assign(typeOrmConfigBase(), {
		entities: ["**/*.entity.ts"],

		migrationsTableName: "migration",
		migrations: ["server/src/migrations/*.ts"],

		cli: {
			migrationsDir: "server/src/migrations",
		},

		ssl: process.env.NODE_ENV === "production",
	});
};
