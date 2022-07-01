/* eslint-disable sonarjs/no-duplicate-string */
import { ApiProperty, OmitType } from "@nestjs/swagger";

import { TransactionType } from "../response/transaction.entity";

export class CreateTransactionDto {
	/** @example "123e4567-e89b-12d3-a456-426655440000" */
	@ApiProperty({ example: "123e4567-e89b-12d3-a456-426655440000" })
	readonly owner: string;

	/** @example "recharge" */
	@ApiProperty({ example: "recharge", enum: TransactionType })
	readonly type: TransactionType;

	/** Could be created with Date.toISOString()
	 * @example "2022-06-25T05:47:53.590Z"
	 */
	@ApiProperty({
		example: "2022-06-25T05:47:53.590Z",
		description: "Could be created with Date.toISOString()",
	})
	readonly date: string;

	/** Category or account id which was used to create the transaction
	 * @example "123e4567-e89b-12d3-a456-426655440000"
	 */
	@ApiProperty({
		example: "123e4567-e89b-12d3-a456-426655440000",
		description: "Category or account id which was used to create the transaction",
	})
	readonly from: string;

	/** Category or account id which was used to create the transaction
	 * @example "123e4567-e89b-12d3-a456-426655440000"
	 */
	@ApiProperty({
		example: "123e4567-e89b-12d3-a456-426655440000",
		description: "Category or account id which was used to create the transaction",
	})
	readonly to: string;

	/** Amount of transaction in specific currency. 18 numbers in total, 8 numbers after dot
	 * @example "11.35065001"
	 */
	@ApiProperty({
		example: "11.35065001",
		description:
			"Amount of transaction in specific currency. 18 numbers in total, 8 numbers after dot",
	})
	readonly amount_from: string;

	/** Amount of transaction in specific currency. 18 numbers in total, 8 numbers after dot
	 * @example "11.35065001"
	 */
	@ApiProperty({
		example: "11.35065001",
		description:
			"Amount of transaction in specific currency. 18 numbers in total, 8 numbers after dot",
	})
	readonly amount_to: string;

	/** ISO 4217 currency code. Could be any 3-4 uppercase characters
	 * @example "USD"
	 */
	@ApiProperty({
		example: "USD",
		description: "ISO 4217 currency code. Could be any 3-4 uppercase characters",
	})
	readonly currency_from: string;

	/** ISO 4217 currency code. Could be any 3-4 uppercase characters
	 * @example "USD"
	 */
	@ApiProperty({
		example: "USD",
		description: "ISO 4217 currency code. Could be any 3-4 uppercase characters",
	})
	readonly currency_to: string;

	/** Location where transaction was made
	 * @optional
	 * @example "My favorite local shop"
	 */
	@ApiProperty({
		example: "My favorite local shop",
		nullable: true,
		description: "Location where transaction was made",
	})
	readonly location?: string;

	/** Notes about transaction\
	 * @optional
	 * @example "Company salary"
	 */
	@ApiProperty({
		example: "Company salary",
		nullable: true,
		description: "Notes about transaction",
	})
	readonly notes?: string;
}

export class CreateTransactionControllerDto extends OmitType(CreateTransactionDto, ["owner"]) {}
