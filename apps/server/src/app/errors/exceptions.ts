import { ConflictException, UnauthorizedException } from "@nestjs/common";

export class DuplicationException extends ConflictException {
	constructor(err?: unknown) {
		super(err || "Duplicate error");
	}
}

export class InvalidCredentialsException extends UnauthorizedException {
	constructor(err?: unknown) {
		super(err || "Invalid credentials");
	}
}
