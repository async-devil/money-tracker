import React from "react";
import { createRoot } from "react-dom/client";
import { I18nextProvider } from "react-i18next";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";

import i18n from "./locales";
import reportWebVitals from "./reportWebVitals";
import { store } from "./store/rootStore";
import App from "./views/App";

import "./styles/index.css";
import "./styles/normalize.css";

const root = createRoot(document.getElementById("root") as HTMLElement);

root.render(
	<React.StrictMode>
		<BrowserRouter>
			<Provider store={store}>
				<I18nextProvider i18n={i18n}>
					<App />
				</I18nextProvider>
			</Provider>
		</BrowserRouter>
	</React.StrictMode>
);

reportWebVitals();
