import { Component, OnInit } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { Router } from "@angular/router";
import { ChartData, ChartOptions } from "chart.js";
import { forkJoin } from "rxjs";

import { CategoriesService } from "src/app/services/categories/categories.service";
import {
	Category,
	CategoryType,
} from "src/app/services/categories/types/response/category.entity";
import { TransactionsService } from "src/app/services/transactions/transactions.service";
import {
	Transaction,
	TransactionType,
} from "src/app/services/transactions/types/response/transaction.entity";

import { CategoryOperatePanelComponent } from "../../dialogs/category-operate-panel/category-operate-panel.component";
import { SelectOperationPanelComponent } from "../../dialogs/select-operation-panel/select-operation-panel.component";
import { TransactionOperatePanelComponent } from "../../dialogs/transaction-operate-panel/transaction-operate-panel.component";

export type CategoryInfo = {
	category: Category;
	amount: number;
};

@Component({
	selector: "app-dashboard-page",
	templateUrl: "./dashboard-page.component.html",
	styleUrls: ["./dashboard-page.component.scss"],
})
export class DashboardPageComponent implements OnInit {
	public categories: CategoryInfo[];
	public transactions: Transaction[];

	public selectedType = CategoryType.EXPENSE;

	constructor(
		private readonly categoriesService: CategoriesService,
		private readonly transactionsService: TransactionsService,
		private readonly router: Router,
		private readonly dialog: MatDialog
	) {}

	public ngOnInit() {
		this.categoriesService.getByQuery().subscribe((categories) => {
			this.transactionsService.getByQuery().subscribe((transactions) => {
				this.transactions = transactions;

				this.categories = categories.map((category) =>
					Object.assign({}, { category, amount: this.getCategoryTotalAmount(category) })
				);
			});
		});
	}

	private reloadPage() {
		this.router.routeReuseStrategy.shouldReuseRoute = () => false;
		this.router.onSameUrlNavigation = "reload";

		void this.router.navigate(["/dashboard"]);
	}

	private getCategoryTotalAmount(category: Category) {
		const destination = category.type === CategoryType.INCOME ? "from" : "to";

		const relatedTransactions = this.transactions.filter((transaction) => {
			return transaction[destination] === category.id;
		});

		const amount = relatedTransactions.reduce(
			(prev, curr) => parseFloat(curr[`amount_${destination}`]) + prev,
			0
		);

		return Math.round(amount);
	}

	public getIncomeCategories() {
		return this.categories.filter(
			(category) => category.category.type === CategoryType.INCOME
		);
	}

	public getExpenseCategories() {
		return this.categories.filter(
			(category) => category.category.type === CategoryType.EXPENSE
		);
	}

	public setSelectedType(index: number) {
		this.selectedType = index === 0 ? CategoryType.EXPENSE : CategoryType.INCOME;
	}

	public onCategoryClick(category: Category) {
		const dialogRef = this.dialog.open(SelectOperationPanelComponent, {
			autoFocus: false,
			data: {
				title: "Operate category",
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
						actionTitle: category.type === CategoryType.INCOME ? "Earn" : "Spend",
						actionId: "use",
						iconName: "arrow_forward",
						iconColor: category.type === CategoryType.INCOME ? "#a5e075" : "#ff616e",
					},
				],
			},
		});

		dialogRef.componentInstance.$event.subscribe((id) => {
			switch (id) {
				case "edit":
					return this.editCategoryAction(category);

				case "delete":
					return this.deleteCategoryAction(category);

				case "use":
					return this.useCategoryAction(category);
			}
		});
	}

	private editCategoryAction(category: Category) {
		this.dialog.closeAll();

		this.dialog.open(CategoryOperatePanelComponent, {
			autoFocus: false,
			data: { id: category.id },
		});
	}

	private deleteCategoryAction(category: Category) {
		this.dialog.closeAll();

		this.categoriesService.delete({ id: category.id }).subscribe(() => {
			this.reloadPage();
		});
	}

	private useCategoryAction(category: Category) {
		const query =
			category.type === CategoryType.INCOME
				? { id: "new", type: TransactionType.RECHARGE, from: category.id }
				: { id: "new", type: TransactionType.WITHDRAW, to: category.id };

		this.dialog.closeAll();

		this.dialog.open(TransactionOperatePanelComponent, {
			autoFocus: false,
			data: query,
		});
	}

	public createCategoryAction(type: CategoryType) {
		this.dialog.closeAll();

		this.dialog.open(CategoryOperatePanelComponent, {
			autoFocus: false,
			data: { id: "new", type },
		});
	}

	public getDoughnutChartDataByType(type: "income" | "expense"): ChartData<"doughnut"> {
		const categories =
			type === CategoryType.INCOME
				? this.getIncomeCategories()
				: this.getExpenseCategories();

		const data: ChartData<"doughnut"> = {
			labels: categories.map((category) => category.category.name),
			datasets: [
				{
					data: categories.map((category) => category.amount),
					backgroundColor: categories.map(
						(category) => `#${category.category.icon_color}50`
					),
					hoverBackgroundColor: categories.map(
						(category) => `#${category.category.icon_color}aa`
					),
					hoverBorderColor: categories.map(
						(category) => `#${category.category.icon_color}`
					),
					borderColor: categories.map((category) => `#${category.category.icon_color}`),
					borderWidth: 1,
				},
			],
		};

		return data;
	}

	public chartOptions: ChartOptions<"doughnut"> = {
		plugins: {
			legend: { display: false },
			tooltip: {
				callbacks: {
					label: function (context) {
						const total = context.dataset.data.reduce((prev, curr) => prev + curr, 0);
						const thisAmount = context.dataset.data[context.dataIndex];

						const percentage = Math.floor((thisAmount / total) * 100);

						return `${context.label}: ${percentage}%`;
					},
				},
			},
		},
		animation: { animateRotate: false },
		cutout: 80,
	};

	public getTotalAmountByType(type: "income" | "expense") {
		const categories =
			type === CategoryType.INCOME
				? this.getIncomeCategories()
				: this.getExpenseCategories();

		const amounts = categories.map((category) => category.amount);

		return amounts.reduce((prev, curr) => prev + curr, 0);
	}
}
