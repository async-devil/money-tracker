import { Component, Input, OnInit } from "@angular/core";
import { Observable } from "rxjs";

import { Account } from "src/app/services/accounts/types/response/account.entity";
import { Category } from "src/app/services/categories/types/response/category.entity";
import { Transaction } from "src/app/services/transactions/types/response/transaction.entity";

@Component({
	selector: "app-transaction",
	templateUrl: "./transaction.component.html",
	styleUrls: ["./transaction.component.scss"],
})
export class TransactionComponent implements OnInit {
	@Input() transaction: Transaction;

	@Input() from$: Observable<Category | Account>;
	@Input() to$: Observable<Account | Category>;

	@Input() onClick: (transaction: Transaction) => void;

	public from: Category | Account;
	public to: Account | Category;

	public ngOnInit() {
		this.from$.subscribe((result) => {
			this.from = result;
		});

		this.to$.subscribe((result) => {
			this.to = result;
		});
	}
}
