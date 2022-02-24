import { Test, TestingModule } from "@nestjs/testing";
import { ErrorsService } from "src/errors/errors.service";

describe("ErrorsService", () => {
	let service: ErrorsService;

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			providers: [ErrorsService],
		}).compile();

		service = module.get<ErrorsService>(ErrorsService);
	});

	it("should be defined", () => {
		expect(service).toBeDefined();
	});

	it("checkDuplicationError should call spy function", () => {
		const callback = jest.fn();

		service.checkDuplicationError(new Error("E11000 duplicate key error collection"), callback);

		expect(callback).toBeCalled();
	});

	it("checkDuplicationError should not call spy function", () => {
		const callback = jest.fn();

		service.checkDuplicationError(new Error("Error"), callback);

		expect(callback).not.toBeCalled();
	});

	it("checkDuplicationError should throw without callback function", () => {
		const func = () => {
			service.checkDuplicationError(new Error("E11000 duplicate key error collection"));
		};

		expect(func).toThrow("Duplicate error");
	});

	it("throwDefaultError error message should match mock one", () => {
		const error = new Error("Mock");

		const func = () => {
			service.throwDefaultError(error);
		};
		expect(func).toThrow("Mock");
	});

	it("throwNotFoundError should throw", () => {
		const func = () => service.throwNotFoundError();

		expect(func).toThrow("Not Found");
	});

	it("throwDuplicationError should throw", () => {
		const func = () => service.throwDuplicationError();
		expect(func).toThrow("Duplicate error");
	});

	it("throwInvalidCredentialsError should throw", () => {
		const func = () => service.throwInvalidCredentialsError();

		expect(func).toThrow("Invalid credentials");
	});

	it("throwUnauthorizedError should throw", () => {
		const func = () => service.throwUnauthorizedError();

		expect(func).toThrow("Unauthorized");
	});
});
