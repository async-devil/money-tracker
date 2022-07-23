import { createAction } from "@reduxjs/toolkit";

import { GetCategoriesByQueryDto } from "src/common/requests/categories/types/request/get-categories-by-properties.dto";
import { Category } from "src/common/requests/categories/types/response/category.entity";

export enum CategoriesActionsEnum {
	LOAD_CATEGORIES = "LOAD_CATEGORIES",
	SET_CATEGORIES = "GET_CATEGORIES",
	SET_CATEGORIES_LOADING = "SET_CATEGORIES_LOADING",
}

export const categoriesActions = {
	loadCategories: createAction<GetCategoriesByQueryDto>(CategoriesActionsEnum.LOAD_CATEGORIES),
	setCategories: createAction<Category[]>(CategoriesActionsEnum.SET_CATEGORIES),
	setCategoriesLoading: createAction<boolean>(CategoriesActionsEnum.SET_CATEGORIES_LOADING),
};
