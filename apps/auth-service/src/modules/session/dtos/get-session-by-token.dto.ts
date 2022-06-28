import { IsRefreshToken } from "../../../decorators/isRefreshToken.decorator";

export class GetSessionByTokenDto {
	/** Session 48 chars long refresh token
	 * @example "b4d72d7e7ca77bc8221f81083fc24c5ec11f3dfe446bf521"
	 */
	@IsRefreshToken()
	readonly refreshToken: string;
}
