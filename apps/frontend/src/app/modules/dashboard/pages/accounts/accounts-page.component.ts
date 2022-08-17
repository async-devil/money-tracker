import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";

import { AccountsService } from "src/app/services/accounts/accounts.service";
import { Account } from "src/app/services/accounts/types/response/account.entity";
import { TransactionType } from "src/app/services/transactions/types/response/transaction.entity";
import { UtilityService } from "src/app/services/utility/utility.service";

@Component({
	selector: "app-accounts-page",
	templateUrl: "./accounts-page.component.html",
	styleUrls: ["./accounts-page.component.scss"],
})
export class AccountsPageComponent implements OnInit {
	constructor(
		private readonly accountsService: AccountsService,
		private readonly utilityService: UtilityService,
		private readonly router: Router
	) {}

	public accountsGroups: Array<[string, Array<Account>]>;

	public ngOnInit() {
		this.accountsService.getByQuery().subscribe((accounts) => {
			this.accountsGroups = this.utilityService.groupBy(
				accounts,
				(account) => account.type
			);
		});
	}

	public onAccountClick(account: Account) {
		console.log(account);
	}

	public onAccountTransfer(account: Account) {
		void this.router.navigate(["/dashboard/transactions/new"], {
			queryParams: {
				type: TransactionType.TRANSFER,
				from: account.id,
			},
		});
	}
}
