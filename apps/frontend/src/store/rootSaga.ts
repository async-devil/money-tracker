import { all, fork } from "redux-saga/effects";

import { transactionsSaga } from "./transactions/transactionsSaga";

export default function* rootSaga() {
	yield all([fork(transactionsSaga)]);
}
