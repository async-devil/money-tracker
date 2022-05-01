export class ConfigService {
	private readonly envConfig: { [key: string]: any } = null;

	constructor() {
		this.envConfig = {
			port: process.env.GATEWAY_PORT || 8000,

			clientsService: {
				queue: process.env.CLIENTS_SERVICE_QUEUE || "clients_queue",
				options: {
					durable: true,
					arguments: {
						"x-message-ttl": 2000,
					},
				},
			},

			accountsService: {
				queue: process.env.ACCOUNTS_SERVICE_QUEUE || "accounts_queue",
				options: {
					durable: true,
					arguments: {
						"x-message-ttl": 2000,
					},
				},
			},

			transactionsService: {
				queue: process.env.TRANSACTIONS_SERVICE_QUEUE || "transactions_queue",
				options: {
					durable: true,
					arguments: {
						"x-message-ttl": 2000,
					},
				},
			},

			authService: {
				queue: process.env.AUTH_SERVICE_QUEUE || "auth_queue",
				options: {
					durable: true,
					arguments: {
						"x-message-ttl": 2000,
					},
				},
			},

			rmq: {
				host: process.env.RMQ_HOST || "localhost",
				user: process.env.RMQ_USER || "root",
				password: process.env.RMQ_PASS || "toor",
			},
		};
	}

	get<Type>(key: string): Type {
		return this.envConfig[key] as Type;
	}
}
