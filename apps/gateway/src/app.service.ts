import { Inject, Injectable } from "@nestjs/common";
import { ClientProxy } from "@nestjs/microservices";
import { firstValueFrom } from "rxjs";

@Injectable()
export class AppService {
	constructor(
		@Inject("CLIENTS_SERVICE") private readonly clientsService: ClientProxy,
		@Inject("ACCOUNTS_SERVICE") private readonly accountsService: ClientProxy,
		@Inject("TRANSACTIONS_SERVICE") private readonly transactionsService: ClientProxy,
		@Inject("AUTH_SERVICE") private readonly authService: ClientProxy
	) {}

	public async *pingGenerator() {
		const services = [
			this.clientsService,
			this.accountsService,
			this.transactionsService,
			this.authService,
		];

		for await (const service of services) {
			const serviceObservable = service.send({ cmd: "ping" }, Date.now());

			yield await firstValueFrom(serviceObservable);
		}
	}

	public async ping() {
		const pings = [];

		for await (const ping of this.pingGenerator()) pings.push(ping);

		return pings.join(" ");
	}
}
