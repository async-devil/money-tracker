import { createAction } from "@reduxjs/toolkit";

import { GetAccountsByQueryDto } from "src/common/requests/accounts/types/request/get-accounts-by-properties.dto";
import { Account } from "src/common/requests/accounts/types/response/account.entity";

export enum AccountsActionsEnum {
	LOAD_ACCOUNTS = "LOAD_ACCOUNTS",
	SET_ACCOUNTS = "GET_ACCOUNTS",
	SET_ACCOUNTS_LOADING = "SET_ACCOUNTS_LOADING",
}

export const accountsActions = {
	loadAccounts: createAction<GetAccountsByQueryDto>(AccountsActionsEnum.LOAD_ACCOUNTS),
	setAccounts: createAction<Account[]>(AccountsActionsEnum.SET_ACCOUNTS),
	setAccountsLoading: createAction<boolean>(AccountsActionsEnum.SET_ACCOUNTS_LOADING),
};
