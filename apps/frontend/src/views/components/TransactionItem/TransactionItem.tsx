import { Avatar, Card, CardProps, Col, Divider, Row } from "antd";
import moment from "moment";
import React from "react";
import { GrTransaction } from "react-icons/gr";
import styled from "styled-components";

import CustomIcon from "src/common/components/CustomIcon";
import { Transaction } from "src/common/requests/transactions/types/response/transaction.entity";

import TransactionAmounts from "./TransactionAmounts";

const CustomCard: React.FunctionComponent<CardProps> = styled(Card)`
	width: 504px;

	overflow: hidden;
	text-overflow: ellipsis;
	white-space: nowrap;

	.icon-column {
		align-self: center;
	}

	.currency-column {
		.ant-row {
			justify-content: end;
		}
	}

	.date-column {
		display: flex;

		align-items: center;
		justify-content: center;

		span {
			position: absolute;

			transform: rotate(-90deg);

			font-size: 18px;
		}
	}
`;

const TransactionItem = (props: { transaction: Transaction }) => {
	const { transaction } = props;

	return (
		<CustomCard size="small">
			<Row>
				<Col span={2} className="icon-column">
					<CustomIcon size="large" shape="square" background={undefined} color={undefined}>
						<GrTransaction size={20} />
					</CustomIcon>
				</Col>
				<Col span={1}>
					<Divider type="vertical" style={{ height: "100%" }} />
				</Col>
				<Col span={13}>
					<Row>{`${transaction.to}`}</Row>
					<Row>{`${transaction.from}`}</Row>
				</Col>
				<Col span={6} className="currency-column">
					<TransactionAmounts transaction={transaction} />
				</Col>
				<Col span={1}>
					<Divider type="vertical" style={{ height: "100%" }} />
				</Col>
				<Col span={1} className="date-column">
					<span>{`${moment(transaction.date).format("DD/MM")}`}</span>
				</Col>
			</Row>
		</CustomCard>
	);
};

export default TransactionItem;
