import { Inject, Injectable } from "@nestjs/common";
import { ClientProxy } from "@nestjs/microservices";

import { RequestService } from "src/common/request.service";

@Injectable()
export class AccountsService {
	constructor(
		@Inject("ACCOUNTS_SERVICE") private readonly accountsService: ClientProxy,
		private readonly requestService: RequestService
	) {}

	public async ping(text: string): Promise<string> {
		return await this.requestService.sendRequest<string>(this.accountsService, "ping", { text });
	}
}
