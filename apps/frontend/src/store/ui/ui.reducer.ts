import { combineReducers } from "@reduxjs/toolkit";

import { accountsReducer } from "./accounts/accounts.reducer";
import { categoriesReducer } from "./categories/categories.reducer";
import { transactionsReducer } from "./transactions/transactions.reducer";

const uiReducer = combineReducers({
	transactions: transactionsReducer,
	categories: categoriesReducer,
	accounts: accountsReducer,
});

export default uiReducer;
