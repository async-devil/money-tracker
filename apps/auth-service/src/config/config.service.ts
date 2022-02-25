export class ConfigService {
	private readonly envConfig: { [key: string]: any } = {};

	constructor() {
		this.envConfig = {
			rmq: {
				host: process.env.RMQ_HOST || "localhost",
				port: process.env.RMQ_PORT || 5672,
			},

			queue: process.env.AUTH_SERVICE_QUEUE || "auth_queue",
		};
	}

	get<Type>(key: string): Type {
		return this.envConfig[key] as Type;
	}
}
