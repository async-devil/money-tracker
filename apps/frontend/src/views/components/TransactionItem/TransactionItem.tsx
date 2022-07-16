import { Card, CardProps, Col, Divider, Row, Tag } from "antd";
import moment from "moment";
import React from "react";
import { MdLocationOn } from "react-icons/md";
import { TbNotes } from "react-icons/tb";
import styled from "styled-components";

import CustomIcon from "src/common/components/CustomIcon";
import VariableIcon from "src/common/components/VariableIcon";
import { Transaction } from "src/common/requests/transactions/types/response/transaction.entity";
import { getColorByBackground } from "src/common/utils";

import TransactionAmounts from "./TransactionAmounts";

const CustomCard: React.FunctionComponent<CardProps> = styled(Card)`
	max-width: 504px;

	font-size: 16px;

	.icon-column {
		align-self: center;
	}

	.divider-column {
		div {
			height: 100%;
		}
	}

	.ant-row {
		text-overflow: ellipsis;
		overflow: hidden;
		white-space: nowrap;
	}

	.from-row {
		font-size: 14px;
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

	.ant-tag {
		display: inline-flex;

		align-items: center;
	}
`;

const TransactionItem = (props: { transaction: Transaction }) => {
	const { transaction } = props;

	const backgroundColor = "#9e074b";
	const color = getColorByBackground(backgroundColor);

	return (
		<CustomCard size="small">
			<Row>
				<Col span={2} className="icon-column">
					<CustomIcon size="large" shape="square" background={`${backgroundColor}`} color={color}>
						<VariableIcon name="iconNameTo" size="20" />
					</CustomIcon>
				</Col>
				<Col span={1} className="divider-column">
					<Divider type="vertical" />
				</Col>
				<Col span={19} className="main-column">
					<Row>
						<Col span={17}>
							<Row>{transaction.to}</Row>
							<Row className="from-row">
								<span>
									<VariableIcon name="iconNameFrom" />
									&nbsp; {transaction.from}
								</span>
							</Row>
						</Col>
						<Col span={7} className="currency-column">
							<TransactionAmounts transaction={transaction} />
						</Col>
					</Row>
					{(transaction.notes || transaction.location) && (
						<Row>
							{transaction.location && (
								<Tag icon={<MdLocationOn size="15" />}>&nbsp;{transaction.location}</Tag>
							)}
							{transaction.notes && (
								<Tag icon={<TbNotes size="15" />}>&nbsp;{transaction.notes}</Tag>
							)}
						</Row>
					)}
				</Col>
				<Col span={1} className="divider-column">
					<Divider type="vertical" />
				</Col>
				<Col span={1} className="date-column">
					<span>{`${moment(transaction.date).format("DD/MM")}`}</span>
				</Col>
			</Row>
		</CustomCard>
	);
};

export default TransactionItem;
