import { Component, Input } from "@angular/core";

import { Category } from "src/app/services/categories/types/response/category.entity";

@Component({
	selector: "app-category",
	templateUrl: "./category.component.html",
	styleUrls: ["./category.component.scss"],
})
export class CategoryComponent {
	@Input() category: Category;

	@Input() amount: number;
	@Input() currency: string;

	@Input() onClick: (category: Category) => unknown;
}
