import { AccountType } from "../response/account.entity";

export class GetAccountsByQueryDto {
	/** @example "regular" */
	readonly type?: AccountType;

	/** ISO 4217 currency code. Could be any 3-4 uppercase characters
	 * @example "USD"
	 */
	readonly currency?: string;
}
