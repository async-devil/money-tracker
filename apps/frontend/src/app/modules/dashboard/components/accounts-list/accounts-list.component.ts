import { Component, Input } from "@angular/core";

import { Account } from "src/app/services/accounts/types/response/account.entity";

@Component({
	selector: "app-accounts-list",
	templateUrl: "./accounts-list.component.html",
	styleUrls: ["./accounts-list.component.scss"],
})
export class AccountsListComponent {
	@Input() accounts: Array<[string, Array<Account>]>;

	@Input() onAccountClick: (account: Account) => unknown;
	@Input() onAccountTransfer: (account: Account) => unknown;
}
