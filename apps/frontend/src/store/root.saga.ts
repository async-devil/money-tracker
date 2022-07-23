import { all, fork } from "redux-saga/effects";

import uiSaga from "./ui/ui.saga";

export default function* rootSaga() {
	yield all([fork(uiSaga)]);
}
