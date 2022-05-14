import { IsUUID } from "class-validator";

export class DeleteSessionByIdDto {
	/** @example "54d45c35-f390-4a73-bf20-353ffffa2c42" */
	@IsUUID()
	readonly id: string;
}
