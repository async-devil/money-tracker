import { TestingModule, Test } from "@nestjs/testing";
import { getRepositoryToken } from "@nestjs/typeorm";

import { Session } from "src/entities/session.entity";
import { SessionStorageController } from "src/modules/sessionStorage/sessionStorage.controller";
import { SessionStorageRepository } from "src/modules/sessionStorage/sessionStorage.repository";
import { SessionStorageService } from "src/modules/sessionStorage/sessionStorage.service";

import { SessionModel } from "../../mocks/session.repository.mock";
import { SessionStorageServiceMock } from "../../mocks/sessionStorage.service.mock";
import { sessionStub } from "../../stubs/session.stub";

describe("Session storage controller", () => {
	let controller: SessionStorageController;
	let session: SessionStorageService;

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			controllers: [SessionStorageController],
			providers: [
				SessionStorageRepository,
				{
					provide: SessionStorageService,
					useValue: SessionStorageServiceMock,
				},
				{
					provide: getRepositoryToken(Session),
					useValue: SessionModel,
				},
			],
		}).compile();

		controller = module.get<SessionStorageController>(SessionStorageController);
		session = module.get<SessionStorageService>(SessionStorageService);
	});

	afterEach(() => {
		jest.restoreAllMocks();
	});

	test("should be defined", () => {
		expect(controller).toBeDefined();
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
