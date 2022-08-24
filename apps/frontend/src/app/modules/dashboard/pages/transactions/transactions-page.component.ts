import { DatePipe } from "@angular/common";
import { Component, OnInit } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { Router } from "@angular/router";

import { AccountsService } from "src/app/services/accounts/accounts.service";
import { Account } from "src/app/services/accounts/types/response/account.entity";
import { CategoriesService } from "src/app/services/categories/categories.service";
import { Category } from "src/app/services/categories/types/response/category.entity";
import { TransactionsService } from "src/app/services/transactions/transactions.service";
import { Transaction } from "src/app/services/transactions/types/response/transaction.entity";
import { UtilityService } from "src/app/services/utility/utility.service";

import { SelectOperationPanelComponent } from "../../dialogs/select-operation-panel/select-operation-panel.component";
import { TransactionOperatePanelComponent } from "../../dialogs/transaction-operate-panel/transaction-operate-panel.component";

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
		private readonly datePipe: DatePipe,
		private readonly router: Router,
		private readonly dialog: MatDialog
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

	private reloadPage() {
		this.router.routeReuseStrategy.shouldReuseRoute = () => false;
		this.router.onSameUrlNavigation = "reload";

		void this.router.navigate(["/dashboard/transactions"]);
	}

	public onTransactionClick(transaction: Transaction) {
		const dialogRef = this.dialog.open(SelectOperationPanelComponent, {
			autoFocus: false,
			data: {
				title: "Operate transaction",
				actions: [
					{
						actionTitle: "Edit",
						actionId: "edit",
						iconName: "edit",
						iconColor: "#fcc50f",
					},
					{
						actionTitle: "Delete",
						actionId: "delete",
						iconName: "delete",
						iconColor: "#f44747",
					},
				],
			},
		});

		dialogRef.componentInstance.$event.subscribe((id) => {
			switch (id) {
				case "edit":
					return this.editTransactionAction(transaction);

				case "delete":
					return this.deleteTransactionAction(transaction);
			}
		});
	}

	private editTransactionAction(transaction: Transaction) {
		this.dialog.closeAll();

		this.dialog.open(TransactionOperatePanelComponent, {
			autoFocus: false,
			data: { id: transaction.id },
		});
	}

	private deleteTransactionAction(transaction: Transaction) {
		this.dialog.closeAll();

		this.transactionsService.delete({ id: transaction.id }).subscribe(() => {
			this.reloadPage();
		});
	}
}
