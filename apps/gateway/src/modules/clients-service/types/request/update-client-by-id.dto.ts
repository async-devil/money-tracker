import { ApiProperty } from "@nestjs/swagger";

export class ClientData {
	/** @example "test@email.com" */
	@ApiProperty({ example: "test@email.com" })
	readonly email?: string;

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
	readonly password?: string;
}

export class UpdateClientByIdDto {
	/** @example "54d45c35-f390-4a73-bf20-353ffffa2c42" */
	@ApiProperty({ example: "54d45c35-f390-4a73-bf20-353ffffa2c42" })
	readonly id: string;

	@ApiProperty({ type: ClientData })
	readonly data: ClientData;
}
