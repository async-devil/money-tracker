import { Type } from "class-transformer";
import { ValidateNested } from "class-validator";

import { IsRefreshToken } from "src/decorators/isRefreshToken.decorator";
import { CreateSessionDto } from "src/modules/session/dtos/createSession.dto";

export class GenerateTokenPairDto {
	/** Information which will be used to generate new token*/
	@ValidateNested()
	@Type(() => CreateSessionDto)
	readonly tokenData: CreateSessionDto;

	/** @example "3d5b8d7035bd10bb4d32d95fdd272ceb8e6a2ddbbe79d966" */
	@IsRefreshToken()
	readonly refreshToken: string;
}
