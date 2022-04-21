import { Session } from "src/entities/session.entity";
import { CreateSessionDto } from "src/modules/session/dtos/createSession.dto";

export const dateStub = 1649969640364;

export const sessionStub = (properties: Partial<Session> = {}): Session => {
	return Object.assign(
		{
			refresh_token: "b4d72d7e7ca77bc8221f81083fc24c5ec11f3dfe446bf521",
			client_id: "123e4567-e89b-12d3-a456-426655440000",
			valid_until: new Date(dateStub + 1000),
			ip: "57.37.103.24",
			device: "Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:99.0)",
			create_date_time: new Date(dateStub),
			last_changed_date_time: new Date(dateStub),
		},
		properties
	);
};

export const sessionStubSecondary = (properties: Partial<Session> = {}): Session => {
	return Object.assign(
		{
			refresh_token: "1ed72d7e7ca77bc8221f81083fc24c5ec11f3dfe446bf535",
			client_id: "319e4567-e89b-12d3-a456-426655440000",
			valid_until: new Date(dateStub + 1000),
			ip: "157.37.13.2",
			device: "Chrome/5.0 (Windows NT 10.0; Win64; x64; rv:99.0)",
			create_date_time: new Date(dateStub),
			last_changed_date_time: new Date(dateStub),
		},
		properties
	);
};

export const createSessionDtoStub = (
	properties: Partial<CreateSessionDto> = {}
): CreateSessionDto => {
	return Object.assign(
		{
			clientId: "123e4567-e89b-12d3-a456-426655440000",
			ip: "57.37.103.24",
			device: "Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:99.0)",
		},
		properties
	);
};

export const createSessionDtoStubSecondary = (
	properties: Partial<CreateSessionDto> = {}
): CreateSessionDto => {
	return Object.assign(
		{
			clientId: "319e4567-e89b-12d3-a456-426655440000",
			ip: "157.37.13.2",
			device: "Chrome/5.0 (Windows NT 10.0; Win64; x64; rv:99.0)",
		},
		properties
	);
};
