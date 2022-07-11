import { Button, Result } from "antd";
import React from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

const NotFoundPage = () => {
	const { t } = useTranslation();

	return (
		<Result
			status="404"
			title="404"
			subTitle={t("Sorry, the page you visited does not exist.")}
			extra={
				<Button type="primary">
					<Link to="/">{t("Back Home")}</Link>
				</Button>
			}
		/>
	);
};

export default NotFoundPage;
