import { Row } from "antd";
import React from "react";
import styled from "styled-components";

import {
	Transaction,
	TransactionType,
} from "src/common/requests/transactions/types/response/transaction.entity";

const CustomRow = styled(Row)<{ type: TransactionType; secondary?: boolean }>`
	color: #${(props) => {
			switch (props.type) {
				case TransactionType.RECHARGE:
					return "52c41a";

				case TransactionType.WITHDRAW:
					return "f5222d";

				case TransactionType.TRANSFER:
					return "bfbfbf";
			}
		}}${(props) => (props.secondary ? 80 : "")};

	font-size: ${(props) => (props.secondary ? "inherit" : "16px")};

	&:before {
		content: "${(props) => {
			switch (props.type) {
				case TransactionType.RECHARGE:
					return "+";
				case TransactionType.WITHDRAW:
					return "-";
				case TransactionType.TRANSFER:
					return "";
			}
		}}";
	}
`;

const TransactionAmounts = (props: { transaction: Transaction }) => {
	const { transaction } = props;

	const amountFrom = { amount: transaction.amount_from, currency: transaction.currency_from };
	const amountTo = { amount: transaction.amount_to, currency: transaction.currency_to };

	const amountList =
		transaction.type !== TransactionType.WITHDRAW ? [amountTo, amountFrom] : [amountFrom, amountTo];

	const isAmountEqual =
		amountFrom.amount === amountTo.amount && amountFrom.currency === amountTo.currency;

	const rowData = (amount: string, currency: string) => {
		return `${parseFloat(amount)} ${currency}`;
	};

	return (
		<>
			<CustomRow type={transaction.type}>
				{rowData(amountList[0].amount, amountList[0].currency)}
			</CustomRow>
			{!isAmountEqual ? (
				<CustomRow type={transaction.type} secondary={true}>
					{rowData(amountList[1].amount, amountList[1].currency)}
				</CustomRow>
			) : null}
		</>
	);
};

export default TransactionAmounts;
