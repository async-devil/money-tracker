import { IsEmail, IsString, Length } from "class-validator";

import { IsPassword } from "src/decorators/isPassword.decorator";

export class CreateClientDto {
	/** @example "test@email.com" */
	@IsString()
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
