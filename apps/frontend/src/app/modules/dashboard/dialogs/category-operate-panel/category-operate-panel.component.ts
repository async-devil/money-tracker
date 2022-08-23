import { Component, Inject, Input, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { MatDialog, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { Router } from "@angular/router";
import { Observable } from "rxjs";

import { CategoriesService } from "src/app/services/categories/categories.service";
import { CreateCategoryDto } from "src/app/services/categories/types/request/create-category.dto";
import {
	Category,
	CategoryType,
} from "src/app/services/categories/types/response/category.entity";

export type CategoryOperatePanelType = {
	id: string | "new";
	type?: CategoryType;
};

@Component({
	selector: "app-category-operate-panel",
	templateUrl: "./category-operate-panel.component.html",
	styleUrls: ["./category-operate-panel.component.scss"],
})
export class CategoryOperatePanelComponent implements OnInit {
	public subject: CreateCategoryDto;

	constructor(
		private readonly router: Router,
		private readonly categoriesService: CategoriesService,
		private readonly dialog: MatDialog,
		@Inject(MAT_DIALOG_DATA) public readonly data: CategoryOperatePanelType
	) {
		console.log(data);
	}

	public ngOnInit() {
		if (!this.data.id || (this.data.id === "new" && !this.data.type)) {
			console.log("Error");
			this.dialog.closeAll();
		}

		if (this.data.id === "new") {
			this.subject = this.getDefaultCategory(this.data.type as CategoryType);
			this.setFormValues(this.subject);
		} else {
			this.categoriesService.getById({ id: this.data.id }).subscribe((category) => {
				this.subject = category;
				this.setFormValues(this.subject);
			});
		}
	}

	private reloadDashboardPage() {
		this.router.routeReuseStrategy.shouldReuseRoute = () => false;
		this.router.onSameUrlNavigation = "reload";

		void this.router.navigate(["/dashboard"]);
	}

	private getDefaultCategory(type: CategoryType): CreateCategoryDto {
		return {
			name: "Sample",
			type,
			icon_color: "a6a6a6",
			icon_name: "more_horiz",
		};
	}

	private setFormValues(dto: CreateCategoryDto) {
		console.log(dto);
		this.form.controls.name.setValue(dto.name);
		this.form.controls.icon_name.setValue(dto.icon_name || null);
		this.form.controls.icon_color.setValue(dto.icon_color || null);
	}

	private getChangedCategory(): CreateCategoryDto {
		const { name, icon_color, icon_name } = this.form.value;

		return {
			name: name ? name : this.subject.name,
			type: this.subject.type,
			icon_color: icon_color ? icon_color : this.subject.icon_color,
			icon_name: icon_name ? icon_name : this.subject.icon_name,
		};
	}

	private createCategory() {
		return this.categoriesService.create(this.getChangedCategory());
	}

	private updateCategory() {
		return this.categoriesService.updateById({
			id: this.data.id,
			data: this.getChangedCategory(),
		});
	}

	public form = new FormGroup({
		name: new FormControl<string>("", [Validators.required]),
		icon_color: new FormControl<string>("", [
			Validators.required,
			Validators.pattern(/^[0-9a-fA-F]{6}$/),
		]),
		icon_name: new FormControl<string>("", [Validators.required]),
	});

	public onFormSubmit() {
		if (this.form.status !== "VALID") return;

		console.log("submit");

		const $action =
			this.data.id === "id"
				? this.createCategory.bind(this)
				: this.updateCategory.bind(this);

		$action().subscribe(() => {
			this.dialog.closeAll();
			this.reloadDashboardPage();
		});
	}
}
