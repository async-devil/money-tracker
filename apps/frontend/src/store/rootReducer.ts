import { combineReducers } from "@reduxjs/toolkit";

import { transactionsReducer } from "./transactions/transactionsReducer";

const rootReducer = combineReducers({ transactions: transactionsReducer });

export default rootReducer;
