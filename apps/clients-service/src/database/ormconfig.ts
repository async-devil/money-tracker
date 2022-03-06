import * as path from "path";

import { ConnectionOptions } from "typeorm";

export const typeOrmConfigBase = (): ConnectionOptions => {
	return {
		type: "postgres",

		host: process.env.TYPEORM_HOST || "127.0.0.1",
		port: parseInt(process.env.TYPEORM_PORT) || 5432,
		username: process.env.TYPEORM_USERNAME || "root",
		password: process.env.TYPEORM_PASSWORD || "toor",
		database: process.env.TYPEORM_DATABASE || "money-tracker",

		migrationsRun: false,
		dropSchema: false,

		entities: [
			path.join(__dirname, "..", "entities", "**", "*.*"),
			path.join(__dirname, "..", "entities", "*.*"),
		],
		migrations: [path.join(__dirname, "migrations", "*.*")],
	};
};

export default Object.assign(typeOrmConfigBase(), {
	cli: {
		entitiesDir: path.join(__dirname, "..", "entities"),
		migrationsDir: path.join(__dirname, "migrations"),
	},
}) as ConnectionOptions;
