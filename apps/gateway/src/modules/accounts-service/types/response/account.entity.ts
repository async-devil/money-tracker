import { ApiProperty } from "@nestjs/swagger";

export enum AccountType {
	REGULAR = "regular",
	SAVINGS = "savings",
	DEBT = "debt",
}

export class Account {
	/** @example "123e4567-e89b-12d3-a456-426655440000" */
	@ApiProperty({ example: "123e4567-e89b-12d3-a456-426655440000" })
	readonly id: string;

	/** @example "123e4567-e89b-12d3-a456-426655440000" */
	@ApiProperty({ example: "123e4567-e89b-12d3-a456-426655440000" })
	readonly owner: string;

	/** @example "regular" */
	@ApiProperty({ example: "regular", enum: AccountType })
	readonly type: AccountType;

	/** Account name
	 * @example "Personal card"
	 */
	@ApiProperty({ example: "Personal card", description: "Account name" })
	readonly name: string;

	/** ISO 4217 currency code. Could be any 3-4 uppercase characters
	 * @example "USD"
	 */
	@ApiProperty({
		example: "USD",
		description: "ISO 4217 currency code. Could be any 3-4 uppercase characters",
	})
	readonly currency: string;

	/** Balance of the account. 18 numbers in total, 8 numbers after dot
	 * @default "0.00000000"
	 * @example "11.35065001"
	 */
	@ApiProperty({
		example: "11.35065001",
		default: "0.00000000",
		description: "Balance of the account. 18 numbers in total, 8 numbers after dot",
	})
	readonly balance: string;

	/** Notes about account
	 * @optional
	 * @example "My personal bank card"
	 */
	@ApiProperty({
		example: "My personal bank card",
		nullable: true,
		description: "Notes about account",
	})
	readonly notes?: string;

	/** Name of icon for frontend
	 * @default "MoreHoriz"
	 */
	@ApiProperty({
		example: "MoreHoriz",
		default: "MoreHoriz",
		description: "Name of icon for frontend",
	})
	readonly icon_name: string;

	/** Hex icon color for frontend. 6 characters without #
	 * @default "A6A6A6"
	 */
	@ApiProperty({
		example: "A6A6A6",
		default: "A6A6A6",
		description: "Hex icon color for frontend. 6 characters without #",
	})
	readonly icon_color: string;
}
