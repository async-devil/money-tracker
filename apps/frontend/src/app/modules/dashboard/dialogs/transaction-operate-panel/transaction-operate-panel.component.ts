import { Component, Inject, OnInit, ViewEncapsulation } from "@angular/core";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { MatDialog, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { Router } from "@angular/router";
import { forkJoin, tap } from "rxjs";

import { AccountsService } from "src/app/services/accounts/accounts.service";
import { Account } from "src/app/services/accounts/types/response/account.entity";
import { CategoriesService } from "src/app/services/categories/categories.service";
import {
	Category,
	CategoryType,
} from "src/app/services/categories/types/response/category.entity";
import { TransactionsService } from "src/app/services/transactions/transactions.service";
import { CreateTransactionDto } from "src/app/services/transactions/types/request/create-transaction.dto";
import { TransactionType } from "src/app/services/transactions/types/response/transaction.entity";

export type TransactionOperatePanelType = {
	id: string | "new";
	type?: TransactionType;
	from?: string;
	to?: string;
};

@Component({
	selector: "app-transaction-operate-panel",
	templateUrl: "./transaction-operate-panel.component.html",
	styleUrls: ["./transaction-operate-panel.component.scss"],
	encapsulation: ViewEncapsulation.None,
})
export class TransactionOperatePanelComponent implements OnInit {
	public categories: Category[];
	public accounts: Account[];

	public subject: CreateTransactionDto;

	constructor(
		private readonly router: Router,
		private readonly transactionsService: TransactionsService,
		private readonly accountsService: AccountsService,
		private readonly categoriesService: CategoriesService,
		private readonly dialog: MatDialog,
		@Inject(MAT_DIALOG_DATA) public readonly data: TransactionOperatePanelType
	) {}

	public ngOnInit() {
		if (!this.data.id || (this.data.id === "new" && !this.data.type)) {
			this.dialog.closeAll();
		}

		const $data = forkJoin({
			accounts: this.$getAccounts(),
			categories: this.$getCategories(),
		});

		$data.subscribe(() => {
			if (this.data.id === "new") {
				const type = this.data.type || TransactionType.RECHARGE;

				this.filterCategories(type);

				this.subject = this.getDefaultTransaction(type);

				return this.setFormValues(this.subject);
			}

			this.transactionsService.getById({ id: this.data.id }).subscribe((transaction) => {
				this.subject = transaction;

				this.filterCategories(transaction.type);

				this.setFormValues(this.subject);
			});
		});
	}

	private $getAccounts() {
		return this.accountsService.getByQuery().pipe(
			tap((accounts) => {
				this.accounts = accounts;
			})
		);
	}

	private $getCategories() {
		return this.categoriesService.getByQuery().pipe(
			tap((categories) => {
				this.categories = categories;
			})
		);
	}

	private filterCategories(type: TransactionType) {
		const categoryType =
			type === TransactionType.RECHARGE ? CategoryType.INCOME : CategoryType.EXPENSE;

		this.categories = this.categories.filter(
			(category) => category.type === categoryType
		);
	}

	private reloadTransactionsPage() {
		this.router.routeReuseStrategy.shouldReuseRoute = () => false;
		this.router.onSameUrlNavigation = "reload";

		void this.router.navigate(["/dashboard/transactions"]);
	}

	private getDefaultTransaction(type: TransactionType): CreateTransactionDto {
		//? if from exist return it, else if type === recharge return first category, else account
		const from = this.data?.from
			? this.data.from
			: type === TransactionType.RECHARGE
			? this.categories[0]?.id
			: this.accounts[0]?.id;

		//? nearly same thing as above
		const to = this.data?.to
			? this.data.to
			: type === TransactionType.WITHDRAW
			? this.categories[0]?.id
			: this.accounts[0]?.id;

		return {
			type,
			from,
			to,
			amount_from: "0",
			amount_to: "0",
			currency_from: "USD",
			currency_to: "USD",
			date: new Date().toISOString(),
			location: null,
			notes: null,
		};
	}

	public getEntityById(id?: string) {
		if (!id) throw new Error("Entity not found");

		const accountSearchResult = this.accounts.find((account) => account.id === id);
		const categorySearchResult = this.categories.find((category) => category.id === id);

		const result = accountSearchResult || categorySearchResult;

		if (!result) {
			this.dialog.closeAll();
			throw new Error("Entity not found: " + id);
		}

		return result;
	}

	public getFromEntities(): Array<Category | Account> {
		return this.subject.type === TransactionType.RECHARGE
			? this.categories
			: this.accounts;
	}

	public getToEntities(): Array<Category | Account> {
		return this.subject.type === TransactionType.WITHDRAW
			? this.categories
			: this.accounts;
	}

	private setFormValues(dto: CreateTransactionDto) {
		this.form.controls.from.setValue(this.getEntityById(dto.from));
		this.form.controls.to.setValue(this.getEntityById(dto.to));
		this.form.controls.amount.setValue(parseFloat(dto.amount_to));
		this.form.controls.date.setValue(new Date(dto.date));
		this.form.controls.location.setValue(dto.location);
		this.form.controls.notes.setValue(dto.notes);
	}

	private getChangedTransaction(): CreateTransactionDto {
		const { amount, date, from, to, location, notes } = this.form.value;

		return {
			type: this.subject.type,
			from: from ? from.id : this.subject.from,
			to: to ? to.id : this.subject.to,
			currency_from: "USD",
			currency_to: "USD",
			amount_from:
				typeof amount === "number" ? amount.toString() : this.subject.amount_from,
			amount_to: typeof amount === "number" ? amount.toString() : this.subject.amount_to,
			date: date ? date.toISOString() : this.subject.date,
			notes: notes || null,
			location: location || null,
		};
	}

	private createTransaction() {
		return this.transactionsService.create(this.getChangedTransaction());
	}

	private updateTransaction() {
		return this.transactionsService.updateById({
			id: this.data.id,
			data: this.getChangedTransaction(),
		});
	}

	public form = new FormGroup({
		from: new FormControl<Account | Category | null>(null, [Validators.required]),
		to: new FormControl<Account | Category | null>(null, [Validators.required]),
		date: new FormControl<Date | null>(null, [Validators.required]),
		amount: new FormControl(0, [
			Validators.required,
			Validators.pattern(/^\d{1,10}(\.\d{0,8})?$/),
		]),
		notes: new FormControl<string | null>(null),
		location: new FormControl<string | null>(null),
	});

	public onFormSubmit() {
		if (this.form.status !== "VALID") return;

		const $action =
			this.data.id === "new"
				? this.createTransaction.bind(this)
				: this.updateTransaction.bind(this);

		$action().subscribe(() => {
			this.dialog.closeAll();
			this.reloadTransactionsPage();
		});
	}
}
