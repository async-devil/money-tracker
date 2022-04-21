import { Body, Controller } from "@nestjs/common";
import { MessagePattern } from "@nestjs/microservices";

import { Session } from "src/entities/session.entity";

import { CreateSessionDto } from "./dtos/createSession.dto";
import { DeleteSessionByTokenDto } from "./dtos/deleteSessionByToken.dto";
import { GetSessionByTokenDto } from "./dtos/getSessionByToken.dto";
import { SessionService } from "./session.service";

@Controller()
export class SessionController {
	constructor(private readonly sessionService: SessionService) {}

	/**
	 *	Create session by client id, ip and device
	 *
	 * 	Throws:
	 * 	- { statusCode: 400, message: [
	 * 		"clientId must be a UUID",
	 * 		"tokenData.ip must be an ip address",
	 * 		"tokenData.device must be a string"],
	 * 		error: "Bad request" }
	 * 	- { statusCode: 500, message: "Unknown error", error: "Internal server error" }
	 */
	@MessagePattern({ cmd: "create-session" })
	public async createSession(@Body() dto: CreateSessionDto): Promise<Session> {
		return await this.sessionService.createSession(dto);
	}

	/**
	 *	Get session by it's token, even if expired
	 *
	 * 	Throws:
	 * 	- { statusCode: 400, message: ["refresh token must be valid"], error: "Bad request" }
	 * 	- { statusCode: 404, message: "Session not found", error: "Not found"}
	 * 	- { statusCode: 500, message: "Unknown error", error: "Internal server error" }
	 */
	@MessagePattern({ cmd: "get-session-by-token" })
	public async getSessionByToken(@Body() dto: GetSessionByTokenDto): Promise<Session> {
		return await this.sessionService.getSessionByToken(dto);
	}

	/**
	 *	Delete session by it's token, would pass even if token is not found
	 *
	 * 	Throws:
	 * 	- { statusCode: 400, message: ["refresh token must be valid"], error: "Bad request" }
	 * 	- { statusCode: 500, message: "Unknown error", error: "Internal server error" }
	 */
	@MessagePattern({ cmd: "delete-session-by-token" })
	public async deleteSessionByToken(@Body() dto: DeleteSessionByTokenDto) {
		return await this.sessionService.deleteSessionByToken(dto);
	}
}
