import { createReducer } from "@reduxjs/toolkit";

import { Category } from "src/common/requests/categories/types/response/category.entity";

import { categoriesActions } from "./categories.actions";

export type CategoriesStateType = {
	categories: Category[];
	isLoading: boolean;
	isLoaded: boolean;
};

const initialState: CategoriesStateType = { categories: [], isLoading: false, isLoaded: false };

export const categoriesReducer = createReducer(initialState, (builder) => {
	builder
		.addCase(categoriesActions.loadCategories, (state) => {
			state.isLoaded = false;
			state.isLoading = true;
		})
		.addCase(categoriesActions.setCategoriesLoading, (state, action) => {
			state.isLoading = action.payload;
		})
		.addCase(categoriesActions.setCategories, (state, action) => {
			state.categories = action.payload;
			state.isLoaded = true;
			state.isLoading = false;
		});
});
