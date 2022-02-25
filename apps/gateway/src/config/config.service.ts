export class ConfigService {
	private readonly envConfig: { [key: string]: any } = null;

	constructor() {
		this.envConfig = {
			port: process.env.GATEWAY_PORT || 8000,

			clientsService: {
				queue: process.env.CLIENTS_SERVICE_QUEUE || "clients_queue",
			},

			accountsService: {
				queue: process.env.ACCOUNTS_SERVICE_QUEUE || "accounts_queue",
			},

			transactionsService: {
				queue: process.env.TRANSACTIONS_SERVICE_QUEUE || "transactions_queue",
			},

			authService: {
				queue: process.env.AUTH_SERVICE_QUEUE || "auth_queue",
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
