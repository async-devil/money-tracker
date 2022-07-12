import { PayloadAction } from "@reduxjs/toolkit";
import { AxiosError, AxiosResponse } from "axios";
import { call, put, takeLatest } from "redux-saga/effects";

import { ApiRequests } from "src/common/requests";
import { GetTransactionsByQueryDto } from "src/common/requests/transactions/types/request/get-transactions-by-query.dto";
import { Transaction } from "src/common/requests/transactions/types/response/transaction.entity";
import { HttpException } from "src/common/requests/types/HttpException";

import { transactionsActions, TransactionsActionsEnum } from "./transactionsActions";

export function* onGetTransactions(action: PayloadAction<GetTransactionsByQueryDto>) {
	try {
		const result: AxiosResponse<Transaction[]> = yield call(() =>
			ApiRequests.transactions.getByQuery(action.payload)
		);

		yield put(transactionsActions.getTransactionsSuccess(result.data));
	} catch (err) {
		const error = err as AxiosError<HttpException>;

		yield put(transactionsActions.getTransactionsFailure(error.response?.data as HttpException));
	}
}

export function* transactionsSaga() {
	yield takeLatest(TransactionsActionsEnum.GET_TRANSACTIONS_REQUEST, onGetTransactions);
}
