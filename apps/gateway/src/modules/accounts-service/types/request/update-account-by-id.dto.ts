import { ApiProperty } from "@nestjs/swagger";

import { AccountType } from "../response/account.entity";

export class UpdateAccountProperties {
	/** @example "regular" */
	@ApiProperty({ example: "regular", enum: AccountType, nullable: true })
	readonly type?: AccountType;

	/** Account name from 1 to 50 characters
	 * @example "Personal card"
	 */
	@ApiProperty({
		example: "Personal card",
		nullable: true,
		description: "Account name from 1 to 50 characters",
	})
	readonly name?: string;

	/** ISO 4217 currency code. Could be any 3-4 uppercase characters
	 * @example "USD"
	 */
	@ApiProperty({
		example: "USD",
		nullable: true,
		description: "ISO 4217 currency code. Could be any 3-4 uppercase characters",
	})
	readonly currency?: string;

	/** Balance of the account. 18 numbers in total, 8 numbers after dot
	 * @default 0
	 * @example 11.35065001
	 */
	@ApiProperty({
		example: 11.35065001,
		nullable: true,
		description: "Balance of the account. 18 numbers in total, 8 numbers after dot",
	})
	readonly balance?: number;

	/** Notes about account from 1 to 200 characters
	 * @optional
	 * @example "My personal bank card"
	 */
	@ApiProperty({
		example: "My personal bank card",
		nullable: true,
		description: "Notes about account from 1 to 200 characters",
	})
	readonly notes?: string;

	/** Name of icon for frontend. From 1 to 50 characters
	 * @default "MoreHoriz"
	 */
	@ApiProperty({
		example: "MoreHoriz",
		nullable: true,
		description: "Name of icon for frontend. From 1 to 50 characters",
	})
	readonly icon_name?: string;

	/** Hex icon color for frontend. 6 characters without #
	 * @default "A6A6A6"
	 */
	@ApiProperty({
		example: "A6A6A6",
		nullable: true,
		description: "Hex icon color for frontend. 6 characters without #",
	})
	readonly icon_color?: string;
}

export class UpdateAccountByIdDto {
	/** @example "123e4567-e89b-12d3-a456-426655440000" */
	@ApiProperty({ example: "123e4567-e89b-12d3-a456-426655440000" })
	readonly id: string;

	@ApiProperty({ type: UpdateAccountProperties })
	readonly data: UpdateAccountProperties;
}
