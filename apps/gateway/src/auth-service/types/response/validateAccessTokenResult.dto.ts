import { ApiProperty } from "@nestjs/swagger";

export class ValidateAccessTokenResultDto {
	@ApiProperty({ example: true })
	readonly result: boolean;
}
