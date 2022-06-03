import {
	IsOptional,
	IsUUID,
	IsEnum,
	IsString,
	Length,
	IsUppercase,
	IsNumber,
	IsHexadecimal,
} from "class-validator";

import { AccountType } from "src/entities/account.entity";

export class CreateAccountDto {
	/** @example "123e4567-e89b-12d3-a456-426655440000" */
	@IsUUID()
	readonly owner: string;

	/** @example "regular" */
	@IsEnum(AccountType)
	readonly type: AccountType;

	/** Account name from 1 to 50 characters
	 * @example "Personal card"
	 */
	@IsString()
	@Length(1, 50)
	readonly name: string;

	/** ISO 4217 currency code. Could be any 3 uppercase characters
	 * @example "USD"
	 */
	@IsUppercase()
	@Length(3, 3)
	readonly currency: string;

	/** Balance of the account. 18 numbers in total, 8 numbers after dot
	 * @default 0
	 * @example 11.35065001
	 */
	@IsOptional()
	@IsNumber()
	readonly balance?: number;

	/** Notes about account from 1 to 200 characters
	 * @optional
	 * @example "My personal bank card"
	 */
	@IsOptional()
	@IsString()
	@Length(1, 200)
	readonly notes?: string;

	/** Name of icon for frontend. From 1 to 50 characters
	 * @default "MoreHoriz"
	 */
	@IsOptional()
	@IsString()
	@Length(1, 50)
	readonly icon_name?: string;

	/** Hex icon color for frontend. 6 characters without #
	 * @default "A6A6A6"
	 */
	@IsOptional()
	@IsHexadecimal()
	@Length(6, 6)
	readonly icon_color?: string;
}
