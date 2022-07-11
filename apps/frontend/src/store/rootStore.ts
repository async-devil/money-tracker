import { configureStore, MiddlewareArray } from "@reduxjs/toolkit";
import createSagaMiddleware from "redux-saga";

import rootReducer from "./rootReducer";
import rootSaga from "./rootSaga";

const sagaMiddleware = createSagaMiddleware();

export const store = configureStore({
	reducer: rootReducer,
	middleware: new MiddlewareArray().concat(sagaMiddleware),
});

sagaMiddleware.run(rootSaga);

export type RootStateType = ReturnType<typeof store.getState>;
