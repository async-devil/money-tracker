import { Component, OnInit } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { Router } from "@angular/router";

import { CategoriesService } from "src/app/services/categories/categories.service";
import {
	Category,
	CategoryType,
} from "src/app/services/categories/types/response/category.entity";
import { TransactionType } from "src/app/services/transactions/types/response/transaction.entity";

import { CategoryOperatePanelComponent } from "../../dialogs/category-operate-panel/category-operate-panel.component";
import { SelectOperationPanelComponent } from "../../dialogs/select-operation-panel/select-operation-panel.component";
import { TransactionOperatePanelComponent } from "../../dialogs/transaction-operate-panel/transaction-operate-panel.component";

@Component({
	selector: "app-dashboard-page",
	templateUrl: "./dashboard-page.component.html",
	styleUrls: ["./dashboard-page.component.scss"],
})
export class DashboardPageComponent implements OnInit {
	public categories: Category[];

	constructor(
		private readonly categoriesService: CategoriesService,
		private readonly router: Router,
		private readonly dialog: MatDialog
	) {}

	public ngOnInit() {
		this.categoriesService.getByQuery().subscribe((categories) => {
			this.categories = categories;
		});
	}

	private reloadPage() {
		this.router.routeReuseStrategy.shouldReuseRoute = () => false;
		this.router.onSameUrlNavigation = "reload";

		void this.router.navigate(["/dashboard"]);
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
}
