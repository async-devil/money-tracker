import { IsEmail } from "class-validator";

export class GetClientByEmailDto {
	/** @example "test@mail.com" */
	@IsEmail()
	readonly email: string;
}
