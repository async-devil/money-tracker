import { HttpException, Post, Body, Controller } from "@nestjs/common";
import { ApiOperation, ApiResponse } from "@nestjs/swagger";

import { AuthService } from "../auth-service.service";
import { GenerateTokenPairDto } from "../types/request/generateTokenPair.dto";
import { ValidateAccessTokenDto } from "../types/request/validateAccessToken.dto";
import { TokenPairDto } from "../types/response/tokenPair.dto";
import { ValidateAccessTokenResultDto } from "../types/response/validateAccessTokenResult.dto";

@Controller()
export class AuthRouteController {
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
	@Post("/validate")
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
}
