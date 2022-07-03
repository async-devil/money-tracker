/* eslint-disable sonarjs/no-duplicate-string */
import { Account, AccountType } from "src/modules/accounts-service/types/response/account.entity";

export const dateStub = 1649969640364;

export const accountStub = (properties: Partial<Account> = {}): Account => {
	return Object.assign(
		{
			id: "17fe724d-e8b0-4a7b-b581-56c363a6474a",
			owner: "a90a4365-3a6f-4bda-b1ad-9d9bdbc904fb",
			type: AccountType.SAVINGS,
			name: "Bank account",
			currency: "USD",
			balance: "979.48000000",
			notes: null,
			icon_name: "MoreHoriz",
			icon_color: "A6A6A6",
		},
		properties
	);
};

export const accountStubSecondary = (properties: Partial<Account> = {}): Account => {
	return Object.assign(
		{
			id: "271a0008-3d8a-416f-942c-591d21da1b5f",
			owner: "a90a4365-3a6f-4bda-b1ad-9d9bdbc904fb",
			type: AccountType.REGULAR,
			name: "Cash",
			currency: "UAH",
			balance: "4900.00000000",
			notes: "This in my wallet",
			icon_name: "MoreHoriz",
			icon_color: "A6A6A6",
		},
		properties
	);
};

export const createAccountStub = () => {
	return Object.assign(
		{
			owner: "a90a4365-3a6f-4bda-b1ad-9d9bdbc904fb",
			type: AccountType.SAVINGS,
			name: "Bank account",
			currency: "USD",
			balance: "979.48000000",
		},
		{}
	);
};

export const createAccountStubSecondary = () => {
	return Object.assign(
		{
			owner: "a90a4365-3a6f-4bda-b1ad-9d9bdbc904fb",
			type: AccountType.REGULAR,
			name: "Cash",
			currency: "UAH",
			balance: "4900.00000000",
			notes: "This in my wallet",
		},
		{}
	);
};
