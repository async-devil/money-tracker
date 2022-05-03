import { Test, TestingModule } from "@nestjs/testing";

import { AppController } from "src/app.controller";
import { AppService } from "src/app.service";

describe("AppController", () => {
	let appController: AppController;

	beforeEach(async () => {
		const app: TestingModule = await Test.createTestingModule({
			controllers: [AppController],
			providers: [AppService],
		}).compile();

		appController = app.get<AppController>(AppController);
	});

	describe("root", () => {
		test('should return pong"', () => {
			expect(appController.ping({ text: "hello there" })).toBe(
				"accounts-service sends hello there"
			);
		});
	});
});
