import { IsString, IsEmail, Length } from "class-validator";

import { IsPassword } from "src/decorators/isPassword.decorator";

export class ValidateClientCredentialsDto {
	/** @example "test@email.com" */
	@IsString()
	@Length(1, 255)
	@IsEmail()
	readonly email: string;

	/**
	 * Password properties:
	 * - At least one capital letter
	 * - At least one number
	 * - At least one special character like [!@#$&*.,?%^]
	 * - Minimum 6 characters
	 *
	 * @example "Password5@1"
	 */
	@IsString()
	@Length(6, 255)
	@IsPassword()
	readonly password: string;
}
