import { IsUUID } from "class-validator";

export class DeleteSessionsByClientIdDto {
	/** @example "54d45c35-f390-4a73-bf20-353ffffa2c42" */
	@IsUUID()
	readonly clientId: string;
}
