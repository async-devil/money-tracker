import { Controller, Get } from "@nestjs/common";
import { ApiOperation, ApiResponse } from "@nestjs/swagger";

import { AppService, PingResult } from "./app.service";

@Controller()
export class AppController {
	constructor(private readonly appService: AppService) {}

	@ApiOperation({ summary: "ping services" })
	@ApiResponse({ status: 200, type: [PingResult] })
	@Get("ping")
	public async ping(): Promise<PingResult[]> {
		return await this.appService.ping();
	}
}
