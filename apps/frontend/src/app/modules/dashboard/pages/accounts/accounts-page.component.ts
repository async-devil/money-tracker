import { Component, OnInit } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { Router } from "@angular/router";

import { AccountsService } from "src/app/services/accounts/accounts.service";
import {
	Account,
	AccountType,
} from "src/app/services/accounts/types/response/account.entity";
import { TransactionType } from "src/app/services/transactions/types/response/transaction.entity";
import { UtilityService } from "src/app/services/utility/utility.service";

import { AccountOperatePanelComponent } from "../../dialogs/account-operate-panel/account-operate-panel.component";
import { SelectOperationPanelComponent } from "../../dialogs/select-operation-panel/select-operation-panel.component";
import { TransactionOperatePanelComponent } from "../../dialogs/transaction-operate-panel/transaction-operate-panel.component";

@Component({
	selector: "app-accounts-page",
	templateUrl: "./accounts-page.component.html",
	styleUrls: ["./accounts-page.component.scss"],
})
export class AccountsPageComponent implements OnInit {
	constructor(
		private readonly accountsService: AccountsService,
		private readonly utilityService: UtilityService,
		private readonly router: Router,
		private readonly dialog: MatDialog
	) {}

	public accountsGroups: Array<[AccountType, Array<Account>]>;

	public ngOnInit() {
		this.accountsService.getByQuery().subscribe((accounts) => {
			this.accountsGroups = this.utilityService.groupBy(
				accounts,
				(account) => account.type
			) as Array<[AccountType, Array<Account>]>;
		});
	}

	private reloadPage() {
		this.router.routeReuseStrategy.shouldReuseRoute = () => false;
		this.router.onSameUrlNavigation = "reload";

		void this.router.navigate(["/dashboard/accounts"]);
	}

	public onAccountClick(account: Account) {
		const dialogRef = this.dialog.open(SelectOperationPanelComponent, {
			autoFocus: false,
			data: {
				title: "Operate account",
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
					{
						actionTitle: "Transfer",
						actionId: "use",
						iconName: "arrow_forward",
						iconColor: "#abb2bf",
					},
				],
			},
		});

		dialogRef.componentInstance.$event.subscribe((id) => {
			switch (id) {
				case "edit":
					return this.editAccountAction(account);

				case "delete":
					return this.deleteAccountAction(account);

				case "use":
					return this.useAccountAction(account);
			}
		});
	}

	private editAccountAction(account: Account) {
		this.dialog.closeAll();

		this.dialog.open(AccountOperatePanelComponent, {
			autoFocus: false,
			data: { id: account.id },
		});
	}

	private deleteAccountAction(account: Account) {
		this.dialog.closeAll();

		this.accountsService.delete({ id: account.id }).subscribe(() => {
			this.reloadPage();
		});
	}

	private useAccountAction(account: Account) {
		this.dialog.closeAll();

		this.dialog.open(TransactionOperatePanelComponent, {
			autoFocus: false,
			data: {
				id: "new",
				type: TransactionType.TRANSFER,
				from: account.id,
			},
		});
	}

	public createAccountAction() {
		this.dialog.closeAll();

		this.dialog.open(AccountOperatePanelComponent, {
			autoFocus: false,
			data: { id: "new", type: AccountType.REGULAR },
		});
	}
}
