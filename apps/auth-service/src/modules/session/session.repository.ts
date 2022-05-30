import {
	BadRequestException,
	Injectable,
	InternalServerErrorException,
	NotFoundException,
} from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

import { Session } from "src/entities/session.entity";

import { DeleteSessionsByClientIdDto } from "./dtos/delete-sessions-by-client-id.dto";
import { GetSessionsByClientIdDto } from "./dtos/get-sessions-by-client-id.dto";

@Injectable()
export class SessionRepository {
	constructor(@InjectRepository(Session) private readonly sessionRepository: Repository<Session>) {}

	private throwDefaultError(message?: string) {
		throw new InternalServerErrorException(message || "Internal Server Error");
	}

	public async getOneByCredential(credential: { name: string; value: unknown }): Promise<Session> {
		let session: Session;

		try {
			session = await this.sessionRepository.findOne({
				where: { [`${credential.name}`]: credential.value },
			});
		} catch (err) {
			this.throwDefaultError();
		}

		if (!session) throw new NotFoundException("Session not found");
		return session;
	}

	public async save(session: Session): Promise<Session> {
		try {
			return await this.sessionRepository.save(session);
		} catch (err) {
			const error = err as Error;

			if (error.message.includes("duplicate key value violates unique constraint")) {
				throw new BadRequestException("Duplicate session");
			}

			this.throwDefaultError();
		}
	}

	public async deleteOneByCredential(credential: { name: string; value: unknown }) {
		try {
			await this.sessionRepository.delete({
				[`${credential.name}`]: credential.value,
			});
		} catch (err) {
			this.throwDefaultError();
		}

		return {};
	}

	public async getAll(dto: GetSessionsByClientIdDto) {
		let sessions: Session[] = [];

		try {
			sessions = await this.sessionRepository.find({ where: { client_id: dto.clientId } });
		} catch (err) {
			this.throwDefaultError();
		}

		return sessions;
	}

	public async deleteAll(dto: DeleteSessionsByClientIdDto) {
		try {
			await this.sessionRepository.delete({ client_id: dto.clientId });
		} catch (err) {
			this.throwDefaultError();
		}

		return {};
	}
}
