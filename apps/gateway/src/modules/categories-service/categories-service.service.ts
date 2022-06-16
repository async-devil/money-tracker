import { Inject, Injectable } from "@nestjs/common";
import { ClientProxy } from "@nestjs/microservices";

import { RequestService } from "src/common/request.service";

@Injectable()
export class CategoriesService {
	constructor(
		@Inject("CATEGORIES_SERVICE") private readonly categoriesService: ClientProxy,
		private readonly requestService: RequestService
	) {}

	public async ping(text: string): Promise<string> {
		return await this.requestService.sendRequest<string>(this.categoriesService, "ping", {
			text,
		});
	}
}
