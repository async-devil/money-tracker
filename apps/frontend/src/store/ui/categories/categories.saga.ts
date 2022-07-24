import { PayloadAction } from "@reduxjs/toolkit";
import { AxiosError, AxiosResponse } from "axios";
import { call, put, takeLatest } from "redux-saga/effects";

import { ApiRequests } from "src/common/requests";
import { GetCategoriesByQueryDto } from "src/common/requests/categories/types/request/get-categories-by-properties.dto";
import { Category } from "src/common/requests/categories/types/response/category.entity";
import { HttpException } from "src/common/requests/types/HttpException";

import { miscActions } from "../misc/misc.actions";
import { categoriesActions, CategoriesActionsEnum } from "./categories.actions";

export function* onLoadCategories(action: PayloadAction<GetCategoriesByQueryDto>) {
	const loadingId = Math.floor(Date.now() * Math.random());

	try {
		yield put(miscActions.addLoading({ id: loadingId, action: action.type }));
		const result: AxiosResponse<Category[]> = yield call(() =>
			ApiRequests.categories.getByQuery(action.payload)
		);

		yield put(categoriesActions.setCategories(result.data));
	} catch (err) {
		const error = err as AxiosError<HttpException>;

		yield put(miscActions.setError(error.response?.data as HttpException));
	} finally {
		yield put(miscActions.removeLoading(loadingId));
	}
}

export function* categoriesSaga() {
	yield takeLatest(CategoriesActionsEnum.LOAD_CATEGORIES, onLoadCategories);
}
