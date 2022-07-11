import { createReducer } from "@reduxjs/toolkit";

import { Transaction } from "src/common/requests/transactions/types/response/transaction.entity";

import { transactionsActions } from "./transactionsActions";

const initialState = { transactions: [], loading: false, error: false } as {
	transactions: Transaction[];
	loading: boolean;
	error: boolean;
};

export const transactionsReducer = createReducer(initialState, (builder) => {
	builder
		.addCase(transactionsActions.getTransactionsRequest, (state, action) => {
			state.loading = true;
		})
		.addCase(transactionsActions.getTransactionsSuccess, (state, action) => {
			state.transactions = action.payload;
			state.loading = false;
		})
		.addCase(transactionsActions.getTransactionsFailure, (state, action) => {
			state.error = true;
			state.loading = false;
		});
});
