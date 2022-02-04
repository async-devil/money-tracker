import { plainToInstance } from "class-transformer";
import { validate, ValidationError } from "class-validator";
import { CreateUserDto } from "src/users/dto/create-user.dto";

export function stringified(errors: ValidationError[]): string {
	return JSON.stringify(errors);
}

describe("CreateUserDto", () => {
	it("should be defined", () => {
		expect(CreateUserDto).toBeDefined();
	});

	it("should pass when data is valid", async () => {
		const user = { email: "john@example.com", password: "Password@1" };

		const createUserDto = plainToInstance(CreateUserDto, user);
		const errors = await validate(createUserDto);

		expect(errors.length).toBe(0);
	});

	it("should throw when the password does not match regex", async () => {
		const user = { email: "user@example.com", password: "Password" };

		const createUserDto = plainToInstance(CreateUserDto, user);
		const errors = await validate(createUserDto);

		expect(errors.length).not.toBe(0);
		expect(stringified(errors)).toContain(`password must have`);
	});

	it("should throw when the password does fit in min length", async () => {
		const user = { email: "user@exaple.com", password: "Ll0@" };

		const createUserDto = plainToInstance(CreateUserDto, user);
		const errors = await validate(createUserDto);

		expect(errors.length).not.toBe(0);
		expect(stringified(errors)).toContain(`password must be longer`);
	});

	it("should throw when the password does fit in max length", async () => {
		const user = { email: "user@example.com", password: "Password1@Ute0@e3ev7e" };

		const createUserDto = plainToInstance(CreateUserDto, user);
		const errors = await validate(createUserDto);

		expect(errors.length).not.toBe(0);
		expect(stringified(errors)).toContain(`password must be shorter`);
	});

	it("should throw when the password is not string", async () => {
		const user = { email: "user@exaple.com", password: 2 };

		const createUserDto = plainToInstance(CreateUserDto, user);
		const errors = await validate(createUserDto);

		expect(errors.length).not.toBe(0);
		expect(stringified(errors)).toContain(`password must be a string`);
	});

	it("should throw when the email is invalid", async () => {
		const user = { email: "example.com", password: "Password1@" };

		const createUserDto = plainToInstance(CreateUserDto, user);
		const errors = await validate(createUserDto);

		expect(errors.length).not.toBe(0);
		expect(stringified(errors)).toContain(`email must be an email`);
	});

	it("should throw when the email is invalid", async () => {
		const user = { email: [1], password: "Password1@" };

		const createUserDto = plainToInstance(CreateUserDto, user);
		const errors = await validate(createUserDto);

		expect(errors.length).not.toBe(0);
		expect(stringified(errors)).toContain(`email must be a string`);
	});
});
