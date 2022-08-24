import { AccountType } from "../response/account.entity";

export class UpdateAccountProperties {
	/** @example "regular" */
	readonly type?: AccountType;

	/** Account name from 1 to 50 characters
	 * @example "Personal card"
	 */
	readonly name?: string;

	/** ISO 4217 currency code. Could be any 3-4 uppercase characters
	 * @example "USD"
	 */
	readonly currency?: string;

	/** Balance of the account. 18 numbers in total, 8 numbers after dot
	 * @default "0"
	 * @example "11.35065001"
	 */
	readonly balance?: string;

	/** Notes about account from 1 to 200 characters
	 * @optional
	 * @example "My personal bank card"
	 */
	readonly notes?: string;

	/** Name of icon for frontend. From 1 to 50 characters
	 * @default "MoreHoriz"
	 */
	readonly icon_name?: string;

	/** Hex icon color for frontend. 6 characters without #
	 * @default "A6A6A6"
	 */
	readonly icon_color?: string;
}

export class UpdateAccountByIdDto {
	/** @example "123e4567-e89b-12d3-a456-426655440000" */
	readonly id: string;

	readonly data: UpdateAccountProperties;
}
