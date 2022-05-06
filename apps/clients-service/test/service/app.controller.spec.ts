import { Test, TestingModule } from "@nestjs/testing";

import { AppController } from "src/app.controller";
import { AppService } from "src/app.service";

describe("App controller", () => {
	let controller: AppController;

	beforeEach(async () => {
		const app: TestingModule = await Test.createTestingModule({
			controllers: [AppController],
			providers: [AppService],
		}).compile();

		controller = app.get<AppController>(AppController);
	});

	afterEach(() => {
		jest.restoreAllMocks();
	});

	test("should be defined", () => {
		expect(controller).toBeDefined();
	});

	test('ping method should return pong"', () => {
		expect(controller.ping({ text: "hi" })).toBe("clients-service sends hi");
	});
});
