import { IsUUID } from "class-validator";

export class GetCategoryByIdDto {
	/** @example "123e4567-e89b-12d3-a456-426655440000" */
	@IsUUID()
	readonly id: string;
}
