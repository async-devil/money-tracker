import { plainToInstance } from "class-transformer";
import { validate, ValidationError } from "class-validator";
import { CreateClientDto } from "src/clients/dtos/create-client.dto";

export function stringified(errors: ValidationError[]): string {
	return JSON.stringify(errors);
}

describe("CreateClientDto", () => {
	it("should be defined", () => {
		expect(CreateClientDto).toBeDefined();
	});

	it("should pass when data is valid", async () => {
		const client = { email: "john@example.com", password: "Password@1" };

		const createClientDto = plainToInstance(CreateClientDto, client);
		const errors = await validate(createClientDto);

		expect(errors.length).toBe(0);
	});

	it("should throw when the password does not match regex", async () => {
		const client = { email: "client@example.com", password: "Password" };

		const createClientDto = plainToInstance(CreateClientDto, client);
		const errors = await validate(createClientDto);

		expect(errors.length).not.toBe(0);
		expect(stringified(errors)).toContain(`password must have`);
	});

	it("should throw when the password does fit in min length", async () => {
		const client = { email: "client@exaple.com", password: "Ll0@" };

		const createClientDto = plainToInstance(CreateClientDto, client);
		const errors = await validate(createClientDto);

		expect(errors.length).not.toBe(0);
		expect(stringified(errors)).toContain(`password must be longer`);
	});

	it("should throw when the password does fit in max length", async () => {
		const client = { email: "client@example.com", password: "Password1@Ute0@e3ev7e" };

		const createClientDto = plainToInstance(CreateClientDto, client);
		const errors = await validate(createClientDto);

		expect(errors.length).not.toBe(0);
		expect(stringified(errors)).toContain(`password must be shorter`);
	});

	it("should throw when the password is not string", async () => {
		const client = { email: "client@exaple.com", password: 2 };

		const createClientDto = plainToInstance(CreateClientDto, client);
		const errors = await validate(createClientDto);

		expect(errors.length).not.toBe(0);
		expect(stringified(errors)).toContain(`password must be a string`);
	});

	it("should throw when the email is invalid", async () => {
		const client = { email: "example.com", password: "Password1@" };

		const createClientDto = plainToInstance(CreateClientDto, client);
		const errors = await validate(createClientDto);

		expect(errors.length).not.toBe(0);
		expect(stringified(errors)).toContain(`email must be an email`);
	});

	it("should throw when the email is invalid", async () => {
		const client = { email: [1], password: "Password1@" };

		const createClientDto = plainToInstance(CreateClientDto, client);
		const errors = await validate(createClientDto);

		expect(errors.length).not.toBe(0);
		expect(stringified(errors)).toContain(`email must be a string`);
	});
});
