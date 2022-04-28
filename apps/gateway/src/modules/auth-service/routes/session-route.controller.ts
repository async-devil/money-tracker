import { Body, Controller, Delete, HttpException, Post } from "@nestjs/common";
import { ApiOperation, ApiResponse } from "@nestjs/swagger";

import { AuthService } from "../auth-service.service";
import { CreateSessionDto } from "../types/request/createSession.dto";
import { DeleteSessionByTokenDto } from "../types/request/deleteSessionByToken.dto";
import { Session } from "../types/response/session.entity";

@Controller()
export class SessionRouteController {
	constructor(private readonly authService: AuthService) {}

	@ApiOperation({ summary: "create session" })
	@ApiResponse({
		status: 201,
		type: Session,
		description: "New session",
	})
	@ApiResponse({ status: 400, type: HttpException, description: "Invalid request" })
	@ApiResponse({ status: 504, type: HttpException, description: "Microservice timeout" })
	@ApiResponse({ status: 502, type: HttpException, description: "Bad gateway" })
	@Post("/session")
	public async createSession(@Body() dto: CreateSessionDto): Promise<Session> {
		return await this.authService.createSession(dto);
	}

	@ApiOperation({ summary: "delete session" })
	@ApiResponse({
		status: 200,
		description: "Nothing",
	})
	@ApiResponse({ status: 400, type: HttpException, description: "Invalid request" })
	@ApiResponse({ status: 504, type: HttpException, description: "Microservice timeout" })
	@ApiResponse({ status: 502, type: HttpException, description: "Bad gateway" })
	@Delete("/session")
	public async deleteSessionByToken(
		@Body() dto: DeleteSessionByTokenDto
	): Promise<Record<string, never>> {
		return await this.authService.deleteSessionByToken(dto);
	}
}
