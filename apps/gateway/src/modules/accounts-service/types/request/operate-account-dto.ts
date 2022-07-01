import { ApiProperty, OmitType } from "@nestjs/swagger";

import { TransactionType } from "src/modules/transactions-service/types/response/transaction.entity";

export type TransactionOperationType = Exclude<TransactionType, TransactionType.TRANSFER>;

enum TransactionOperationEnum {
	RECHARGE = "recharge",
	WITHDRAW = "withdraw",
}

export class OperateAccountDto {
	/** @example "123e4567-e89b-12d3-a456-426655440000" */
	@ApiProperty({ example: "123e4567-e89b-12d3-a456-426655440000" })
	readonly accountId: string;

	/** 8 numbers in total, 8 numbers after dot
	 * @example "11.35065001"
	 */
	@ApiProperty({
		example: "11.35065001",
		description: "18 numbers in total, 8 numbers after dot",
	})
	readonly amount: string;

	@ApiProperty({ example: "withdraw", type: TransactionOperationEnum })
	readonly type: TransactionOperationType;
}

export class OperateAccountControllerDto extends OmitType(OperateAccountDto, ["accountId"]) {}
