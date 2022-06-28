import { Type } from "class-transformer";
import { IsOptional, IsString, IsUppercase, IsUUID, Length, ValidateNested } from "class-validator";

import { IsAmount } from "src/decorators/isAmount.decorator";
import { IsISO8601UTC } from "src/decorators/isISO8601UTC.decorator";

export class UpdateProperties {
	/** @example "2022-06-25T05:47:53.590Z" */
	@IsOptional()
	@IsISO8601UTC()
	readonly date?: string;

	/** Category or account id which was used to create the transaction
	 * @example "123e4567-e89b-12d3-a456-426655440000"
	 */
	@IsOptional()
	@IsUUID()
	readonly from?: string;

	/** Category or account id which was used to create the transaction
	 * @example "123e4567-e89b-12d3-a456-426655440000"
	 */
	@IsOptional()
	@IsUUID()
	readonly to?: string;

	/** Amount of transaction in specific currency. 18 numbers in total, 8 numbers after dot
	 * @example "11.35065001"
	 */
	@IsOptional()
	@IsString()
	@IsAmount()
	readonly amount_from?: string;

	/** Amount of transaction in specific currency. 18 numbers in total, 8 numbers after dot
	 * @example "11.35065001"
	 */
	@IsOptional()
	@IsString()
	@IsAmount()
	readonly amount_to?: string;

	/** ISO 4217 currency code. Could be any 3-4 uppercase characters
	 * @example "USD"
	 */
	@IsOptional()
	@IsUppercase()
	@Length(3, 4)
	readonly currency_from?: string;

	/** ISO 4217 currency code. Could be any 3-4 uppercase characters
	 * @example "USD"
	 */
	@IsOptional()
	@IsUppercase()
	@Length(3, 4)
	readonly currency_to?: string;

	/** Location where transaction was made
	 * @optional
	 * @example "My favorite local shop"
	 */
	@IsOptional()
	@IsString()
	@Length(1, 255)
	readonly location?: string;

	/** Notes about category
	 * @optional
	 * @example "Company salary"
	 */
	@IsOptional()
	@IsString()
	@Length(1, 255)
	readonly notes?: string;
}

export class UpdateTransactionByIdDto {
	/** @example "123e4567-e89b-12d3-a456-426655440000" */
	@IsUUID()
	readonly id: string;

	@ValidateNested()
	@Type(() => UpdateProperties)
	readonly data: UpdateProperties;
}
