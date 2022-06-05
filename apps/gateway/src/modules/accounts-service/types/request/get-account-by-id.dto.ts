import { ApiProperty } from "@nestjs/swagger";

export class GetAccountByIdDto {
	/** @example "123e4567-e89b-12d3-a456-426655440000" */
	@ApiProperty({ example: "123e4567-e89b-12d3-a456-426655440000" })
	readonly id: string;
}
