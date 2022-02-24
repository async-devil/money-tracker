import {
	Injectable,
	InternalServerErrorException,
	NotFoundException,
	UnauthorizedException,
} from "@nestjs/common";

import { DuplicationException, InvalidCredentialsException } from "./exceptions";

@Injectable()
export class ErrorsService {
	/**
	 * @param err error which may be caused by duplication
	 * @param callback function which will be called if error is caused by duplication, by default it will throw duplication error @see throwDuplicationError()
	 */
	public checkDuplicationError(
		err: Error,
		callback: () => unknown | void = () => this.throwDuplicationError()
	) {
		if (err.message.includes("E11000")) {
			callback();
		}
	}

	public throwDefaultError(err?: Error) {
		throw new InternalServerErrorException(err.message);
	}

	public throwDuplicationError(err?: unknown) {
		throw new DuplicationException(err);
	}

	public throwNotFoundError(err?: unknown) {
		throw new NotFoundException(err);
	}

	public throwInvalidCredentialsError(err?: unknown) {
		throw new InvalidCredentialsException(err);
	}

	public throwUnauthorizedError(err?: unknown) {
		throw new UnauthorizedException(err);
	}
}
