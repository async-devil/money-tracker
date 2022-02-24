import { Transport } from "@nestjs/microservices";

export class ConfigService {
	private readonly envConfig: { [key: string]: any } = null;

	constructor() {
		this.envConfig = {
			port: process.env.GATEWAY_PORT || 8000,

			clientService: {
				queue: process.env.CLIENTS_SERVICE_QUEUE || "clients_queue",
			},

			rmq: {
				host: process.env.RMQ_HOST || "localhost",
				port: process.env.RMQ_PORT || 5672,
			},
		};
	}

	get<Type>(key: string): Type {
		return this.envConfig[key] as Type;
	}
}
