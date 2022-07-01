import { ApiProperty, OmitType, PartialType } from "@nestjs/swagger";

import { CreateTransactionDto } from "./create-transaction.dto";

export class UpdateTransactionProperties extends PartialType(
	OmitType(CreateTransactionDto, ["owner", "type"])
) {}

export class UpdateTransactionByIdDto {
	/** @example "123e4567-e89b-12d3-a456-426655440000" */
	@ApiProperty({ example: "123e4567-e89b-12d3-a456-426655440000" })
	readonly id: string;

	@ApiProperty({ type: UpdateTransactionProperties })
	readonly data: UpdateTransactionProperties;
}
