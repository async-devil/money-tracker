import { TestingModule, Test } from "@nestjs/testing";
import { getRepositoryToken } from "@nestjs/typeorm";

import { Session } from "src/entities/session.entity";
import { SessionController } from "src/modules/session/session.controller";
import { SessionRepository } from "src/modules/session/session.repository";
import { SessionService } from "src/modules/session/session.service";
import { RefreshTokenService } from "src/services/refreshToken.service";

import { SessionModel } from "../../mocks/session.repository.mock";
import { SessionServiceMock } from "../../mocks/session.service.mock";
import { createSessionDtoStub, sessionStub } from "../../stubs/session.stub";

describe("Session controller", () => {
	let controller: SessionController;
	let session: SessionService;

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			controllers: [SessionController],
			providers: [
				SessionRepository,
				RefreshTokenService,
				{ provide: SessionService, useValue: SessionServiceMock },
				{
					provide: getRepositoryToken(Session),
					useValue: SessionModel,
				},
			],
		}).compile();

		controller = module.get<SessionController>(SessionController);
		session = module.get<SessionService>(SessionService);
	});

	afterEach(() => {
		jest.restoreAllMocks();
	});

	test("should be defined", () => {
		expect(controller).toBeDefined();
	});

	describe("createSession method tests", () => {
		test("should create session", async () => {
			jest.spyOn(session, "createSession").mockResolvedValueOnce(sessionStub());

			const result = await controller.createSession(createSessionDtoStub());

			expect(result).toEqual(sessionStub());
		});
	});

	describe("getSessionById method tests", () => {
		test("should get session", async () => {
			jest.spyOn(session, "getSessionById").mockResolvedValueOnce(sessionStub());

			const result = await controller.getSessionById({
				id: sessionStub().id,
			});

			expect(result).toEqual(sessionStub());
		});
	});

	describe("deleteSessionById method tests", () => {
		test("should delete session", async () => {
			jest.spyOn(session, "deleteSessionById").mockResolvedValueOnce({});

			const result = await controller.deleteSessionById({
				id: sessionStub().id,
			});

			expect(result).toEqual({});
		});
	});

	describe("getAllSessionsByClientId method tests", () => {
		test("should get all sessions", async () => {
			jest.spyOn(session, "getAllSessionsByClientId").mockResolvedValueOnce([sessionStub()]);

			const result = await controller.getAllSessionsByClientId({
				clientId: sessionStub().client_id,
			});

			expect(result).toEqual([sessionStub()]);
		});
	});

	describe("deleteAllSessionsByClientId method tests", () => {
		test("should delete all sessions", async () => {
			jest.spyOn(session, "deleteAllSessionsByClientId").mockResolvedValueOnce({});

			const result = await controller.deleteAllSessionsByClientId({
				clientId: sessionStub().client_id,
			});

			expect(result).toEqual({});
		});
	});
});
