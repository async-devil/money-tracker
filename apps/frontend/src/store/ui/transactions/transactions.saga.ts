import { PayloadAction } from "@reduxjs/toolkit";
import { AxiosError, AxiosResponse } from "axios";
import { call, put, takeLatest } from "redux-saga/effects";

import { ApiRequests } from "src/common/requests";
import { GetTransactionsByQueryDto } from "src/common/requests/transactions/types/request/get-transactions-by-query.dto";
import { Transaction } from "src/common/requests/transactions/types/response/transaction.entity";
import { HttpException } from "src/common/requests/types/HttpException";

import { miscActions } from "../misc/misc.actions";
import { transactionsActions, TransactionsActionsEnum } from "./transactions.actions";

export function* onSetTransactions(action: PayloadAction<GetTransactionsByQueryDto>) {
	const loadingId = Math.floor(Date.now() * Math.random());

	try {
		yield put(miscActions.addLoading({ id: loadingId, action: action.type }));
		const result: AxiosResponse<Transaction[]> = yield call(() =>
			ApiRequests.transactions.getByQuery(action.payload)
		);

		yield put(transactionsActions.setTransactions(result.data));
	} catch (err) {
		const error = err as AxiosError<HttpException>;

		yield put(miscActions.setError(error.response?.data as HttpException));
	} finally {
		yield put(miscActions.removeLoading(loadingId));
	}
}

export function* transactionsSaga() {
	yield takeLatest(TransactionsActionsEnum.LOAD_TRANSACTIONS, onSetTransactions);
}
