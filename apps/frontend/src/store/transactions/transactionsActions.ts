import { createAction } from "@reduxjs/toolkit";

import { Transaction } from "src/common/requests/transactions/types/response/transaction.entity";
import { HttpException } from "src/common/requests/types/HttpException";

export enum TransactionsActionsEnum {
	GET_TRANSACTIONS_REQUEST = "GET_TRANSACTIONS_REQUEST",
	GET_TRANSACTIONS_SUCCESS = "GET_TRANSACTIONS_SUCCESS",
	GET_TRANSACTIONS_FAILURE = "GET_TRANSACTIONS_FAILURE",
}

export const transactionsActions = {
	getTransactionsRequest: createAction(TransactionsActionsEnum.GET_TRANSACTIONS_REQUEST),
	getTransactionsSuccess: createAction<Transaction[]>(
		TransactionsActionsEnum.GET_TRANSACTIONS_SUCCESS
	),
	getTransactionsFailure: createAction<HttpException>(
		TransactionsActionsEnum.GET_TRANSACTIONS_FAILURE
	),
};
