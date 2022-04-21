import { Injectable } from "@nestjs/common";

import { Session } from "src/entities/session.entity";

import { DeleteSessionsByClientIdDto } from "./dtos/deleteSessionsByClientId.dto";
import { GetSessionsByClientIdDto } from "./dtos/getSessionsByClientId.dto";
import { SessionStorageRepository } from "./sessionStorage.repository";

@Injectable()
export class SessionStorageService {
	constructor(private readonly sessionStorageRepository: SessionStorageRepository) {}

	public async getAllSessionsByClientId(dto: GetSessionsByClientIdDto): Promise<Session[]> {
		return await this.sessionStorageRepository.getSessions(dto);
	}

	public async deleteAllSessionsByClientId(dto: DeleteSessionsByClientIdDto) {
		return await this.sessionStorageRepository.deleteSessions(dto);
	}
}
