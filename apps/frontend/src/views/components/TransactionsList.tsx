import React, { useEffect } from "react";
import { connect, ConnectedProps } from "react-redux";

import { RootStateType } from "src/store/rootStore";
import { transactionsActions } from "src/store/transactions/transactionsActions";

import TransactionItem from "./TransactionItem";

const mapState = (state: RootStateType) => ({
	transactions: state.transactions,
});

const connector = connect(mapState, transactionsActions);

type ReduxProps = ConnectedProps<typeof connector>;

const TransactionsList = (props: ReduxProps) => {
	useEffect(() => {
		props.getTransactionsRequest();
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
