import { ApiProperty } from "@nestjs/swagger";

export class LoginDto {
	/** @example "test@email.com" */
	@ApiProperty({ example: "test@email.com" })
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
	@ApiProperty({
		example: "Password5@1",
		description: `Password properties: - At least one capital letter - At least one number - At least one special character like [!@#$&*.,?%^] - Minimum 6 characters`,
	})
	readonly password: string;
}
