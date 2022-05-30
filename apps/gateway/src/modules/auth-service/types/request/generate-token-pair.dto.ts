import { ApiProperty } from "@nestjs/swagger";

export class GenerateTokenPairDto {
	/** @example "b4d72d7e7ca77bc8221f81083fc24c5ec11f3dfe446bf521" */
	@ApiProperty({ example: "b4d72d7e7ca77bc8221f81083fc24c5ec11f3dfe446bf521" })
	readonly refreshToken: string;

	/** @example "57.37.103.24" */
	@ApiProperty({ example: "57.37.103.24" })
	readonly ip: string;

	/** @example "Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:99.0)"*/
	@ApiProperty({ example: "Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:99.0)" })
	readonly device: string;
}
