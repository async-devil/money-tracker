import { IsIP, IsString, IsUUID } from "class-validator";

export class CreateSessionDto {
	/** @example "54d45c35-f390-4a73-bf20-353ffffa2c42" */
	@IsUUID()
	readonly clientId: string;

	/** @example "57.37.103.24" */
	@IsIP(4)
	readonly ip: string;

	/** @example "Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:99.0)"*/
	@IsString()
	readonly device: string;
}
