import { Layout } from "antd";
import React from "react";

const { Header, Content } = Layout;

const HomePageLayout = (props: { children: React.ReactNode }) => {
	return (
		<Layout style={{ minHeight: "100vh" }}>
			<Header></Header>
			<Content>{props.children}</Content>
		</Layout>
	);
};

export default HomePageLayout;
