import { Test, TestingModule } from "@nestjs/testing";

import { AppController } from "src/app.controller";
import { AppService } from "src/app.service";
import { AccessTokenService } from "src/services/accessToken.service";
import { RefreshTokenService } from "src/services/refreshToken.service";

describe("AppController", () => {
	let appController: AppController;

	beforeEach(async () => {
		const app: TestingModule = await Test.createTestingModule({
			controllers: [AppController],
			providers: [AppService, AccessTokenService, RefreshTokenService],
		}).compile();

		appController = app.get<AppController>(AppController);
	});

	describe("root", () => {
		it('should return pong"', () => {
			expect(appController.ping()).toBe("pong");
		});
	});
});
