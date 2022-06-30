/* eslint-disable sonarjs/no-duplicate-string */
import { ApiExtraModels, ApiProperty, getSchemaPath, OmitType } from "@nestjs/swagger";

import { TransactionType } from "../response/transaction.entity";

export class TransactionFilters {
	/** @example "123e4567-e89b-12d3-a456-426655440000" */
	@ApiProperty({ example: "123e4567-e89b-12d3-a456-426655440000" })
	readonly owner: string;

	/** @example "recharge" */
	@ApiProperty({ example: "regular", enum: TransactionType, nullable: true })
	readonly type?: TransactionType;

	/** Category or account id which was used to create the transaction
	 * @example "123e4567-e89b-12d3-a456-426655440000"
	 */
	@ApiProperty({
		example: "123e4567-e89b-12d3-a456-426655440000",
		nullable: true,
		description: "Category or account id which was used to create the transaction",
	})
	readonly from?: string;

	/** Category or account id which was used to create the transaction
	 * @example "123e4567-e89b-12d3-a456-426655440000"
	 */
	@ApiProperty({
		example: "123e4567-e89b-12d3-a456-426655440000",
		nullable: true,
		description: "Category or account id which was used to create the transaction",
	})
	readonly to?: string;
}

export class QueryRange {
	/** @example "2022-06-25T05:47:53.590Z" */
	@ApiProperty({ example: "2022-06-25T05:47:53.590Z" })
	readonly dateStart: string;

	/** @example "2022-06-25T05:47:53.590Z"  */
	@ApiProperty({ example: "2022-06-25T05:47:53.590Z" })
	readonly dateEnd: string;
}

export class GetTransactionsByQueryDto {
	/** Transaction's note and location search query, could be string from 1 to 50 characters
	 * @example "Cat"
	 */
	@ApiProperty({
		example: "Cat",
		nullable: true,
		description:
			"Transaction's note and location search query, could be string from 1 to 50 characters",
	})
	readonly query?: string;

	@ApiProperty({ type: QueryRange })
	readonly range?: QueryRange;

	@ApiProperty({ type: TransactionFilters })
	readonly filters?: TransactionFilters;
}

export class TransactionFiltersController extends OmitType(TransactionFilters, ["owner"]) {}

export class GetTransactionsByQueryTypeDto {
	/** Transaction's note and location search query, could be string from 1 to 50 characters
	 * @example "Cat"
	 */
	@ApiProperty({
		example: "Cat",
		nullable: true,
		description:
			"Transaction's note and location search query, could be string from 1 to 50 characters",
	})
	public query?: string;

	@ApiProperty({ type: QueryRange })
	public range?: QueryRange;

	@ApiProperty({ type: TransactionFiltersController })
	public filters?: TransactionFiltersController;
}

@ApiExtraModels(GetTransactionsByQueryTypeDto)
export class GetTransactionsByQueryControllerDto {
	@ApiProperty({
		description: "Base64url encoded json",
		example: "eyJxdWVyeSI6ICJTaG9wIn0",
		oneOf: [{ type: "string" }, { $ref: getSchemaPath(GetTransactionsByQueryTypeDto) }],
	})
	readonly query: string;
}
