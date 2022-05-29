import { IsIP, IsString } from "class-validator";

import { IsRefreshToken } from "src/decorators/isRefreshToken.decorator";

export class GenerateTokenPairDto {
	/** @example "3d5b8d7035bd10bb4d32d95fdd272ceb8e6a2ddbbe79d966" */
	@IsRefreshToken()
	readonly refreshToken: string;

	/** @example "57.37.103.24" */
	@IsIP(4)
	readonly ip: string;

	/** @example "Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:99.0)"*/
	@IsString()
	readonly device: string;
}
