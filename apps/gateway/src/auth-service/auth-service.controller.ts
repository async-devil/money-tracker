import { Body, Controller, Delete, Get, HttpException, Param, Post } from "@nestjs/common";
import { ApiOperation, ApiResponse } from "@nestjs/swagger";

import { AuthService } from "./auth-service.service";
import { CreateSessionDto } from "./types/request/createSession.dto";
import { DeleteSessionByTokenDto } from "./types/request/deleteSessionByToken.dto";
import { GenerateTokenPairDto } from "./types/request/generateTokenPair.dto";
import { ValidateAccessTokenDto } from "./types/request/validateAccessToken.dto";
import { Session } from "./types/response/session.entity";
import { TokenPairDto } from "./types/response/tokenPair.dto";
import { ValidateAccessTokenResultDto } from "./types/response/validateAccessTokenResult.dto";

@Controller("auth")
export class AuthController {
	constructor(private readonly authService: AuthService) {}

	@ApiOperation({ summary: "validate access token" })
	@ApiResponse({
		status: 201,
		type: ValidateAccessTokenResultDto,
		description: "Result of validation",
	})
	@ApiResponse({ status: 400, type: HttpException, description: "Invalid request" })
	@ApiResponse({ status: 504, type: HttpException, description: "Microservice timeout" })
	@ApiResponse({ status: 502, type: HttpException, description: "Bad gateway" })
	@Post("/auth")
	public async validateAccessToken(
		@Body() dto: ValidateAccessTokenDto
	): Promise<ValidateAccessTokenResultDto> {
		return await this.authService.validateAccessToken(dto);
	}

	@ApiOperation({ summary: "generate token pair" })
	@ApiResponse({ status: 201, type: TokenPairDto, description: "Refresh and access tokens" })
	@ApiResponse({ status: 400, type: HttpException, description: "Invalid request" })
	@ApiResponse({ status: 401, type: HttpException, description: "Session expired" })
	@ApiResponse({
		status: 401,
		type: HttpException,
		description: "Token data do not match previous one",
	})
	@ApiResponse({ status: 404, type: HttpException, description: "Session not found" })
	@ApiResponse({ status: 504, type: HttpException, description: "Microservice timeout" })
	@ApiResponse({ status: 502, type: HttpException, description: "Bad gateway" })
	@Post("/refresh")
	public async generateTokenPair(@Body() dto: GenerateTokenPairDto): Promise<TokenPairDto> {
		return await this.authService.generateTokenPair(dto);
	}

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

	@ApiOperation({ summary: "create all sessions by client id" })
	@ApiResponse({
		status: 200,
		type: [Session],
		description: "Sessions",
	})
	@ApiResponse({ status: 400, type: HttpException, description: "Invalid request" })
	@ApiResponse({ status: 504, type: HttpException, description: "Microservice timeout" })
	@ApiResponse({ status: 502, type: HttpException, description: "Bad gateway" })
	@Get("/session/storage/:clientId")
	public async getSessionStorageByClientId(
		@Param("clientId") clientId: string
	): Promise<Session[]> {
		return await this.authService.getAllSessionsByClientId({ clientId });
	}

	@ApiOperation({ summary: "delete all sessions by client id" })
	@ApiResponse({
		status: 200,
		description: "Nothing",
	})
	@ApiResponse({ status: 400, type: HttpException, description: "Invalid request" })
	@ApiResponse({ status: 504, type: HttpException, description: "Microservice timeout" })
	@ApiResponse({ status: 502, type: HttpException, description: "Bad gateway" })
	@Delete("/session/storage/:clientId")
	public async deleteSessionStorageByClientId(
		@Param("clientId") clientId: string
	): Promise<Record<string, never>> {
		return await this.authService.deleteAllSessionsByClientId({ clientId });
	}
}
