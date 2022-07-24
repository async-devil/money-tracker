import { createAction } from "@reduxjs/toolkit";

import { GetTransactionsByQueryDto } from "src/common/requests/transactions/types/request/get-transactions-by-query.dto";
import { Transaction } from "src/common/requests/transactions/types/response/transaction.entity";

export enum TransactionsActionsEnum {
	LOAD_TRANSACTIONS = "LOAD_TRANSACTIONS",
	SET_TRANSACTIONS = "GET_TRANSACTIONS",
}

export const transactionsActions = {
	loadTransactions: createAction<GetTransactionsByQueryDto>(
		TransactionsActionsEnum.LOAD_TRANSACTIONS
	),
	setTransactions: createAction<Transaction[]>(TransactionsActionsEnum.SET_TRANSACTIONS),
};
