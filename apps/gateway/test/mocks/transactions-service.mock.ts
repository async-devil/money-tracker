export const TransactionsServiceMock = {
	ping: jest.fn(),
	create: jest.fn(),
	getById: jest.fn(),
	getByProperties: jest.fn(),
	updateById: jest.fn(),
	deleteById: jest.fn(),
	deleteAllByOwnerId: jest.fn(),
};
