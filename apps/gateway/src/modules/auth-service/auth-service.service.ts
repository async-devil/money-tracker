import { Inject, Injectable } from "@nestjs/common";
import { ClientProxy } from "@nestjs/microservices";

import { RequestService } from "../../common/request.service";
import { CreateSessionDto } from "./types/request/createSession.dto";
import { DeleteSessionByIdDto } from "./types/request/deleteSessionById.dto";
import { DeleteSessionByTokenDto } from "./types/request/deleteSessionByToken.dto";
import { DeleteSessionsByClientIdDto } from "./types/request/deleteSessionsByClientId.dto";
import { GenerateTokenPairDto } from "./types/request/generateTokenPair.dto";
import { GetSessionByIdDto } from "./types/request/getSessionById.dto";
import { GetSessionByTokenDto } from "./types/request/getSessionByToken.dto";
import { GetSessionsByClientIdDto } from "./types/request/getSessionsByClientId.dto";
import { ValidateAccessTokenDto } from "./types/request/validateAccessToken.dto";
import { GetAccessTokenExpirationDateResult } from "./types/response/get-access-token-expiration-date-result.dto";
import { GetAccessTokenExpirationDateDto } from "./types/response/get-access-token-expiration-date.dto";
import { Session } from "./types/response/session.entity";
import { TokenPairDto } from "./types/response/tokenPair.dto";
import { ValidateAccessTokenResultDto } from "./types/response/validateAccessTokenResult.dto";

@Injectable()
export class AuthService {
	constructor(
		@Inject("AUTH_SERVICE") private readonly authService: ClientProxy,
		private readonly requestService: RequestService
	) {}

	public async ping(text: string): Promise<string> {
		return await this.requestService.sendRequest<string>(this.authService, "ping", { text });
	}

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
	public async createSession(dto: CreateSessionDto): Promise<Session> {
		return await this.requestService.sendRequest<Session>(this.authService, "create-session", dto);
	}

	/**
	 *	Get session by it's id, even if expired
	 *
	 * 	Throws:
	 * 	- { statusCode: 400, message: ["id must be a UUID"], error: "Bad request" }
	 * 	- { statusCode: 404, message: "Session not found", error: "Not found"}
	 * 	- { statusCode: 500, message: "Unknown error", error: "Internal server error" }
	 */
	public async getSessionById(dto: GetSessionByIdDto): Promise<Session> {
		return await this.requestService.sendRequest<Session>(
			this.authService,
			"get-session-by-id",
			dto
		);
	}

	/**
	 *	Delete session by it's id, would pass even if session is not found
	 *
	 * 	Throws:
	 * 	- { statusCode: 400, message: ["id must be a UUID"], error: "Bad request" }
	 * 	- { statusCode: 500, message: "Unknown error", error: "Internal server error" }
	 */
	public async deleteSessionById(dto: DeleteSessionByIdDto): Promise<Record<string, never>> {
		return await this.requestService.sendRequest<Record<string, never>>(
			this.authService,
			"delete-session-by-id",
			dto
		);
	}

	/**
	 *	Get session by it's token, even if expired
	 *
	 * 	Throws:
	 * 	- { statusCode: 400, message: ["refresh token must be valid"], error: "Bad request" }
	 * 	- { statusCode: 404, message: "Session not found", error: "Not found"}
	 * 	- { statusCode: 500, message: "Unknown error", error: "Internal server error" }
	 */
	public async getSessionByToken(dto: GetSessionByTokenDto): Promise<Session> {
		return this.requestService.sendRequest(this.authService, "get-session-by-token", dto);
	}

	/**
	 *	Delete session by it's token, would pass even if token is not found
	 *
	 * 	Throws:
	 * 	- { statusCode: 400, message: ["refresh token must be valid"], error: "Bad request" }
	 * 	- { statusCode: 500, message: "Unknown error", error: "Internal server error" }
	 */
	public async deleteSessionByToken(dto: DeleteSessionByTokenDto): Promise<Record<string, never>> {
		return await this.requestService.sendRequest<Record<string, never>>(
			this.authService,
			"delete-session-by-token",
			dto
		);
	}

	/**
	 *	Get all sessions by their client id, would pass even if tokens are not found
	 *
	 * 	Throws:
	 * 	- { statusCode: 400, message: ["clientId must be a UUID"], error: "Bad request" }
	 * 	- { statusCode: 500, message: "Unknown error", error: "Internal server error" }
	 */
	public async getAllSessionsByClientId(dto: GetSessionsByClientIdDto): Promise<Session[]> {
		return await this.requestService.sendRequest<Session[]>(
			this.authService,
			"get-all-sessions-by-client-id",
			dto
		);
	}

	/**
	 *	Delete all sessions by their client id, would pass even if tokens are not found
	 *
	 * 	Throws:
	 * 	- { statusCode: 400, message: ["clientId must be a UUID"], error: "Bad request" }
	 * 	- { statusCode: 500, message: "Unknown error", error: "Internal server error" }
	 */
	public async deleteAllSessionsByClientId(
		dto: DeleteSessionsByClientIdDto
	): Promise<Record<string, never>> {
		return await this.requestService.sendRequest<Record<string, never>>(
			this.authService,
			"delete-all-sessions-by-client-id",
			dto
		);
	}

	/**
	 *	Validate access token for matching signature, if valid return true
	 *
	 * 	Throws:
	 * 	- { statusCode: 400, message: ["accessToken must be a jwt string"], error: "Bad request" }
	 * 	- { statusCode: 500, message: "Unknown error", error: "Internal server error" }
	 */
	public async validateAccessToken(
		dto: ValidateAccessTokenDto
	): Promise<ValidateAccessTokenResultDto> {
		return await this.requestService.sendRequest<ValidateAccessTokenResultDto>(
			this.authService,
			"validate-access-token",
			dto
		);
	}

	/**
	 *	Generate access and refresh tokens if refresh token is valid and not expired
	 *
	 * 	Throws:
	 * 	- { statusCode: 400, message: [
	 * 		"refresh token must be valid",
	 * 		"tokenData.clientId must be a UUID",
	 * 		"tokenData.ip must be an ip address",
	 * 		"tokenData.device must be a string"],
	 * 		error: "Bad request" }
	 * 	- { statusCode: 401, message: "Refresh token expired", error: "Unauthorized" }
	 *  - { statusCode: 401, message: "Token data does not match previous one", error: "Unauthorized" }
	 * 	- { statusCode: 404, message: "Session not found", error: "Not found"}
	 * 	- { statusCode: 500, message: "Unknown error", error: "Internal server error" }
	 */
	public async generateTokenPair(dto: GenerateTokenPairDto): Promise<TokenPairDto> {
		return await this.requestService.sendRequest<TokenPairDto>(
			this.authService,
			"generate-token-pair",
			dto
		);
	}

	/**
	 *	Get access token expiration date which stored in exp header
	 *
	 * 	Throws:
	 * 	- { statusCode: 400, message: ["accessToken must be a jwt string"], error: "Bad request" }
	 *  - { statusCode: 401, message: "Invalid JWT token", error: "Unauthorized" }
	 * 	- { statusCode: 500, message: "Unknown error", error: "Internal server error" }
	 */
	public async getAccessTokenExpirationDate(dto: GetAccessTokenExpirationDateDto) {
		return await this.requestService.sendRequest<GetAccessTokenExpirationDateResult>(
			this.authService,
			"get-access-token-expiration-date",
			dto
		);
	}
}
