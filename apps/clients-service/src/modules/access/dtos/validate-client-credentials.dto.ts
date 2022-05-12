import { IsString, IsEmail, Length } from "class-validator";

import { IsPassword } from "src/decorators/isPassword.decorator";

export class ValidateClientCredentialsDto {
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
