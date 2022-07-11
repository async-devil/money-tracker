export enum AccountType {
	REGULAR = "regular",
	SAVINGS = "savings",
	DEBT = "debt",
}

export class Account {
	/** @example "123e4567-e89b-12d3-a456-426655440000" */
	readonly id: string;

	/** @example "123e4567-e89b-12d3-a456-426655440000" */
	readonly owner: string;

	/** @example "regular" */
	readonly type: AccountType;

	/** Account name
	 * @example "Personal card"
	 */
	readonly name: string;

	/** ISO 4217 currency code. Could be any 3-4 uppercase characters
	 * @example "USD"
	 */
	readonly currency: string;

	/** Balance of the account. 18 numbers in total, 8 numbers after dot
	 * @default "0.00000000"
	 * @example "11.35065001"
	 */
	readonly balance: string;

	/** Notes about account
	 * @optional
	 * @example "My personal bank card"
	 */
	readonly notes?: string;

	/** Name of icon for frontend
	 * @default "MoreHoriz"
	 */
	readonly icon_name: string;

	/** Hex icon color for frontend. 6 characters without #
	 * @default "A6A6A6"
	 */
	readonly icon_color: string;
}
