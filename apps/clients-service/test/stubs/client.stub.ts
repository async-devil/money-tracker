import { Client } from "src/entities/client.entity";
import { CreateClientDto } from "src/modules/clients/dtos/create-client.dto";

export const clientStub = (): Client => {
	return {
		id: "9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d",
		email: "client@example.com",
		password: "Password5@1",
		create_date_time: new Date(1),
		last_changed_date_time: new Date(1),
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
		create_date_time: new Date(1),
		last_changed_date_time: new Date(1),
	};
};

export const createClientDtoStubSecondary = (): CreateClientDto => {
	return {
		email: "client@test.com",
		password: "NotPassword5@1",
	};
};
