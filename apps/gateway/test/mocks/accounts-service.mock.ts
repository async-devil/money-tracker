export const AccountsServiceMock = {
	ping: jest.fn(),
	createAccount: jest.fn(),
	getAccountById: jest.fn(),
	getAccountsByProperties: jest.fn(),
	updateAccountById: jest.fn(),
	deleteAccountById: jest.fn(),
	deleteAllAccountsByOwnerId: jest.fn(),
};
