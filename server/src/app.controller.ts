import { Controller, Get } from "@nestjs/common";
import { ApiOperation, ApiResponse } from "@nestjs/swagger";

import { AppService } from "./app.service";

@Controller()
export class AppController {
	constructor(private readonly appService: AppService) {}

	@ApiOperation({ summary: "get status" })
	@ApiResponse({ status: 200, type: [String] })
	@Get()
	getStatus(): string {
		return this.appService.getStatus();
	}
}
