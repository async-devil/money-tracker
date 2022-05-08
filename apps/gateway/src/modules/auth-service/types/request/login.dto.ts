import { ApiProperty } from "@nestjs/swagger";

export class LoginDto {
	/** @example "test@email.com" */
	@ApiProperty({ example: "test@email.com" })
	readonly email: string;

	/** @example "Password5@1" */
	@ApiProperty({ example: "Password5@1" })
	readonly password: string;

	/** @example "57.37.103.24" */
	@ApiProperty({ example: "57.37.103.24" })
	readonly ip: string;

	/** @example "Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:99.0)"*/
	@ApiProperty({ example: "Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:99.0)" })
	readonly device: string;
}
