import { createReducer } from "@reduxjs/toolkit";

import { Transaction } from "src/common/requests/transactions/types/response/transaction.entity";

import { transactionsActions } from "./transactions.actions";

export type TransactionsStateType = {
	transactions: Transaction[];
	isLoading: boolean;
	isLoaded: boolean;
};

const initialState: TransactionsStateType = { transactions: [], isLoading: false, isLoaded: false };

export const transactionsReducer = createReducer(initialState, (builder) => {
	builder
		.addCase(transactionsActions.loadTransactions, (state) => {
			state.isLoaded = false;
			state.isLoading = true;
		})
		.addCase(transactionsActions.setTransactionsLoading, (state, action) => {
			state.isLoading = action.payload;
		})
		.addCase(transactionsActions.setTransactions, (state, action) => {
			state.transactions = action.payload;
			state.isLoaded = true;
			state.isLoading = false;
		});
});
