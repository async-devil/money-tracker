import { ApiProperty } from "@nestjs/swagger";

export class DeleteAllTransactionsByAccountId {
	/** @example "123e4567-e89b-12d3-a456-426655440000" */
	@ApiProperty({ example: "123e4567-e89b-12d3-a456-426655440000" })
	readonly accountId: string;
}
