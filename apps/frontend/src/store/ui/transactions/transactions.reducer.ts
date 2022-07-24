import { createReducer } from "@reduxjs/toolkit";

import { Transaction } from "src/common/requests/transactions/types/response/transaction.entity";

import { transactionsActions } from "./transactions.actions";

export type TransactionsStateType = {
	transactions: Transaction[];
};

const initialState: TransactionsStateType = { transactions: [] };

export const transactionsReducer = createReducer(initialState, (builder) => {
	builder.addCase(transactionsActions.setTransactions, (state, action) => {
		state.transactions = action.payload;
	});
});
