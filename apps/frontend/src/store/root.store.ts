import { configureStore, MiddlewareArray } from "@reduxjs/toolkit";
import createSagaMiddleware from "redux-saga";

import rootReducer from "./root.reducer";
import rootSaga from "./root.saga";

const sagaMiddleware = createSagaMiddleware();

export const store = configureStore({
	reducer: rootReducer,
	middleware: new MiddlewareArray().concat(sagaMiddleware),
});

sagaMiddleware.run(rootSaga);

export type RootStateType = ReturnType<typeof store.getState>;
