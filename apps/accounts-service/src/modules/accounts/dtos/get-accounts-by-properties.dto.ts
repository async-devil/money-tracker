import { IsEnum, IsOptional, IsUppercase, IsUUID, Length } from "class-validator";

import { AccountType } from "src/entities/account.entity";

export class GetAccountsByPropertiesDto {
	/** @example "123e4567-e89b-12d3-a456-426655440000" */
	@IsOptional()
	@IsUUID()
	readonly owner?: string;

	/** @example "regular" */
	@IsOptional()
	@IsEnum(AccountType)
	readonly type?: AccountType;

	/** ISO 4217 currency code. Could be any 3-4 uppercase characters
	 * @example "USD"
	 */
	@IsOptional()
	@IsUppercase()
	@Length(3, 4)
	readonly currency?: string;
}
