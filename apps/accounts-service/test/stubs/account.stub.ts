import { Account, AccountType } from "src/entities/account.entity";
export const dateStub = 1649969640364;

export const accountStub = (properties: Partial<Account> = {}): Account => {
	return Object.assign(
		{
			id: "123e4567-e89a-12d3-a456-426655440000",
			owner: "123e4567-e89b-12d3-a456-426655440000",
			type: AccountType.REGULAR,
			name: "Regular account",
			currency: "USD",
			balance: 1.35,
			notes: "This is an account",
			icon_name: "MoreHoriz",
			icon_color: "A6A6A6",
			create_date_time: new Date(dateStub),
			last_changed_date_time: new Date(dateStub),
		},
		properties
	);
};

export const accountStubSecondary = (properties: Partial<Account> = {}): Account => {
	return Object.assign(
		{
			id: "123e4567-e89a-12d3-a456-426655440000",
			owner: "319e4567-e89b-12d3-a456-426655440000",
			type: AccountType.DEBT,
			name: "Bank debt",
			currency: "EUR",
			balance: -353.45,
			icon_name: "MoreVert",
			icon_color: "A3A5A3",
			create_date_time: new Date(dateStub),
			last_changed_date_time: new Date(dateStub),
		},
		properties
	);
};

export const createAccountStub = () => {
	return Object.assign(
		{
			owner: "123e4567-e89b-12d3-a456-426655440000",
			type: AccountType.REGULAR,
			name: "Regular account",
			currency: "USD",
			balance: 1.35,
			notes: "This is an account",
		},
		{}
	);
};

export const createAccountStubSecondary = () => {
	return Object.assign(
		{
			owner: "319e4567-e89b-12d3-a456-426655440000",
			type: AccountType.DEBT,
			name: "Bank debt",
			currency: "EUR",
			balance: -353.45,
			icon_name: "MoreVert",
			icon_color: "A3A5A3",
		},
		{}
	);
};
