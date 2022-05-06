import { Test, TestingModule } from "@nestjs/testing";

import { AppService } from "src/app.service";

describe("App service", () => {
	let service: AppService;

	beforeEach(async () => {
		const app: TestingModule = await Test.createTestingModule({
			providers: [AppService],
		}).compile();

		service = app.get<AppService>(AppService);
	});

	afterEach(() => {
		jest.restoreAllMocks();
	});

	test("should be defined", () => {
		expect(service).toBeDefined();
	});

	test('ping method should return pong"', () => {
		expect(service.ping("hi")).toBe("clients-service sends hi");
	});
});
