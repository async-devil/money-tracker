export const AuthServiceMock = {
	ping: jest.fn(),
	createSession: jest.fn(),
	deleteSessionByToken: jest.fn(),
	getAllSessionsByClientId: jest.fn(),
	deleteAllSessionsByClientId: jest.fn(),
	validateAccessToken: jest.fn(),
	generateTokenPair: jest.fn(),
};
