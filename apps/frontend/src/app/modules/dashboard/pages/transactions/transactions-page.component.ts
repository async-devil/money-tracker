import { DatePipe } from "@angular/common";
import { Component, OnInit } from "@angular/core";

import { AccountsService } from "src/app/services/accounts/accounts.service";
import { Account } from "src/app/services/accounts/types/response/account.entity";
import { CategoriesService } from "src/app/services/categories/categories.service";
import { Category } from "src/app/services/categories/types/response/category.entity";
import { TransactionsService } from "src/app/services/transactions/transactions.service";
import { Transaction } from "src/app/services/transactions/types/response/transaction.entity";
import { UtilityService } from "src/app/services/utility/utility.service";

@Component({
	selector: "app-transactions-page",
	templateUrl: "./transactions-page.component.html",
	styleUrls: ["./transactions-page.component.scss"],
	providers: [DatePipe],
})
export class TransactionsPageComponent implements OnInit {
	constructor(
		private readonly transactionsService: TransactionsService,
		private readonly accountsService: AccountsService,
		private readonly categoriesService: CategoriesService,
		private readonly utilityService: UtilityService,
		private readonly datePipe: DatePipe
	) {}

	/** Groups of M/d/yy transactions */
	public transactionsGroups: Array<[string, Array<Transaction>]>;
	public accounts: Account[];
	public categories: Category[];

	public ngOnInit() {
		this.transactionsService.getByQuery().subscribe((transactions) => {
			this.transactionsGroups = this.transformTransactions(transactions);

			this.accountsService
				.getByQuery()
				.subscribe((accounts) => (this.accounts = accounts));

			this.categoriesService
				.getByQuery()
				.subscribe((categories) => (this.categories = categories));
		});
	}

	private dateSortCriteria = (a: string, b: string) => Date.parse(b) - Date.parse(a);

	private transactionsGroupSelector(transaction: Transaction) {
		return this.datePipe.transform(transaction.date, "shortDate") || "0/0/0";
	}

	private transformTransactions(transactions: Transaction[]) {
		const sortedRawTransactions = transactions.sort((a, b) =>
			this.dateSortCriteria(a.date, b.date)
		);

		const groupedTransactions = this.utilityService.groupBy(
			sortedRawTransactions,
			this.transactionsGroupSelector.bind(this)
		);

		return this.utilityService.sortObjectByKeys(
			groupedTransactions,
			this.dateSortCriteria
		);
	}
}
