import { TestingModule, Test } from "@nestjs/testing";

import { AuthController } from "src/modules/auth/auth.controller";
import { AuthService } from "src/modules/auth/auth.service";
import { SessionService } from "src/modules/session/session.service";
import { AccessTokenService } from "src/services/accessToken.service";

import { AuthServiceMock } from "../../mocks/auth.service.mock";
import { SessionServiceMock } from "../../mocks/session.service.mock";
import {
	createSessionDtoStubSecondary,
	sessionStub,
	sessionStubSecondary,
} from "../../stubs/session.stub";

const ACCESS_TOKEN =
	"eyJhbGciOiJIUzI1NiJ9.eyJjbGllbnRJZCI6IjA5N2Y2MTNmLTkwYjctNDMyNi04MTIxLTkzYzZkNTE4NDVkNiIsImV4cCI6MTY1MDQ2MzAzOCwiaWF0IjoxNjUwNDYxMjM4fQ.wZ5w5ZiEuSUXm3h4MO7YCPPAdvnR8fZE9yzpwXMWn8w";

describe("Auth controller", () => {
	let controller: AuthController;
	let service: AuthService;

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			controllers: [AuthController],
			providers: [
				AccessTokenService,
				{ provide: AuthService, useValue: AuthServiceMock },
				{ provide: SessionService, useValue: SessionServiceMock },
			],
		}).compile();

		controller = module.get<AuthController>(AuthController);
		service = module.get<AuthService>(AuthService);
	});

	afterEach(() => {
		jest.restoreAllMocks();
	});

	test("should be defined", () => {
		expect(controller).toBeDefined();
	});

	describe("generateTokenPair method tests", () => {
		test("should generate token pair", async () => {
			jest.spyOn(service, "generateTokenPair").mockResolvedValueOnce({
				accessToken: ACCESS_TOKEN,
				refreshToken: sessionStubSecondary().refresh_token,
			});

			const result = await controller.generateTokenPair({
				refreshToken: sessionStub().refresh_token,
				tokenData: createSessionDtoStubSecondary(),
			});

			expect(result).toEqual({
				accessToken: ACCESS_TOKEN,
				refreshToken: sessionStubSecondary().refresh_token,
			});
		});
	});

	describe("validateAccessToken method tests", () => {
		test("should validate access token", async () => {
			jest.spyOn(service, "validateAccessToken").mockResolvedValueOnce({ result: true });

			const result = await controller.validateAccessToken({ accessToken: ACCESS_TOKEN });

			expect(result).toEqual({ result: true });
		});
	});
});
