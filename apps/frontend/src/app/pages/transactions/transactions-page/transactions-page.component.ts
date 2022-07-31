import { Component, OnInit } from "@angular/core";
import { map, Observable, switchMap } from "rxjs";

import { AccountsService } from "src/app/services/accounts/accounts.service";
import { Account } from "src/app/services/accounts/types/response/account.entity";
import { CategoriesService } from "src/app/services/categories/categories.service";
import { Category } from "src/app/services/categories/types/response/category.entity";
import { TransactionsService } from "src/app/services/transactions/transactions.service";
import {
	Transaction,
	TransactionType,
} from "src/app/services/transactions/types/response/transaction.entity";

@Component({
	selector: "app-transactions-page",
	templateUrl: "./transactions-page.component.html",
	styleUrls: ["./transactions-page.component.scss"],
})
export class TransactionsPageComponent implements OnInit {
	constructor(
		private readonly transactionsService: TransactionsService,
		private readonly accountsService: AccountsService,
		private readonly categoriesService: CategoriesService
	) {}

	public readonly transactions = this.transactionsService.transactions;

	public ngOnInit() {
		this.transactionsService.setAll();
	}

	public onTransactionClick(transaction: Transaction) {
		console.log(transaction);
	}

	/** Get account or category by id, transaction type and destination*/
	public getEntityByParams(
		id: string,
		type: TransactionType,
		destination: "to" | "from"
	): Observable<Account | Category> {
		const getters = [
			(id: string) => this.categoriesService.getById({ id }),
			(id: string) => this.accountsService.getById({ id }),
		];

		return (() => {
			switch (type) {
				case TransactionType.RECHARGE:
					return destination === "from" ? getters[0](id) : getters[1](id);

				case TransactionType.WITHDRAW:
					return destination === "from" ? getters[1](id) : getters[0](id);

				case TransactionType.TRANSFER:
					return getters[1](id);
			}
		})();
	}
}
