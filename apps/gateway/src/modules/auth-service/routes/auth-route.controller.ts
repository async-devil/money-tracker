/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable sonarjs/no-duplicate-string */
import { Post, Body, Controller, Res, Req, UnauthorizedException } from "@nestjs/common";
import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { Response, Request, CookieOptions } from "express";

import { HttpException } from "src/common/HttpException";
import { ClientsService } from "src/modules/clients-service/clients-service.service";

import { AuthService } from "../auth-service.service";
import { LoginDto } from "../types/request/login.dto";
import { RefreshTokenPairDto } from "../types/request/refresh-token-pair.dto";
import { RegisterDto } from "../types/request/register.dto";

export const COOKIE_OPTIONS = (dueTo: Date): CookieOptions => {
	return {
		httpOnly: true,
		expires: new Date(dueTo),
	};
};

@ApiTags("Auth service")
@Controller()
export class AuthRouteController {
	constructor(
		private readonly authService: AuthService,
		private readonly clientsService: ClientsService
	) {}

	@ApiOperation({ summary: "generate token pair" })
	@ApiResponse({
		status: 201,
		description: "Refresh and access tokens which would be stored in cookies",
	})
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
	public async refreshTokenPair(
		@Req() request: Request,
		@Res({ passthrough: true }) response: Response,
		@Body() dto: RefreshTokenPairDto
	) {
		const cookies = request.cookies as Record<string, string>;
		const refreshToken = cookies["refresh_token"];

		if (!refreshToken) throw new UnauthorizedException("No refresh token provided");

		const tokenPair = await this.authService.generateTokenPair({
			refreshToken,
			ip: dto.ip,
			device: dto.device,
		});

		const session = await this.authService.getSessionByToken({
			refreshToken: tokenPair.refreshToken,
		});

		const accessTokenExpirationDate = await this.authService.getAccessTokenExpirationDate({
			accessToken: tokenPair.accessToken,
		});

		response.cookie("refresh_token", session.refresh_token, COOKIE_OPTIONS(session.valid_until));
		response.cookie(
			"access_token",
			tokenPair.accessToken,
			COOKIE_OPTIONS(accessTokenExpirationDate.result)
		);
	}

	@ApiOperation({ summary: "register client" })
	@ApiResponse({ status: 201, description: "Refresh token which would be stored in cookies" })
	@ApiResponse({ status: 400, type: HttpException, description: "Invalid request" })
	@ApiResponse({ status: 400, type: HttpException, description: "Duplicate client" })
	@ApiResponse({ status: 401, type: HttpException, description: "Session expired" })
	@ApiResponse({ status: 504, type: HttpException, description: "Microservice timeout" })
	@ApiResponse({ status: 502, type: HttpException, description: "Bad gateway" })
	@Post("/register")
	public async register(@Res({ passthrough: true }) response: Response, @Body() dto: RegisterDto) {
		const client = await this.clientsService.createClient({
			email: dto.email,
			password: dto.password,
		});

		const session = await this.authService.createSession({
			clientId: client.id,
			ip: dto.ip,
			device: dto.device,
		});

		response.cookie("refresh_token", session.refresh_token, COOKIE_OPTIONS(session.valid_until));
	}

	@ApiOperation({ summary: "client login" })
	@ApiResponse({ status: 201, description: "Refresh token which would be stored in cookies" })
	@ApiResponse({ status: 400, type: HttpException, description: "Invalid request" })
	@ApiResponse({ status: 401, type: HttpException, description: "Invalid client credentials" })
	@ApiResponse({ status: 404, type: HttpException, description: "Client not found" })
	@ApiResponse({ status: 504, type: HttpException, description: "Microservice timeout" })
	@ApiResponse({ status: 502, type: HttpException, description: "Bad gateway" })
	@Post("/login")
	public async login(@Res({ passthrough: true }) response: Response, @Body() dto: LoginDto) {
		await this.clientsService.validateClientCredentials({
			email: dto.email,
			password: dto.password,
		});

		const client = await this.clientsService.getClientByEmail(dto.email);

		const session = await this.authService.createSession({
			clientId: client.id,
			ip: dto.ip,
			device: dto.device,
		});

		response.cookie("refresh_token", session.refresh_token, COOKIE_OPTIONS(session.valid_until));
	}

	@ApiOperation({ summary: "client logout" })
	@ApiResponse({
		status: 201,
		description: "Refresh and access token would be deleted from cookies",
	})
	@ApiResponse({ status: 400, type: HttpException, description: "Invalid request" })
	@ApiResponse({ status: 504, type: HttpException, description: "Microservice timeout" })
	@ApiResponse({ status: 502, type: HttpException, description: "Bad gateway" })
	@Post("/logout")
	public async logout(@Req() request: Request, @Res({ passthrough: true }) response: Response) {
		const cookies = request.cookies as Record<string, string>;
		const refreshToken = cookies["refresh_token"];

		if (!refreshToken) throw new UnauthorizedException("No refresh token provided");

		await this.authService.deleteSessionByToken({ refreshToken });

		response.cookie("refresh_token", undefined, { httpOnly: true });
		response.cookie("access_token", undefined, { httpOnly: true });
	}
}
