import React, { useEffect } from "react";
import { connect, ConnectedProps } from "react-redux";

import { GetTransactionsByQueryDto } from "src/common/requests/transactions/types/request/get-transactions-by-query.dto";
import { RootStateType } from "src/store/rootStore";
import { transactionsActions } from "src/store/transactions/transactionsActions";

import TransactionItem from "./TransactionItem/TransactionItem";

const mapState = (state: RootStateType) => ({
	transactions: state.transactions,
});

const connector = connect(mapState, transactionsActions);

type ReduxProps = ConnectedProps<typeof connector>;

interface Props extends ReduxProps {
	query: GetTransactionsByQueryDto;
}

const TransactionsList = (props: Props) => {
	useEffect(() => {
		props.getTransactionsRequest(props.query);
	}, []);

	const transactions = [...props.transactions.transactions];

	return (
		<div>
			{transactions.map((transaction) => (
				<TransactionItem transaction={transaction} key={transaction.id}></TransactionItem>
			))}
		</div>
	);
};

export default connector(TransactionsList);
