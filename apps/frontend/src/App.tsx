import { Card, CardProps, Layout } from "antd";
import React from "react";
import styled from "styled-components";

import logo from "./logo.svg";

const CustomCard: React.FunctionComponent<CardProps> = styled(Card)`
	text-align: center;

	img {
		height: 40vmin;
		pointer-events: none;
	}

	@media (prefers-reduced-motion: no-preference) {
		img {
			animation: logo-spin infinite 20s linear;
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
		<Layout>
			<CustomCard title="Hello there!">
				<img src={logo} alt="logo" />
				<p>
					Edit <code>src/App.tsx</code> and save to reload.
				</p>
				<CustomLink href="https://reactjs.org" target="_blank" rel="noopener noreferrer">
					Learn React
				</CustomLink>
			</CustomCard>
		</Layout>
	);
}

export default App;
