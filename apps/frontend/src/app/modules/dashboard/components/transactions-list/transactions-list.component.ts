import { Component, Input } from "@angular/core";

import { Account } from "src/app/services/accounts/types/response/account.entity";
import { Category } from "src/app/services/categories/types/response/category.entity";
import {
	Transaction,
	TransactionType,
} from "src/app/services/transactions/types/response/transaction.entity";

@Component({
	selector: "app-transactions-list",
	templateUrl: "./transactions-list.component.html",
	styleUrls: ["./transactions-list.component.scss"],
})
export class TransactionsListComponent {
	@Input() transactions: Array<[string, Array<Transaction>]>;
	@Input() accounts: Account[];
	@Input() categories: Category[];

	public getEntityByParams(
		id: string,
		type: TransactionType,
		destination: "from" | "to"
	) {
		const getAccountById = () =>
			this.accounts.find((account) => account.id === id) as Account;
		const getCategoryById = () =>
			this.categories.find((category) => category.id === id) as Category;

		switch (type) {
			case TransactionType.RECHARGE:
				return destination === "from" ? getCategoryById() : getAccountById();

			case TransactionType.WITHDRAW:
				return destination === "from" ? getAccountById() : getCategoryById();

			case TransactionType.TRANSFER:
				return getAccountById();
		}
	}
}
