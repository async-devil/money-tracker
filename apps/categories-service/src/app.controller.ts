import { Controller } from "@nestjs/common";
import { MessagePattern, Payload } from "@nestjs/microservices";

import { AppService } from "./app.service";

@Controller()
export class AppController {
	constructor(private readonly appService: AppService) {}

	@MessagePattern({ cmd: "ping" })
	public ping(@Payload() data: { text: string }): string {
		return this.appService.ping(data.text);
	}
}
