import { Pipe, PipeTransform } from "@angular/core";

import { TransactionType } from "src/app/services/transactions/types/response/transaction.entity";

@Pipe({
	name: "setAmountColor",
})
export class SetAmountColorPipe implements PipeTransform {
	private setCssObject(
		object: Record<string, unknown>,
		color: string,
		isSecondary: boolean
	) {
		return Object.assign(object, { color: `${color}${isSecondary ? "80" : ""}` });
	}

	public transform(
		value: Record<string, unknown>,
		type: TransactionType,
		isSecondary = false
	) {
		switch (type) {
			case TransactionType.RECHARGE:
				return this.setCssObject(value, "#a5e075", isSecondary);

			case TransactionType.WITHDRAW:
				return this.setCssObject(value, "#ff616e", isSecondary);

			case TransactionType.TRANSFER:
				return this.setCssObject(value, "#abb2bf", isSecondary);
		}
	}
}
