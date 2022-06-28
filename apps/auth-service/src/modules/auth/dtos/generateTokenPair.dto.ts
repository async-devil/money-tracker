import { IsIP, IsString } from "class-validator";

import { IsRefreshToken } from "src/decorators/isRefreshToken.decorator";

export class GenerateTokenPairDto {
	/** Session 48 chars long refresh token
	 * @example "b4d72d7e7ca77bc8221f81083fc24c5ec11f3dfe446bf521"
	 */
	@IsRefreshToken()
	readonly refreshToken: string;

	/** @example "57.37.103.24" */
	@IsIP(4)
	readonly ip: string;

	/** @example "Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:99.0)"*/
	@IsString()
	readonly device: string;
}
