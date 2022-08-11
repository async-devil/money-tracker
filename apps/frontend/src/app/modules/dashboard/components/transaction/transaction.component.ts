import { Component, Input } from "@angular/core";

import { Account } from "src/app/services/accounts/types/response/account.entity";
import { Category } from "src/app/services/categories/types/response/category.entity";
import { Transaction } from "src/app/services/transactions/types/response/transaction.entity";

@Component({
	selector: "app-transaction",
	templateUrl: "./transaction.component.html",
	styleUrls: ["./transaction.component.scss"],
})
export class TransactionComponent {
	@Input() transaction: Transaction;

	@Input() onClick: (transaction: Transaction) => unknown;

	@Input() from: Category | Account;
	@Input() to: Account | Category;
}
