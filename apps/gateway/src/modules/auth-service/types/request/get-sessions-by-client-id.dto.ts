import { ApiProperty } from "@nestjs/swagger";

export class GetSessionsByClientIdDto {
	/** @example "54d45c35-f390-4a73-bf20-353ffffa2c42" */
	@ApiProperty({ example: "54d45c35-f390-4a73-bf20-353ffffa2c42" })
	readonly clientId: string;
}
