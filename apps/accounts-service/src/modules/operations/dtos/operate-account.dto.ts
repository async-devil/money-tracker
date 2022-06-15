import { IsEnum, IsNumber, IsUUID } from "class-validator";

export enum TransactionType {
	RECHARGE = "recharge",
	WITHDRAW = "withdraw",
}

export class OperateAccountDto {
	/** @example "123e4567-e89b-12d3-a456-426655440000" */
	@IsUUID()
	readonly accountId: string;

	/** 8 numbers in total, 8 numbers after dot
	 * @example 11.35065001
	 */
	@IsNumber()
	readonly ammount: number;

	@IsEnum(TransactionType)
	readonly type: TransactionType;
}
