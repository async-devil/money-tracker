import { createReducer } from "@reduxjs/toolkit";

import { HttpException } from "src/common/requests/types/HttpException";

import { LoadingType, miscActions } from "./misc.actions";

export type MiscStateType = {
	error?: HttpException;
	loadings: LoadingType[];
	isLoading: boolean;
};

const initialState: MiscStateType = { loadings: [], isLoading: true };

export const miscReducer = createReducer(initialState, (builder) => {
	builder
		.addCase(miscActions.setError, (state, action) => {
			state.error = action.payload;
		})
		.addCase(miscActions.removeError, (state) => {
			state.error = undefined;
		})
		.addCase(miscActions.addLoading, (state, action) => {
			state.loadings.push(action.payload);
			state.isLoading = true;
		})
		.addCase(miscActions.removeLoading, (state, action) => {
			state.loadings = state.loadings.filter((loading) => loading.id !== action.payload);

			if (state.loadings.length === 0) state.isLoading = false;
		});
});
