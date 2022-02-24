import { Controller, Get } from "@nestjs/common";
import { MessagePattern, Payload } from "@nestjs/microservices";

import { AppService } from "./app.service";

@Controller()
export class AppController {
	constructor(private readonly appService: AppService) {}

	@MessagePattern({ cmd: "ping" })
	public async ping(): Promise<string> {
		return this.appService.ping();
	}

	@MessagePattern({ cmd: "greet" })
	public async greet(@Payload() name: string): Promise<string> {
		return this.appService.greet(name);
	}
}
