import React from "react";
import styled from "styled-components";

import logo from "./logo.svg";

const AppBlock = styled.div`
	text-align: center;

	header {
		background-color: #282c34;
		min-height: 100vh;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		font-size: calc(10px + 2vmin);
		color: white;

		img {
			height: 40vmin;
			pointer-events: none;
		}

		@media (prefers-reduced-motion: no-preference) {
			img {
				animation: logo-spin infinite 20s linear;
			}
		}
	}

	@keyframes logo-spin {
		from {
			transform: rotate(0deg);
		}
		to {
			transform: rotate(360deg);
		}
	}
`;

const CustomLink = styled.a`
	color: #61dafb;
`;

function App() {
	return (
		<AppBlock>
			<header>
				<img src={logo} alt="logo" />
				<p>
					Edit <code>src/App.tsx</code> and save to reload.
				</p>
				<CustomLink href="https://reactjs.org" target="_blank" rel="noopener noreferrer">
					Learn React
				</CustomLink>
			</header>
		</AppBlock>
	);
}

export default App;
