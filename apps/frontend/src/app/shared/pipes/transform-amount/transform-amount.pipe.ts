import { Pipe, PipeTransform } from "@angular/core";

import { TransactionType } from "src/app/services/transactions/types/response/transaction.entity";

@Pipe({
	name: "transformAmount",
})
export class TransformAmountPipe implements PipeTransform {
	private addCharToStringBeginning(string: string | null, char: string) {
		return char + (string || "");
	}

	public transform(value: string | null, type: TransactionType): string {
		switch (type) {
			case TransactionType.RECHARGE:
				return this.addCharToStringBeginning(value, "+");

			case TransactionType.WITHDRAW:
				return this.addCharToStringBeginning(value, "-");

			case TransactionType.TRANSFER:
				return this.addCharToStringBeginning(value, "");
		}
	}
}
