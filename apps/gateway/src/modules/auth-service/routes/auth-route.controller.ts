/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable sonarjs/no-duplicate-string */
import { Post, Body, Controller, Res, Req, UnauthorizedException } from "@nestjs/common";
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags, OmitType } from "@nestjs/swagger";
import { Response, Request, CookieOptions } from "express";

import { HttpException } from "src/common/HttpException";
import { ClientsService } from "src/modules/clients-service/clients-service.service";

import { AuthService } from "../auth-service.service";
import { LoginDto } from "../types/request/login.dto";
import { RegisterDto } from "../types/request/register.dto";
import { RefreshTokenPairDto } from "../types/response/refresh-token-pair.dto";
import { TokenPairDto } from "../types/response/token-pair.dto";

export const COOKIE_OPTIONS = (dueTo: string): CookieOptions => {
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

	private getRefreshToken(request: Request) {
		const cookies = request.cookies as Record<string, string>;
		const refreshToken = cookies["refresh_token"];

		if (!refreshToken) throw new UnauthorizedException("No refresh token provided");

		return refreshToken;
	}

	private getUserAgent(request: Request) {
		return request.get("user-agent") || "Unknown device";
	}

	private getIP(request: Request) {
		return request.ip.split(":").slice(-1)[0]; //? In case of ::ffff:*.*.*.*
	}

	@ApiOperation({ summary: "Register client" })
	@ApiResponse({
		status: 201,
		type: OmitType(TokenPairDto, ["accessToken"]),
		description: "Refresh token which would be stored in cookies",
	})
	@ApiResponse({ status: 400, type: HttpException, description: "Invalid request" })
	@ApiResponse({ status: 400, type: HttpException, description: "Duplicate client" })
	@ApiResponse({ status: 401, type: HttpException, description: "Session expired" })
	@ApiResponse({ status: 504, type: HttpException, description: "Microservice timeout" })
	@ApiResponse({ status: 502, type: HttpException, description: "Bad gateway" })
	@Post("/register")
	public async register(
		@Req() request: Request,
		@Res({ passthrough: true }) response: Response,
		@Body() dto: RegisterDto
	) {
		const client = await this.clientsService.create({
			email: dto.email,
			password: dto.password,
		});

		const session = await this.authService.createSession({
			clientId: client.id,
			ip: this.getIP(request),
			device: this.getUserAgent(request),
		});

		response.cookie("refresh_token", session.refresh_token, COOKIE_OPTIONS(session.valid_until));
	}

	@ApiOperation({ summary: "Login client" })
	@ApiResponse({
		status: 201,
		type: OmitType(TokenPairDto, ["accessToken"]),
		description: "Refresh token which would be stored in cookies",
	})
	@ApiResponse({ status: 400, type: HttpException, description: "Invalid request" })
	@ApiResponse({ status: 401, type: HttpException, description: "Invalid client credentials" })
	@ApiResponse({ status: 404, type: HttpException, description: "Client not found" })
	@ApiResponse({ status: 504, type: HttpException, description: "Microservice timeout" })
	@ApiResponse({ status: 502, type: HttpException, description: "Bad gateway" })
	@Post("/login")
	public async login(
		@Req() request: Request,
		@Res({ passthrough: true }) response: Response,
		@Body() dto: LoginDto
	) {
		await this.clientsService.validateCredentials({
			email: dto.email,
			password: dto.password,
		});

		const client = await this.clientsService.getByEmail(dto.email);

		const session = await this.authService.createSession({
			clientId: client.id,
			ip: this.getIP(request),
			device: this.getUserAgent(request),
		});

		response.cookie("refresh_token", session.refresh_token, COOKIE_OPTIONS(session.valid_until));
	}

	@ApiOperation({ summary: "Generate token pair" })
	@ApiResponse({
		status: 201,
		type: RefreshTokenPairDto,
		description: "Refresh token which would be stored in cookies and access token in response",
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
		@Res({ passthrough: true }) response: Response
	) {
		const tokenPair = await this.authService.generateTokenPair({
			refreshToken: this.getRefreshToken(request),
			ip: this.getIP(request),
			device: this.getUserAgent(request),
		});

		const session = await this.authService.getSessionByToken({
			refreshToken: tokenPair.refreshToken,
		});

		const accessTokenExpirationDate = await this.authService.getAccessTokenExpirationDate({
			accessToken: tokenPair.accessToken,
		});

		response.cookie("refresh_token", session.refresh_token, COOKIE_OPTIONS(session.valid_until));
		response.send({ accessToken: tokenPair.accessToken, dueTo: accessTokenExpirationDate.result });
	}

	@ApiOperation({ summary: "Logout client" })
	@ApiResponse({
		status: 201,
		description: "Refresh and access token would be deleted from cookies",
	})
	@ApiResponse({ status: 400, type: HttpException, description: "Invalid request" })
	@ApiResponse({ status: 504, type: HttpException, description: "Microservice timeout" })
	@ApiResponse({ status: 502, type: HttpException, description: "Bad gateway" })
	@Post("/logout")
	public async logout(@Req() request: Request, @Res({ passthrough: true }) response: Response) {
		await this.authService.deleteSessionByToken({ refreshToken: this.getRefreshToken(request) });

		response.cookie("refresh_token", undefined, { httpOnly: true });
	}
}
