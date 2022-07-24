import { PayloadAction } from "@reduxjs/toolkit";
import { AxiosError, AxiosResponse } from "axios";
import { call, put, takeLatest } from "redux-saga/effects";

import { ApiRequests } from "src/common/requests";
import { GetAccountsByQueryDto } from "src/common/requests/accounts/types/request/get-accounts-by-properties.dto";
import { Account } from "src/common/requests/accounts/types/response/account.entity";
import { HttpException } from "src/common/requests/types/HttpException";

import { miscActions } from "../misc/misc.actions";
import { accountsActions, AccountsActionsEnum } from "./accounts.actions";

export function* onLoadAccounts(action: PayloadAction<GetAccountsByQueryDto>) {
	const loadingId = Math.floor(Date.now() * Math.random());

	try {
		yield put(miscActions.addLoading({ id: loadingId, action: action.type }));

		const result: AxiosResponse<Account[]> = yield call(() =>
			ApiRequests.accounts.getByQuery(action.payload)
		);

		yield put(accountsActions.setAccounts(result.data));
	} catch (err) {
		const error = err as AxiosError<HttpException>;

		yield put(miscActions.setError(error.response?.data as HttpException));
	} finally {
		yield put(miscActions.removeLoading(loadingId));
	}
}

export function* accountsSaga() {
	yield takeLatest(AccountsActionsEnum.LOAD_ACCOUNTS, onLoadAccounts);
}
