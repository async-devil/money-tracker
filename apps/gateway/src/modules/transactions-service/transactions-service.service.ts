import { Inject, Injectable } from "@nestjs/common";
import { ClientProxy } from "@nestjs/microservices";

import { RequestService } from "src/common/request.service";

@Injectable()
export class TransactionsService {
	constructor(
		@Inject("TRANSACTIONS_SERVICE") private readonly transactionsService: ClientProxy,
		private readonly requestService: RequestService
	) {}

	public async ping(text: string): Promise<string> {
		return await this.requestService.sendRequest<string>(this.transactionsService, "ping", {
			text,
		});
	}
}
