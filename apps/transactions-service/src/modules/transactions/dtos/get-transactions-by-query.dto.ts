import { Type } from "class-transformer";
import { IsUUID, IsEnum, IsOptional, Length, ValidateNested } from "class-validator";

import { IsISO8601UTC } from "src/decorators/isISO8601UTC.decorator";
import { TransactionType } from "src/entities/transaction.entity";

export class TransactionFilters {
	/** @example "123e4567-e89b-12d3-a456-426655440000" */
	@IsOptional()
	@IsUUID()
	readonly owner?: string;

	/** @example "recharge" */
	@IsOptional()
	@IsEnum(TransactionType)
	readonly type?: TransactionType;

	/** Category or account id which was used to create the transaction
	 * @example "123e4567-e89b-12d3-a456-426655440000"
	 */
	@IsOptional()
	@IsUUID()
	readonly from?: string;

	/** Category or account id which was used to create the transaction
	 * @example "123e4567-e89b-12d3-a456-426655440000"
	 */
	@IsOptional()
	@IsUUID()
	readonly to?: string;
}

export class QueryRange {
	/** @example "2022-06-25T05:47:53.590Z" */
	@IsISO8601UTC()
	readonly dateStart: string;

	/** @example "2022-06-25T05:47:53.590Z" */
	@IsISO8601UTC()
	readonly dateEnd: string;
}

export class GetTransactionsByQueryDto {
	@IsOptional()
	@Length(1, 50)
	readonly query?: string;

	@IsOptional()
	@ValidateNested()
	@Type(() => QueryRange)
	readonly range?: QueryRange;

	@IsOptional()
	@ValidateNested()
	@Type(() => TransactionFilters)
	readonly filters?: TransactionFilters;
}
