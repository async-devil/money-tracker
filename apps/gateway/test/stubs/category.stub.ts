/* eslint-disable sonarjs/no-duplicate-string */
import {
	Category,
	CategoryType,
} from "src/modules/categories-service/types/response/category.entity";

export const dateStub = 1649969640364;

export const categoryStub = (properties: Partial<Category> = {}): Category => {
	return Object.assign(
		{
			id: "b2afa6f8-745c-4f95-8f00-f8e9cf60a2e7",
			owner: "a90a4365-3a6f-4bda-b1ad-9d9bdbc904fb",
			type: CategoryType.INCOME,
			name: "Salary",
			sub: null,
			archived: false,
			mandatory: false,
			notes: null,
			icon_name: "MoreHoriz",
			icon_color: "A6A6A6",
		},
		properties
	);
};

export const categoryStubSecondary = (properties: Partial<Category> = {}): Category => {
	return Object.assign(
		{
			id: "be919c91-4b86-4591-8d63-8d2a71b7ea6a",
			owner: "a90a4365-3a6f-4bda-b1ad-9d9bdbc904fb",
			type: CategoryType.EXPENSE,
			name: "Groceries",
			sub: null,
			archived: false,
			mandatory: true,
			notes: null,
			icon_name: "MoreHoriz",
			icon_color: "A6A6A6",
		},
		properties
	);
};

export const createCategoryStub = () => {
	return Object.assign(
		{
			owner: "a90a4365-3a6f-4bda-b1ad-9d9bdbc904fb",
			type: CategoryType.INCOME,
			name: "Salary",
		},
		{}
	);
};

export const createCategoryStubSecondary = () => {
	return Object.assign(
		{
			owner: "a90a4365-3a6f-4bda-b1ad-9d9bdbc904fb",
			type: CategoryType.EXPENSE,
			name: "Groceries",
			mandatory: true,
		},
		{}
	);
};
