import { ApiProperty } from "@nestjs/swagger";

import { CreateSessionDto } from "./createSession.dto";

export class GenerateTokenPairDto {
	@ApiProperty({ type: CreateSessionDto })
	readonly tokenData: CreateSessionDto;

	/** @example "b4d72d7e7ca77bc8221f81083fc24c5ec11f3dfe446bf521" */
	@ApiProperty({ example: "b4d72d7e7ca77bc8221f81083fc24c5ec11f3dfe446bf521" })
	readonly refreshToken: string;
}
