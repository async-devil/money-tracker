import { HttpErrorResponse } from "@angular/common/http";
import { Component, OnInit, ViewEncapsulation } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { catchError, concat, of, tap, throwError } from "rxjs";

import { AccountsService } from "src/app/services/accounts/accounts.service";
import { Account } from "src/app/services/accounts/types/response/account.entity";
import { CategoriesService } from "src/app/services/categories/categories.service";
import {
	Category,
	CategoryType,
} from "src/app/services/categories/types/response/category.entity";
import { TransactionsService } from "src/app/services/transactions/transactions.service";
import { CreateTransactionDto } from "src/app/services/transactions/types/request/create-transaction.dto";
import {
	Transaction,
	TransactionType,
} from "src/app/services/transactions/types/response/transaction.entity";

@Component({
	selector: "app-operate-transaction-page",
	templateUrl: "./operate-transaction-page.component.html",
	styleUrls: ["./operate-transaction-page.component.scss"],
	encapsulation: ViewEncapsulation.None,
})
export class OperateTransactionPageComponent implements OnInit {
	public id: string | "new";

	public accounts: Account[];
	public categories: Category[];

	public subject: CreateTransactionDto;

	constructor(
		private readonly activeRoute: ActivatedRoute,
		private readonly router: Router,
		private readonly transactionsService: TransactionsService,
		private readonly accountsService: AccountsService,
		private readonly categoriesService: CategoriesService
	) {}

	public ngOnInit() {
		this.id = this.activeRoute.snapshot.paramMap.get("id") as string;

		this.subject = new CreateTransactionDto();
		const queryParamMap = this.activeRoute.snapshot.queryParamMap;

		this.subject.type = queryParamMap.get("type") as TransactionType;
		this.subject.from = queryParamMap.get("from") as string;
		this.subject.to = queryParamMap.get("to") as string;

		this.$collectInfo().subscribe();
	}

	public onClose() {
		this.navigateToTransactionsPage();
	}

	private throwErrorAndRedirect(error?: unknown) {
		return throwError(() => {
			this.navigateToTransactionsPage();

			return error;
		});
	}

	private navigateToTransactionsPage() {
		return void this.router.navigate(["/dashboard/transactions"]);
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

	private filterCategories() {
		const categoryType =
			this.subject.type === TransactionType.RECHARGE
				? CategoryType.INCOME
				: CategoryType.EXPENSE;

		this.categories = this.categories.filter(
			(category) => category.type === categoryType
		);
	}

	/** Get existing transaction or set the default one if not found and id is "new" */
	private $getTransaction() {
		return this.transactionsService.getById({ id: this.id }).pipe(
			catchError((error: HttpErrorResponse) => {
				if (this.id === "new") return of(null);

				return this.throwErrorAndRedirect(error);
			}),
			tap(() => {
				if (
					this.id === "new" &&
					(!this.subject.type || (!this.subject.from && !this.subject.to))
				) {
					this.navigateToTransactionsPage();
				}
			}),
			tap((transaction: Transaction | null) => {
				if (transaction) {
					this.subject = transaction as CreateTransactionDto;
				}

				this.filterCategories();

				if (!transaction) {
					this.subject = this.getStartTransaction();
				}

				this.setFormValues(this.subject);
			})
		);
	}

	private setFormValues(dto: CreateTransactionDto) {
		this.form.controls.from.setValue(this.getEntityById(dto.from));
		this.form.controls.to.setValue(this.getEntityById(dto.to));
		this.form.controls.amount.setValue(parseFloat(dto.amount_to));
		this.form.controls.date.setValue(new Date(dto.date));
		this.form.controls.location.setValue(dto.location);
		this.form.controls.notes.setValue(dto.notes);
	}

	private getStartTransaction(): CreateTransactionDto {
		//? if from exist return it, else if type === recharge return first category, else account
		const from = this.subject.from
			? this.subject.from
			: this.subject.type === TransactionType.RECHARGE
			? this.categories[0]?.id
			: this.accounts[0]?.id;

		//? nearly same thing as above
		const to = this.subject.to
			? this.subject.to
			: this.subject.type === TransactionType.WITHDRAW
			? this.categories[0]?.id
			: this.accounts[0]?.id;

		return {
			type: this.subject.type,
			from: from,
			to: to,
			amount_from: "0",
			amount_to: "0",
			currency_from: "USD",
			currency_to: "USD",
			date: new Date().toISOString(),
		};
	}

	public $collectInfo() {
		return concat(this.$getAccounts(), this.$getCategories(), this.$getTransaction());
	}

	public getEntityById(id: string) {
		const accountSearchResult = this.accounts.find((account) => account.id === id);
		const categorySearchResult = this.categories.find((category) => category.id === id);

		const result = accountSearchResult || categorySearchResult;

		if (!result) {
			this.navigateToTransactionsPage();
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

	public form = new FormGroup({
		from: new FormControl<undefined | Account | Category>(undefined, [
			Validators.required,
		]),
		to: new FormControl<undefined | Account | Category>(undefined, [Validators.required]),
		date: new FormControl<undefined | Date>(undefined, [Validators.required]),
		amount: new FormControl(0, [
			Validators.required,
			Validators.pattern(/^-?\d{1,10}(\.\d{0,8})?$/),
		]),
		notes: new FormControl<undefined | string>(undefined),
		location: new FormControl<string | undefined>(undefined),
	});

	public onFormSubmit() {
		if (this.form.status !== "VALID") return;

		const { from, to, amount, date, location, notes } = this.form.value;

		console.log(this.form.value);

		const updatedData = {
			from: from ? from.id : this.subject.from,
			to: to ? to.id : this.subject.to,
			amount_from: amount ? amount.toString() : this.subject.amount_from,
			amount_to: amount ? amount.toString() : this.subject.amount_to,
			date: date ? date.toISOString() : this.subject.date,
			notes: notes || undefined,
			location: location || undefined,
		};

		const $createTransaction = this.transactionsService.create(
			Object.assign(this.subject, updatedData)
		);

		const $updateTransaction = this.transactionsService.updateById({
			id: this.id,
			data: updatedData,
		});

		const $action = this.id === "new" ? $createTransaction : $updateTransaction;

		$action.subscribe(() => {
			this.navigateToTransactionsPage();
		});
	}
}
