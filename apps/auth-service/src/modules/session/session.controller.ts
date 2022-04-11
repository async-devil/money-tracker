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

	@MessagePattern({ cmd: "create-session" })
	public async createSession(@Body() dto: CreateSessionDto): Promise<Session> {
		return await this.sessionService.createSession(dto);
	}

	@MessagePattern({ cmd: "get-session-by-token" })
	public async getSessionByToken(@Body() dto: GetSessionByTokenDto): Promise<Session> {
		return await this.sessionService.getSessionByToken(dto);
	}

	@MessagePattern({ cmd: "delete-session-by-token" })
	public async deleteSessionByToken(@Body() dto: DeleteSessionByTokenDto) {
		return await this.sessionService.deleteSessionByToken(dto);
	}
}
