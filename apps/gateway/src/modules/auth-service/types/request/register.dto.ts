import { ApiProperty } from "@nestjs/swagger";

export class RegisterDto {
	/** @example "test@email.com" */
	@ApiProperty({ example: "test@email.com" })
	readonly email: string;

	/** @example "Password5@1" */
	@ApiProperty({ example: "Password5@1" })
	readonly password: string;
}
