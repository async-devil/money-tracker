import { AxiosError, AxiosResponse } from "axios";
import { call, put, takeLatest } from "redux-saga/effects";

import { ApiRequests } from "src/common/requests";
import { Transaction } from "src/common/requests/transactions/types/response/transaction.entity";
import { HttpException } from "src/common/requests/types/HttpException";

import { transactionsActions, TransactionsActionsEnum } from "./transactionsActions";

export function* onGetTransactions() {
	try {
		const result: AxiosResponse<Transaction[]> = yield call(() =>
			ApiRequests.transactions.getByQuery({})
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
