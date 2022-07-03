/* eslint-disable sonarjs/no-duplicate-string */
import { CreateTransactionDto } from "src/modules/transactions-service/types/request/create-transaction.dto";
import {
	Transaction,
	TransactionType,
} from "src/modules/transactions-service/types/response/transaction.entity";

import { accountStub, accountStubSecondary } from "./account.stub";
import { categoryStub, categoryStubSecondary } from "./category.stub";

export const dateStub = 1649969640364;

export const transactionStub = (properties: Partial<Transaction> = {}): Transaction => {
	return Object.assign(
		{
			id: "9eb45847-145e-49fc-8362-c2ab986479a4",
			owner: "a90a4365-3a6f-4bda-b1ad-9d9bdbc904fb",
			type: TransactionType.RECHARGE,
			date: new Date(dateStub).toISOString(),
			from: categoryStub().id,
			to: accountStub().id,
			amount_from: "1000",
			amount_to: "1000",
			currency_from: "USD",
			currency_to: "USD",
		},
		properties
	);
};

export const transactionStubSecondary = (properties: Partial<Transaction> = {}): Transaction => {
	return Object.assign(
		{
			id: "7ad59d29-6e3d-4d5f-ba59-3fa27b8ff017",
			owner: "a90a4365-3a6f-4bda-b1ad-9d9bdbc904fb",
			type: TransactionType.WITHDRAW,
			date: new Date(dateStub).toISOString(),
			from: accountStubSecondary().id,
			to: categoryStubSecondary().id,
			amount_from: "223.42",
			amount_to: "223.42",
			currency_from: "UAH",
			currency_to: "UAH",
		},
		properties
	);
};

export const transactionStubTertiary = (properties: Partial<Transaction> = {}): Transaction => {
	return Object.assign(
		{
			id: "33c33f88-7253-49c8-97f5-1f34f0b933f6",
			owner: "a90a4365-3a6f-4bda-b1ad-9d9bdbc904fb",
			type: TransactionType.TRANSFER,
			date: new Date(dateStub).toISOString(),
			from: accountStubSecondary().id,
			to: accountStub().id,
			amount_from: "200",
			amount_to: "6.84",
			currency_from: "UAH",
			currency_to: "USD",
		},
		properties
	);
};

export const createTransactionStub = (): CreateTransactionDto => {
	return Object.assign(
		{
			owner: "a90a4365-3a6f-4bda-b1ad-9d9bdbc904fb",
			type: TransactionType.RECHARGE,
			date: new Date(dateStub).toISOString(),
			from: categoryStub().id,
			to: accountStub().id,
			amount_from: "1000",
			amount_to: "1000",
			currency_from: "USD",
			currency_to: "USD",
		},
		{}
	);
};

export const createTransactionStubSecondary = (): CreateTransactionDto => {
	return Object.assign(
		{
			owner: "a90a4365-3a6f-4bda-b1ad-9d9bdbc904fb",
			type: TransactionType.WITHDRAW,
			date: new Date(dateStub).toISOString(),
			from: accountStubSecondary().id,
			to: categoryStubSecondary().id,
			amount_from: "223.42",
			amount_to: "223.42",
			currency_from: "UAH",
			currency_to: "UAH",
		},
		{}
	);
};

export const createTransactionStubTertiary = (): CreateTransactionDto => {
	return Object.assign(
		{
			owner: "a90a4365-3a6f-4bda-b1ad-9d9bdbc904fb",
			type: TransactionType.TRANSFER,
			date: new Date(dateStub).toISOString(),
			from: accountStubSecondary().id,
			to: accountStub().id,
			amount_from: "200",
			amount_to: "6.84",
			currency_from: "UAH",
			currency_to: "USD",
		},
		{}
	);
};
