import { all, fork } from "redux-saga/effects";

import { accountsSaga } from "./accounts/accounts.saga";
import { categoriesSaga } from "./categories/categories.saga";
import { transactionsSaga } from "./transactions/transactions.saga";

export default function* uiSaga() {
	yield all([fork(transactionsSaga), fork(categoriesSaga), fork(accountsSaga)]);
}
