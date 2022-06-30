import { ApiProperty } from "@nestjs/swagger";

export class Client {
	/** @example "54d45c35-f390-4a73-bf20-353ffffa2c42" */
	@ApiProperty({ example: "54d45c35-f390-4a73-bf20-353ffffa2c42" })
	readonly id: string;

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

	/** @example "2022-06-27T06:34:59.882Z" */
	@ApiProperty({ example: "2022-06-27T06:34:59.882Z" })
	readonly create_date_time: Date;
}
