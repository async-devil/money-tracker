import { Card, Layout } from "antd";
import React from "react";
import { useOutlet } from "react-router-dom";

import HomePageLayout from "src/views/layouts/HomePageLayout";

const DashboardPage = () => {
	const outlet = useOutlet();

	const isRoot = !!outlet;

	return (
		<HomePageLayout>
			<Layout>
				{isRoot ? (
					outlet
				) : (
					<Card>
						<p>Not implemented yet</p>
					</Card>
				)}
			</Layout>
		</HomePageLayout>
	);
};

export default DashboardPage;
