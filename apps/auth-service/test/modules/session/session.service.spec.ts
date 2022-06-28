import { TestingModule, Test } from "@nestjs/testing";
import { getRepositoryToken } from "@nestjs/typeorm";
import { DeleteResult, Repository } from "typeorm";

import { Session } from "src/entities/session.entity";
import { SessionRepository } from "src/modules/session/session.repository";
import { SessionService } from "src/modules/session/session.service";
import { RefreshTokenService } from "src/services/refreshToken.service";

import { RefreshTokenMock } from "../../mocks/refreshToken.service.mock";
import { SessionModel } from "../../mocks/session.repository.mock";
import { createSessionDtoStub, sessionStub } from "../../stubs/session.stub";

describe("Session service", () => {
	let service: SessionService;
	let repository: Repository<Session>;
	let refreshTokenService: RefreshTokenService;

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			providers: [
				SessionService,
				SessionRepository,
				{
					provide: RefreshTokenService,
					useValue: RefreshTokenMock,
				},
				{
					provide: getRepositoryToken(Session),
					useValue: SessionModel,
				},
			],
		}).compile();

		service = module.get<SessionService>(SessionService);
		repository = module.get<Repository<Session>>(getRepositoryToken(Session));
		refreshTokenService = module.get<RefreshTokenService>(RefreshTokenService);
	});

	afterEach(() => {
		jest.restoreAllMocks();
	});

	test("should be defined", () => {
		expect(service).toBeDefined();
	});

	describe("createSession method tests", () => {
		test("should create new session", async () => {
			jest.spyOn(repository, "save").mockResolvedValueOnce(sessionStub());
			jest
				.spyOn(refreshTokenService, "getToken")
				.mockResolvedValueOnce(sessionStub().refresh_token);
			jest
				.spyOn(refreshTokenService, "getExpirationDate")
				.mockReturnValueOnce(sessionStub().valid_until);

			const session = await service.createSession(createSessionDtoStub());

			expect(session).toEqual(sessionStub());
		});
	});

	describe("getSessionByToken method tests", () => {
		test("should get session by token", async () => {
			jest.spyOn(repository, "findOne").mockResolvedValueOnce(sessionStub());

			const session = await service.getSessionByToken({
				refreshToken: sessionStub().refresh_token,
			});

			expect(session).toEqual(sessionStub());
		});
	});

	describe("deleteSessionByToken method tests", () => {
		test("should delete session by token", async () => {
			jest.spyOn(repository, "delete").mockResolvedValueOnce({} as DeleteResult);

			const session = await service.deleteSessionByToken({
				refreshToken: sessionStub().refresh_token,
			});

			expect(session).toEqual({});
		});
	});

	describe("getSessionById method tests", () => {
		test("should get session by id", async () => {
			jest.spyOn(repository, "findOne").mockResolvedValueOnce(sessionStub());

			const session = await service.getSessionById({
				id: sessionStub().id,
			});

			expect(session).toEqual(sessionStub());
		});
	});

	describe("deleteSessionById method tests", () => {
		test("should delete session by id", async () => {
			jest.spyOn(repository, "delete").mockResolvedValueOnce({} as DeleteResult);

			const session = await service.deleteSessionById({
				id: sessionStub().id,
			});

			expect(session).toEqual({});
		});
	});

	describe("checkIfTokenIsNotExpired method tests", () => {
		test("should confirm that token is not expired", () => {
			jest.useFakeTimers().setSystemTime(sessionStub().valid_until.getTime() - 1000);

			expect(service.checkIfTokenIsNotExpired(sessionStub())).toBe(true);
		});

		test("should confirm that token is expired", () => {
			jest.useFakeTimers().setSystemTime(sessionStub().valid_until);

			expect(service.checkIfTokenIsNotExpired(sessionStub())).toBe(false);
		});
	});

	describe("getAllSessionsByClientId method tests", () => {
		test("should get all sessions by valid client id", async () => {
			jest.spyOn(repository, "find").mockResolvedValueOnce([sessionStub()]);

			const result = await service.getAllSessionsByClientId({ clientId: sessionStub().client_id });

			expect(result).toEqual([sessionStub()]);
		});
	});

	describe("deleteAllSessionsByClientId method tests", () => {
		test("should delete all sessions by valid client id", async () => {
			const result = await service.deleteAllSessionsByClientId({
				clientId: sessionStub().client_id,
			});

			expect(result).toEqual({});
		});
	});
});
