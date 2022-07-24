import { createReducer } from "@reduxjs/toolkit";

import { Category } from "src/common/requests/categories/types/response/category.entity";

import { categoriesActions } from "./categories.actions";

export type CategoriesStateType = {
	categories: Category[];
};

const initialState: CategoriesStateType = { categories: [] };

export const categoriesReducer = createReducer(initialState, (builder) => {
	builder.addCase(categoriesActions.setCategories, (state, action) => {
		state.categories = action.payload;
	});
});
