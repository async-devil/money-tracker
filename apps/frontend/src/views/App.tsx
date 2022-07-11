import React, { lazy } from "react";
import { Route, Routes } from "react-router-dom";

import HomePage from "./pages/Home/HomePage";

const NotFoundPage = lazy(() => import("./pages/NotFound/NotFoundPage"));

const App = () => {
	return (
		<Routes>
			<Route path="/" element={<HomePage />} />
			<Route path="*" element={<NotFoundPage />} />
		</Routes>
	);
};

export default App;
