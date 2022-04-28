import { Inject, Injectable } from "@nestjs/common";
import { ClientProxy } from "@nestjs/microservices";

import { RequestService } from "../../common/request.service";
import { CreateSessionDto } from "./types/request/createSession.dto";
import { DeleteSessionByTokenDto } from "./types/request/deleteSessionByToken.dto";
import { DeleteSessionsByClientIdDto } from "./types/request/deleteSessionsByClientId.dto";
import { GenerateTokenPairDto } from "./types/request/generateTokenPair.dto";
import { GetSessionsByClientIdDto } from "./types/request/getSessionsByClientId.dto";
import { ValidateAccessTokenDto } from "./types/request/validateAccessToken.dto";
import { Session } from "./types/response/session.entity";
import { TokenPairDto } from "./types/response/tokenPair.dto";
import { ValidateAccessTokenResultDto } from "./types/response/validateAccessTokenResult.dto";

@Injectable()
export class AuthService {
	constructor(
		@Inject("AUTH_SERVICE") private readonly authService: ClientProxy,
		private readonly requestService: RequestService
	) {}

	public async createSession(dto: CreateSessionDto): Promise<Session> {
		return await this.requestService.sendRequest<Session>(this.authService, "create-session", dto);
	}

	public async deleteSessionByToken(dto: DeleteSessionByTokenDto): Promise<Record<string, never>> {
		return await this.requestService.sendRequest<Record<string, never>>(
			this.authService,
			"delete-session-by-token",
			dto
		);
	}

	public async getAllSessionsByClientId(dto: GetSessionsByClientIdDto): Promise<Session[]> {
		return await this.requestService.sendRequest<Session[]>(
			this.authService,
			"get-all-sessions-by-client-id",
			dto
		);
	}

	public async deleteAllSessionsByClientId(
		dto: DeleteSessionsByClientIdDto
	): Promise<Record<string, never>> {
		return await this.requestService.sendRequest<Record<string, never>>(
			this.authService,
			"delete-all-sessions-by-client-id",
			dto
		);
	}

	public async validateAccessToken(
		dto: ValidateAccessTokenDto
	): Promise<ValidateAccessTokenResultDto> {
		return await this.requestService.sendRequest<ValidateAccessTokenResultDto>(
			this.authService,
			"validate-access-token",
			dto
		);
	}

	public async generateTokenPair(dto: GenerateTokenPairDto): Promise<TokenPairDto> {
		return await this.requestService.sendRequest<TokenPairDto>(
			this.authService,
			"generate-token-pair",
			dto
		);
	}
}
