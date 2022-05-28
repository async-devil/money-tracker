import { Injectable, NotFoundException, UnauthorizedException } from "@nestjs/common";

import { AccessTokenService } from "src/services/accessToken.service";

import { SessionService } from "../session/session.service";
import { GenerateTokenPairDto } from "./dtos/generateTokenPair.dto";
import { GetAccessTokenExpirationDateDto } from "./dtos/get-access-token-expiration-date.dto";
import { ValidateAccessTokenDto } from "./dtos/validateAccessToken.dto";

@Injectable()
export class AuthService {
	constructor(
		private readonly sessionService: SessionService,
		private readonly accessTokenService: AccessTokenService
	) {}

	public async generateTokenPair(
		dto: GenerateTokenPairDto
	): Promise<{ accessToken: string; refreshToken: string }> {
		//? throws if not found
		const currentSession = await this.sessionService.getSessionByToken({
			refreshToken: dto.refreshToken,
		});
		const tokenValidity = this.sessionService.checkIfTokenIsNotExpired(currentSession);

		await this.sessionService.deleteSessionByToken({ refreshToken: dto.refreshToken });

		if (currentSession.client_id !== dto.tokenData.clientId) {
			throw new UnauthorizedException("Token data does not match previous one");
		}

		if (!tokenValidity) {
			throw new UnauthorizedException("Refresh token expired");
		}

		const accessToken = await this.accessTokenService.signJwt({ clientId: dto.tokenData.clientId });
		const session = await this.sessionService.createSession(dto.tokenData);

		return { accessToken, refreshToken: session.refresh_token };
	}

	public async validateAccessToken(dto: ValidateAccessTokenDto) {
		const result = await this.accessTokenService.isValidJwt(dto.accessToken);

		return { result };
	}

	public async getAccessTokenExpirationDate(dto: GetAccessTokenExpirationDateDto) {
		const tokenData = await this.accessTokenService.getJwtData(dto.accessToken);

		//? JWT exp header gives expiration date in seconds
		const date = new Date(tokenData.payload.exp * 1000);

		return { result: date };
	}
}
