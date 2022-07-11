import { AccountType } from "../response/account.entity";

export class CreateAccountDto {
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
	 * @default "0"
	 * @example "11.35065001"
	 */
	readonly balance?: string;

	/** Notes about account
	 * @optional
	 * @example "My personal bank card"
	 */
	readonly notes?: string;

	/** Name of icon for frontend
	 * @default "MoreHoriz"
	 */
	readonly icon_name?: string;

	/** Hex icon color for frontend. 6 characters without #
	 * @default "A6A6A6"
	 */

	readonly icon_color?: string;
}
