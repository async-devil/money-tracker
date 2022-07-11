import { Avatar, Card, CardProps, Col, Row } from "antd";
import React from "react";
import { GrTransaction } from "react-icons/gr";
import styled from "styled-components";

import { Transaction } from "src/common/requests/transactions/types/response/transaction.entity";

const CustomCard: React.FunctionComponent<CardProps> = styled(Card)`
	width: 500px;
`;

const TransactionItem = (props: { transaction: Transaction }) => {
	const { transaction } = props;

	return (
		<CustomCard>
			<Row>
				<Col span={3}>
					<Avatar size="large" shape="square">
						<GrTransaction />
					</Avatar>
				</Col>
				<Col span={21}>
					<Row>
						<Col span={19}>{`${transaction.to}`}</Col>
						<Col span={5}>{`${transaction.amount_to}${transaction.currency_to}`}</Col>
					</Row>
					<Row>{`${new Date(transaction.date).toLocaleDateString()}`}</Row>
				</Col>
			</Row>
		</CustomCard>
	);
};

export default TransactionItem;
