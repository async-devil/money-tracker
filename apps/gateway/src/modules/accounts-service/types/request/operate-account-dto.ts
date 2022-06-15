import { ApiProperty, OmitType } from "@nestjs/swagger";

export enum TransactionType {
	RECHARGE = "recharge",
	WITHDRAW = "withdraw",
}

export class OperateAccountDto {
	/** @example "123e4567-e89b-12d3-a456-426655440000" */
	@ApiProperty({ example: "123e4567-e89b-12d3-a456-426655440000" })
	readonly accountId: string;

	/** 8 numbers in total, 8 numbers after dot
	 * @example 11.35065001
	 */
	@ApiProperty({
		example: 11.35065001,
		description: "18 numbers in total, 8 numbers after dot",
	})
	readonly ammount: number;

	@ApiProperty({ example: "withdraw", enum: TransactionType })
	readonly type: TransactionType;
}

export class OperateAccountControllerDto extends OmitType(OperateAccountDto, ["accountId"]) {}
