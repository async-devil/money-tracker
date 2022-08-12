import { Component, OnInit } from "@angular/core";

import { AccountsService } from "src/app/services/accounts/accounts.service";
import { Account } from "src/app/services/accounts/types/response/account.entity";
import { UtilityService } from "src/app/services/utility/utility.service";

@Component({
	selector: "app-accounts-page",
	templateUrl: "./accounts-page.component.html",
	styleUrls: ["./accounts-page.component.scss"],
})
export class AccountsPageComponent implements OnInit {
	constructor(
		private readonly accountsService: AccountsService,
		private readonly utilityService: UtilityService
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
}
