import { Component, Inject, OnInit } from "@angular/core";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { MatDialog, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { Router } from "@angular/router";

import { AccountsService } from "src/app/services/accounts/accounts.service";
import { CreateAccountDto } from "src/app/services/accounts/types/request/create-account.dto";
import { AccountType } from "src/app/services/accounts/types/response/account.entity";

export type AccountOperatePanelType = {
	id: string | "new";
};

@Component({
	selector: "app-account-operate-panel",
	templateUrl: "./account-operate-panel.component.html",
	styleUrls: ["./account-operate-panel.component.scss"],
})
export class AccountOperatePanelComponent implements OnInit {
	public subject: CreateAccountDto;

	constructor(
		private readonly router: Router,
		private readonly accountsService: AccountsService,
		private readonly dialog: MatDialog,
		@Inject(MAT_DIALOG_DATA) public readonly data: AccountOperatePanelType
	) {}

	public ngOnInit() {
		if (!this.data.id) {
			this.dialog.closeAll();
		}

		if (this.data.id === "new") {
			this.subject = this.getDefaultAccount();
			this.setFormValues(this.subject);
		} else {
			this.accountsService.getById({ id: this.data.id }).subscribe((account) => {
				this.subject = account;
				this.setFormValues(this.subject);
			});
		}
	}

	public accountTypes = Object.values(AccountType);

	private reloadAccountsPage() {
		this.router.routeReuseStrategy.shouldReuseRoute = () => false;
		this.router.onSameUrlNavigation = "reload";

		void this.router.navigate(["/dashboard/accounts"]);
	}

	private getDefaultAccount(): CreateAccountDto {
		return {
			name: "Sample",
			type: AccountType.REGULAR,
			currency: "USD",
			icon_color: "a6a6a6",
			icon_name: "more_horiz",
		};
	}

	private setFormValues(dto: CreateAccountDto) {
		this.form.controls.name.setValue(dto.name);
		this.form.controls.type.setValue(dto.type);
		this.form.controls.balance.setValue(parseFloat(dto.balance || "0"));
		this.form.controls.icon_name.setValue(dto.icon_name || null);
		this.form.controls.icon_color.setValue(dto.icon_color || null);
		this.form.controls.notes.setValue(dto.notes);
	}

	private getChangedCategory(): CreateAccountDto {
		const { name, type, balance, icon_color, icon_name, notes } = this.form.value;

		return {
			name: name ? name : this.subject.name,
			type: type ? type : this.subject.type,
			balance: typeof balance === "number" ? balance.toString() : this.subject.balance,
			currency: this.subject.currency,
			icon_color: icon_color ? icon_color : this.subject.icon_color,
			icon_name: icon_name ? icon_name : this.subject.icon_name,
			notes: notes || undefined,
		};
	}

	private createAccount() {
		return this.accountsService.create(this.getChangedCategory());
	}

	private updateAccount() {
		return this.accountsService.updateById({
			id: this.data.id,
			data: this.getChangedCategory(),
		});
	}

	public form = new FormGroup({
		name: new FormControl<string>("", [Validators.required]),
		type: new FormControl<AccountType>(AccountType.REGULAR, [Validators.required]),
		balance: new FormControl<number>(0, [
			Validators.required,
			Validators.pattern(/^-?\d{1,10}(\.\d{0,8})?$/),
		]),
		icon_color: new FormControl<string>("", [
			Validators.required,
			Validators.pattern(/^[0-9a-fA-F]{6}$/),
		]),
		icon_name: new FormControl<string>("", [Validators.required]),
		notes: new FormControl<string | undefined>(undefined),
	});

	public onFormSubmit() {
		if (this.form.status !== "VALID") return;

		const $action =
			this.data.id === "new"
				? this.createAccount.bind(this)
				: this.updateAccount.bind(this);

		$action().subscribe(() => {
			this.dialog.closeAll();
			this.reloadAccountsPage();
		});
	}
}
