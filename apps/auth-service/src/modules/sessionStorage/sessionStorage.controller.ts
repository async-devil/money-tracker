import { Body, Controller } from "@nestjs/common";
import { MessagePattern } from "@nestjs/microservices";

import { DeleteSessionsByClientIdDto } from "./dtos/deleteSessionsByClientId.dto";
import { GetSessionsByClientIdDto } from "./dtos/getSessionsByClientId.dto";
import { SessionStorageService } from "./sessionStorage.service";

@Controller()
export class SessionStorageController {
	constructor(private readonly sessionStorageService: SessionStorageService) {}

	/**
	 *	Get all sessions by their client id, would pass even if tokens are not found
	 *
	 * 	Throws:
	 * 	- { statusCode: 400, message: ["clientId must be a UUID"], error: "Bad request" }
	 * 	- { statusCode: 500, message: "Unknown error", error: "Internal server error" }
	 */
	@MessagePattern({ cmd: "get-all-sessions-by-client-id" })
	public async getAllSessionsByClientId(@Body() dto: GetSessionsByClientIdDto) {
		return await this.sessionStorageService.getAllSessionsByClientId(dto);
	}

	/**
	 *	Delete all sessions by their client id, would pass even if tokens are not found
	 *
	 * 	Throws:
	 * 	- { statusCode: 400, message: ["clientId must be a UUID"], error: "Bad request" }
	 * 	- { statusCode: 500, message: "Unknown error", error: "Internal server error" }
	 */
	@MessagePattern({ cmd: "delete-all-sessions-by-client-id" })
	public async deleteAllSessionsByClientId(@Body() dto: DeleteSessionsByClientIdDto) {
		return await this.sessionStorageService.deleteAllSessionsByClientId(dto);
	}
}
