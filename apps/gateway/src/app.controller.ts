import { Controller, Get } from "@nestjs/common";

import { AppService, PingResult } from "./app.service";

@Controller()
export class AppController {
	constructor(private readonly appService: AppService) {}

	@Get("ping")
	public async ping(): Promise<PingResult[]> {
		return await this.appService.ping();
	}
}
