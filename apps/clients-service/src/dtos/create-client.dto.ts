import { IsEmail, IsString, Length } from "class-validator";

import { IsPassword } from "../decorators/isPassword.decorator";

export class CreateClientDto {
	/** @example "test@email.com" */
	@IsString()
	@IsEmail()
	readonly email: string;

	/** @example "Password5@1" */
	@IsString()
	@Length(6, 20)
	@IsPassword()
	readonly password: string;
}
