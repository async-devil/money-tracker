export class ConfigService {
	private readonly envConfig: { [key: string]: any } = {};

	constructor() {
		this.envConfig = {
			rmq: {
				host: process.env.RMQ_HOST || "localhost",
				user: process.env.RMQ_USER || "root",
				password: process.env.RMQ_PASS || "toor",
			},

			queue: process.env.TRANSACTIONS_SERVICE_QUEUE || "transactions_queue",

			options: {
				durable: true,
				arguments: {
					"x-message-ttl": 2000,
				},
			},
		};
	}

	get<Type>(key: string): Type {
		return this.envConfig[key] as Type;
	}
}
