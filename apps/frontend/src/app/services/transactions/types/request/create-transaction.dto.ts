/* eslint-disable sonarjs/no-duplicate-string */

import { TransactionType } from "../response/transaction.entity";

export class CreateTransactionDto {
	/** @example "recharge" */
	public type: TransactionType;

	/** Could be created with Date.toISOString()
	 * @example "2022-06-25T05:47:53.590Z"
	 */
	public date: string;

	/** Category or account id which was used to create the transaction
	 * @example "123e4567-e89b-12d3-a456-426655440000"
	 */
	public from: string;

	/** Category or account id which was used to create the transaction
	 * @example "123e4567-e89b-12d3-a456-426655440000"
	 */
	public to: string;

	/** Amount of transaction in specific currency. 18 numbers in total, 8 numbers after dot
	 * @example "11.35065001"
	 */
	public amount_from: string;

	/** Amount of transaction in specific currency. 18 numbers in total, 8 numbers after dot
	 * @example "11.35065001"
	 */
	public amount_to: string;

	/** ISO 4217 currency code. Could be any 3-4 uppercase characters
	 * @example "USD"
	 */
	public currency_from: string;

	/** ISO 4217 currency code. Could be any 3-4 uppercase characters
	 * @example "USD"
	 */
	public currency_to: string;

	/** Location where transaction was made
	 * @optional
	 * @example "My favorite local shop"
	 */
	public location: string | null;

	/** Notes about transaction\
	 * @optional
	 * @example "Company salary"
	 */
	public notes: string | null;
}
