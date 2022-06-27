import {
	IsOptional,
	IsUUID,
	IsEnum,
	IsString,
	Length,
	IsUppercase,
	IsHexadecimal,
} from "class-validator";

import { IsBalance } from "src/decorators/isBalance.decorator";
import { AccountType } from "src/entities/account.entity";

export class CreateAccountDto {
	/** @example "123e4567-e89b-12d3-a456-426655440000" */
	@IsUUID()
	readonly owner: string;

	/** @example "regular" */
	@IsEnum(AccountType)
	readonly type: AccountType;

	/** Account name
	 * @example "Personal card"
	 */
	@IsString()
	@Length(1, 255)
	readonly name: string;

	/** ISO 4217 currency code. Could be any 3-4 uppercase characters
	 * @example "USD"
	 */
	@IsUppercase()
	@Length(3, 4)
	readonly currency: string;

	/** Balance of the account. 18 numbers in total, 8 numbers after dot
	 * @default "0"
	 * @example "11.35065001"
	 */
	@IsOptional()
	@IsString()
	@IsBalance()
	readonly balance?: string;

	/** Notes about account
	 * @optional
	 * @example "My personal bank card"
	 */
	@IsOptional()
	@IsString()
	@Length(1, 255)
	readonly notes?: string;

	/** Name of icon for frontend
	 * @default "MoreHoriz"
	 */
	@IsOptional()
	@IsString()
	@Length(1, 255)
	readonly icon_name?: string;

	/** Hex icon color for frontend. 6 characters without #
	 * @default "A6A6A6"
	 */
	@IsOptional()
	@IsHexadecimal()
	@Length(6, 6)
	readonly icon_color?: string;
}
