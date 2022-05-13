import { Injectable } from "@nestjs/common";

import { Session } from "src/entities/session.entity";
import { RefreshTokenService } from "src/services/refreshToken.service";

import { CreateSessionDto } from "./dtos/createSession.dto";
import { DeleteSessionByTokenDto } from "./dtos/deleteSessionByToken.dto";
import { DeleteSessionsByClientIdDto } from "./dtos/deleteSessionsByClientId.dto";
import { GetSessionByTokenDto } from "./dtos/getSessionByToken.dto";
import { GetSessionsByClientIdDto } from "./dtos/getSessionsByClientId.dto";
import { SessionRepository } from "./session.repository";

@Injectable()
export class SessionService {
	constructor(
		private readonly sessionRepository: SessionRepository,
		private readonly refreshTokenService: RefreshTokenService
	) {}

	private async create(dto: CreateSessionDto): Promise<Session> {
		const session = new Session();

		const token = await this.refreshTokenService.getToken();
		const validUntil = this.refreshTokenService.getExpirationDate();

		Object.assign(session, {
			refresh_token: token,
			client_id: dto.clientId,
			valid_until: validUntil,
			ip: dto.ip,
			device: dto.device,
		});

		return await this.sessionRepository.save(session);
	}

	public async createSession(dto: CreateSessionDto): Promise<Session> {
		return await this.create(dto);
	}

	public async getSessionByToken(dto: GetSessionByTokenDto): Promise<Session> {
		return await this.sessionRepository.getOneByCredential({
			name: "refresh_token",
			value: dto.refreshToken,
		});
	}

	public async deleteSessionByToken(dto: DeleteSessionByTokenDto) {
		return await this.sessionRepository.delete(dto);
	}

	public async getAllSessionsByClientId(dto: GetSessionsByClientIdDto) {
		return await this.sessionRepository.getAll(dto);
	}

	public async deleteAllSessionsByClientId(dto: DeleteSessionsByClientIdDto) {
		return await this.sessionRepository.deleteAll(dto);
	}

	public checkIfTokenIsNotExpired(session: Session): boolean {
		return session.valid_until.getTime() > Date.now();
	}
}
