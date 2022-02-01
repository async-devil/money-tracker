import React, { useEffect, useState } from "react";

import axios from "axios";
import styled from "styled-components";

const StyledText = styled.h1<{ error?: boolean }>`
	color: ${(props) => (props.error ? "#CA3E47" : "#47ca3e")};
`;

export const App = () => {
	const [error, setError] = useState<null | { message: string }>(null);
	const [isLoaded, setIsLoaded] = useState(false);
	const [result, setResult] = useState("");

	useEffect(() => {
		const getText = async () => {
			try {
				const res = await axios.get("/api");
				setIsLoaded(true);
				setResult(res.data as string);
			} catch (err) {
				setIsLoaded(true);
				setError(err as { message: string });
			}
		};

		void getText();
	}, []);

	return (
		<div id="app">
			<h1>Hello there!</h1>
			<p>
				This is a test page, if <b>this</b> text and backend status are green, when everything is
				working!
			</p>
			<div className="app__backend-status">
				<StyledText error={!!error}>
					{isLoaded ? (error ? error.message : result) : "Loading..."}
				</StyledText>
				<p>Should be: &quot;Backend is working&quot;</p>
			</div>
		</div>
	);
};

export default App;
