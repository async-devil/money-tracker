import { IsJWT } from "class-validator";

export class GetSessionByTokenDto {
	/** @example "b4d72d7e7ca77bc8221f81083fc24c5ec11f3dfe446bf521" */
	@IsJWT()
	readonly token: string;
}
