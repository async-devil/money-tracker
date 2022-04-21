import { Injectable, InternalServerErrorException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

import { Session } from "src/entities/session.entity";

import { DeleteSessionsByClientIdDto } from "./dtos/deleteSessionsByClientId.dto";
import { GetSessionsByClientIdDto } from "./dtos/getSessionsByClientId.dto";

@Injectable()
export class SessionStorageRepository {
	constructor(@InjectRepository(Session) private readonly sessionRepository: Repository<Session>) {}

	private throwDefaultError(message?: string) {
		throw new InternalServerErrorException(message || "Internal Server Error");
	}

	public async getSessions(dto: GetSessionsByClientIdDto) {
		let sessions: Session[] = [];

		try {
			sessions = await this.sessionRepository.find({ where: { client_id: dto.clientId } });
		} catch (err) {
			this.throwDefaultError();
		}

		return sessions;
	}

	public async deleteSessions(dto: DeleteSessionsByClientIdDto) {
		try {
			await this.sessionRepository.delete({ client_id: dto.clientId });
		} catch (err) {
			this.throwDefaultError();
		}

		return {};
	}
}
