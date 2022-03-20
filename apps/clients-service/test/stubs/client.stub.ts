import { CreateClientDto } from "src/dtos/create-client.dto";
import { Client } from "src/entities/client.entity";

export const clientStub = (): Client => {
	return {
		id: "9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d",
		email: "client@example.com",
		password: "Password5@1",
		createDateTime: new Date(1),
		lastChangedDateTime: new Date(1),
	};
};

export const createClientDtoStub = (): CreateClientDto => {
	return {
		email: "client@example.com",
		password: "Password5@1",
	};
};

export const clientStubSecondary = (): Client => {
	return {
		id: "1b9d6bcd-bbfd-4b2d-9b5d-ab8dfbbd4bed",
		email: "client@test.com",
		password: "NotPassword5@1",
		createDateTime: new Date(1),
		lastChangedDateTime: new Date(1),
	};
};

export const createClientDtoStubSecondary = (): CreateClientDto => {
	return {
		email: "client@test.com",
		password: "NotPassword5@1",
	};
};
