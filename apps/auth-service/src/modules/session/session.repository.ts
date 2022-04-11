import {
	BadRequestException,
	Injectable,
	InternalServerErrorException,
	NotFoundException,
} from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

import { Session } from "src/entities/session.entity";

import { DeleteSessionByTokenDto } from "./dtos/deleteSessionByToken.dto";

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

	public async delete(dto: DeleteSessionByTokenDto) {
		try {
			await this.sessionRepository.delete({ refresh_token: dto.token });
		} catch (err) {
			this.throwDefaultError();
		}

		return {};
	}
}
