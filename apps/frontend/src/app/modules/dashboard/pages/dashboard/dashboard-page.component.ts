import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";

import { CategoriesService } from "src/app/services/categories/categories.service";
import {
	Category,
	CategoryType,
} from "src/app/services/categories/types/response/category.entity";
import { TransactionType } from "src/app/services/transactions/types/response/transaction.entity";

@Component({
	selector: "app-dashboard-page",
	templateUrl: "./dashboard-page.component.html",
	styleUrls: ["./dashboard-page.component.scss"],
})
export class DashboardPageComponent implements OnInit {
	public categories: Category[];

	constructor(
		private readonly categoriesService: CategoriesService,
		private readonly router: Router
	) {}

	public ngOnInit() {
		this.categoriesService.getByQuery().subscribe((categories) => {
			this.categories = categories;
		});
	}

	public onCategoryClick(category: Category) {
		const query =
			category.type === CategoryType.INCOME
				? { type: TransactionType.RECHARGE, from: category.id }
				: { type: TransactionType.WITHDRAW, to: category.id };

		void this.router.navigate(["/dashboard/transactions/new"], {
			queryParams: query,
		});
	}
}
