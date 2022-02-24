import { clientStub } from "../stubs/client.stub";

export const ClientsService = jest.fn().mockReturnValue({
	getById: jest.fn().mockResolvedValue(clientStub()),
	getByEmail: jest.fn().mockResolvedValue(clientStub()),
	create: jest.fn().mockResolvedValue(clientStub()),
});
