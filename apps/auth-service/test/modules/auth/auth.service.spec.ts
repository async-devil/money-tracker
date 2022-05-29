import { NotFoundException } from "@nestjs/common";
import { TestingModule, Test } from "@nestjs/testing";

import { AuthService } from "src/modules/auth/auth.service";
import { SessionService } from "src/modules/session/session.service";
import { AccessTokenService } from "src/services/accessToken.service";

import { AccessTokenServiceMock } from "../../mocks/accessToken.service.mock";
import { SessionServiceMock } from "../../mocks/session.service.mock";
import { sessionStub, sessionStubSecondary } from "../../stubs/session.stub";

const ACCESS_TOKEN =
	"eyJhbGciOiJIUzI1NiJ9.eyJjbGllbnRJZCI6IjA5N2Y2MTNmLTkwYjctNDMyNi04MTIxLTkzYzZkNTE4NDVkNiIsImV4cCI6MTY1MDQ2MzAzOCwiaWF0IjoxNjUwNDYxMjM4fQ.wZ5w5ZiEuSUXm3h4MO7YCPPAdvnR8fZE9yzpwXMWn8w";

describe("Auth service", () => {
	let service: AuthService;
	let sessionService: SessionService;
	let accessTokenService: AccessTokenService;

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			providers: [
				AuthService,
				{ provide: SessionService, useValue: SessionServiceMock },
				{
					provide: AccessTokenService,
					useValue: AccessTokenServiceMock,
				},
			],
		}).compile();

		service = module.get<AuthService>(AuthService);
		sessionService = module.get<SessionService>(SessionService);
		accessTokenService = module.get<AccessTokenService>(AccessTokenService);
	});

	afterEach(() => {
		jest.restoreAllMocks();
	});

	test("should be defined", () => {
		expect(service).toBeDefined();
	});

	describe("generateTokenPair method tests", () => {
		test("should return token pair on valid data", async () => {
			jest.spyOn(sessionService, "getSessionByToken").mockResolvedValue(sessionStub());
			jest.spyOn(sessionService, "checkIfTokenIsNotExpired").mockReturnValueOnce(true);

			jest.spyOn(accessTokenService, "signJwt").mockResolvedValueOnce(ACCESS_TOKEN);
			jest
				.spyOn(sessionService, "createSession")
				.mockResolvedValueOnce(sessionStubSecondary({ client_id: sessionStub().client_id }));

			const tokens = await service.generateTokenPair({
				refreshToken: sessionStub().refresh_token,
				ip: sessionStubSecondary().ip,
				device: sessionStubSecondary().device,
			});

			expect(tokens).toEqual({
				accessToken: ACCESS_TOKEN,
				refreshToken: sessionStubSecondary().refresh_token,
			});
		});

		test("should throw not found error on non existing session", async () => {
			jest
				.spyOn(sessionService, "getSessionByToken")
				.mockRejectedValueOnce(new NotFoundException("Session not found"));

			await expect(
				service.generateTokenPair({
					refreshToken: sessionStub().refresh_token,
					ip: sessionStubSecondary().ip,
					device: sessionStubSecondary().device,
				})
			).rejects.toHaveProperty("name", "NotFoundException");
		});

		test("should throw unauthorized error on expired session", async () => {
			jest.spyOn(sessionService, "getSessionByToken").mockResolvedValue(sessionStub());
			jest.spyOn(sessionService, "checkIfTokenIsNotExpired").mockReturnValueOnce(false);

			await expect(
				service.generateTokenPair({
					refreshToken: sessionStub().refresh_token,
					ip: sessionStubSecondary().ip,
					device: sessionStubSecondary().device,
				})
			).rejects.toHaveProperty("name", "UnauthorizedException");
		});
	});

	describe("validateAccessToken method tests", () => {
		test("should return true on valid access token", async () => {
			jest.spyOn(accessTokenService, "isValidJwt").mockResolvedValueOnce(true);

			const result = await service.validateAccessToken({
				accessToken: ACCESS_TOKEN,
			});

			expect(result).toEqual({ result: true });
		});

		test("should return false on invalid access token", async () => {
			jest.spyOn(accessTokenService, "isValidJwt").mockResolvedValueOnce(false);

			const result = await service.validateAccessToken({
				accessToken: ACCESS_TOKEN,
			});

			expect(result).toEqual({ result: false });
		});
	});

	describe("getAccessTokenExpirationDate method tests", () => {
		test("should return valid date on valid access token", async () => {
			const mockDate = new Date();

			jest.spyOn(accessTokenService, "getJwtData").mockResolvedValueOnce({
				payload: { exp: mockDate.getTime() / 1000 },
				protectedHeader: { alg: "HS256" },
			});

			const { result } = await service.getAccessTokenExpirationDate({ accessToken: ACCESS_TOKEN });

			expect(result).toEqual(mockDate);
		});
	});
});
