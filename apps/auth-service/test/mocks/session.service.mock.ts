export const SessionServiceMock = {
	createSession: jest.fn(),
	getSessionByToken: jest.fn(),
	deleteSessionByToken: jest.fn(),
	checkIfTokenIsNotExpired: jest.fn(),
	getAllSessionsByClientId: jest.fn(),
	deleteAllSessionsByClientId: jest.fn(),
};
