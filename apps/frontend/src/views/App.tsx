import React, { lazy } from "react";
import { Route, Routes } from "react-router-dom";

import DashboardPage from "./pages/Dashboard/DashboardPage";
import TransactionsPage from "./pages/Dashboard/Transactions/TransactionsPage";
import HomePage from "./pages/Home/HomePage";

const NotFoundPage = lazy(() => import("./pages/NotFound/NotFoundPage"));

const App = () => {
	return (
		<Routes>
			<Route path="/" element={<HomePage />} />
			<Route path="/dashboard" element={<DashboardPage />}>
				<Route path="/dashboard/transactions" element={<TransactionsPage />} />
			</Route>
			<Route path="*" element={<NotFoundPage />} />
		</Routes>
	);
};

export default App;
