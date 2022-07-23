import { createReducer } from "@reduxjs/toolkit";

import { Account } from "src/common/requests/accounts/types/response/account.entity";

import { accountsActions } from "./accounts.actions";

export type AccountsStateType = {
	accounts: Account[];
	isLoading: boolean;
	isLoaded: boolean;
};

const initialState: AccountsStateType = { accounts: [], isLoading: false, isLoaded: false };

export const accountsReducer = createReducer(initialState, (builder) => {
	builder
		.addCase(accountsActions.loadAccounts, (state) => {
			state.isLoaded = false;
			state.isLoading = true;
		})
		.addCase(accountsActions.setAccountsLoading, (state, action) => {
			state.isLoading = action.payload;
		})
		.addCase(accountsActions.setAccounts, (state, action) => {
			state.accounts = action.payload;
			state.isLoaded = true;
			state.isLoading = false;
		});
});
