/* eslint-disable sonarjs/no-duplicate-string */

import { TransactionType } from "../response/transaction.entity";

export class TransactionFilters {
	/** @example "recharge" */
	readonly type?: TransactionType;

	/** Category or account id which was used to create the transaction
	 * @example "123e4567-e89b-12d3-a456-426655440000"
	 */
	readonly from?: string;

	/** Category or account id which was used to create the transaction
	 * @example "123e4567-e89b-12d3-a456-426655440000"
	 */
	readonly to?: string;
}

export class QueryRange {
	/** @example "2022-06-25T05:47:53.590Z" */
	readonly dateStart: string;

	/** @example "2022-06-25T05:47:53.590Z"  */
	readonly dateEnd: string;
}

export class GetTransactionsByQueryDto {
	/** Transaction's note and location search query, could be string from 1 to 50 characters
	 * @example "Cat"
	 */
	readonly query?: string;

	readonly range?: QueryRange;

	readonly filters?: TransactionFilters;
}
