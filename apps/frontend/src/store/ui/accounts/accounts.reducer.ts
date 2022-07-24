import { createReducer } from "@reduxjs/toolkit";

import { Account } from "src/common/requests/accounts/types/response/account.entity";

import { accountsActions } from "./accounts.actions";

export type AccountsStateType = {
	accounts: Account[];
};

const initialState: AccountsStateType = { accounts: [] };

export const accountsReducer = createReducer(initialState, (builder) => {
	builder.addCase(accountsActions.setAccounts, (state, action) => {
		state.accounts = action.payload;
	});
});
