/* eslint-disable sonarjs/no-duplicate-string */
import { ApiProperty } from "@nestjs/swagger";

export enum TransactionType {
	RECHARGE = "recharge",
	WITHDRAW = "withdraw",
	TRANSFER = "transfer",
}

export class Transaction {
	/** @example "123e4567-e89b-12d3-a456-426655440000" */
	@ApiProperty({ example: "123e4567-e89b-12d3-a456-426655440000" })
	readonly id: string;

	/** @example "123e4567-e89b-12d3-a456-426655440000" */
	@ApiProperty({ example: "123e4567-e89b-12d3-a456-426655440000" })
	readonly owner: string;

	/** @example "recharge" */
	@ApiProperty({ example: "regular", enum: TransactionType })
	readonly type: TransactionType;

	/** @example "2022-06-25T05:47:53.590Z" */
	@ApiProperty({ example: "2022-06-25T05:47:53.590Z" })
	readonly date: Date;

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

	/** Notes about transaction
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
