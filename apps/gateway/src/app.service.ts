import { Injectable } from "@nestjs/common";
import { ApiProperty } from "@nestjs/swagger";

import { AccountsService } from "./modules/accounts-service/accounts-service.service";
import { AuthService } from "./modules/auth-service/auth-service.service";
import { CategoriesService } from "./modules/categories-service/categories-service.service";
import { ClientsService } from "./modules/clients-service/clients-service.service";
import { TransactionsService } from "./modules/transactions-service/transactions-service.service";

export class PingResult {
	@ApiProperty({ example: 23, description: "ping in ms" })
	readonly ping: number;

	@ApiProperty({ example: true })
	readonly error: boolean;

	@ApiProperty({ example: "auth-service sends hello!" })
	readonly message: string;
}

@Injectable()
export class AppService {
	constructor(
		private readonly authService: AuthService,
		private readonly clientsService: ClientsService,
		private readonly accountsService: AccountsService,
		private readonly categoriesService: CategoriesService,
		private readonly transactionsService: TransactionsService
	) {}

	public async ping() {
		const services = [
			this.authService,
			this.clientsService,
			this.accountsService,
			this.categoriesService,
			this.transactionsService,
		];
		const results: PingResult[] = [];

		for (const service of services) {
			const result = await this.pingOne(service);
			results.push(result);
		}

		return results;
	}

	private async pingOne(service: { ping: (text: string) => Promise<string> }): Promise<PingResult> {
		const now = Date.now();
		let isError = false;
		let message = "";

		try {
			message = await service.ping("hello!");
		} catch (err) {
			const error = err as Error;

			isError = true;
			message = error.message;
		}

		return {
			ping: Date.now() - now,
			error: isError,
			message,
		};
	}
}
