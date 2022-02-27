import { Inject, Injectable } from "@nestjs/common";
import { ClientProxy } from "@nestjs/microservices";
import { defaultIfEmpty, map, Observable, takeUntil, timer, zip } from "rxjs";

@Injectable()
export class AppService {
	constructor(
		@Inject("CLIENTS_SERVICE") private readonly clientsService: ClientProxy,
		@Inject("ACCOUNTS_SERVICE") private readonly accountsService: ClientProxy,
		@Inject("TRANSACTIONS_SERVICE") private readonly transactionsService: ClientProxy,
		@Inject("AUTH_SERVICE") private readonly authService: ClientProxy
	) {}

	private pingService(service: ClientProxy): Observable<{ message: string; duration: number }> {
		const startDate = Date.now();

		const serviceObservable = service.send<string>({ cmd: "ping" }, {}).pipe(takeUntil(timer(100)));

		return serviceObservable.pipe(
			defaultIfEmpty("error"),
			map((message) => ({ message, duration: Date.now() - startDate }))
		);
	}

	public ping(): Observable<{ message: string; duration: number }[]> {
		return zip(
			this.pingService(this.clientsService),
			this.pingService(this.accountsService),
			this.pingService(this.transactionsService),
			this.pingService(this.authService)
		).pipe(
			map((messages: { message: string; duration: number }[]) => {
				return messages;
			})
		);
	}
}
