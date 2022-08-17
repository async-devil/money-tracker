export class UpdateTransactionProperties {
	/** Could be created with Date.toISOString()
	 * @example "2022-06-25T05:47:53.590Z"
	 */
	readonly date?: string;

	/** Category or account id which was used to create the transaction
	 * @example "123e4567-e89b-12d3-a456-426655440000"
	 */
	readonly from?: string;

	/** Category or account id which was used to create the transaction
	 * @example "123e4567-e89b-12d3-a456-426655440000"
	 */
	readonly to?: string;

	/** Amount of transaction in specific currency. 18 numbers in total, 8 numbers after dot
	 * @example "11.35065001"
	 */
	readonly amount_from?: string;

	/** Amount of transaction in specific currency. 18 numbers in total, 8 numbers after dot
	 * @example "11.35065001"
	 */
	readonly amount_to?: string;

	/** ISO 4217 currency code. Could be any 3-4 uppercase characters
	 * @example "USD"
	 */
	readonly currency_from?: string;

	/** ISO 4217 currency code. Could be any 3-4 uppercase characters
	 * @example "USD"
	 */
	readonly currency_to?: string;

	/** Location where transaction was made
	 * @optional
	 * @example "My favorite local shop"
	 */
	readonly location?: string;

	/** Notes about transaction\
	 * @optional
	 * @example "Company salary"
	 */
	readonly notes?: string;
}

export class UpdateTransactionByIdDto {
	/** @example "123e4567-e89b-12d3-a456-426655440000" */
	readonly id: string;

	readonly data: UpdateTransactionProperties;
}
