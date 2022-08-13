import { Component, Input } from "@angular/core";

import { Account } from "src/app/services/accounts/types/response/account.entity";

@Component({
	selector: "app-account",
	templateUrl: "./account.component.html",
	styleUrls: ["./account.component.scss"],
})
export class AccountComponent {
	@Input() account: Account;

	@Input() onClick: (account: Account) => unknown;
	@Input() onTransferAction: (account: Account) => unknown;
}
