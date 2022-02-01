import React from "react";

import { render } from "react-dom";

import "./styles/normalize.css";
import "./styles/main.scss";
import { App } from "./App";
import reportWebVitals from "./reportWebVitals";

render(
	<React.StrictMode>
		<App />
	</React.StrictMode>,
	document.getElementById("root")
);

reportWebVitals();
