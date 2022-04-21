import { Test, TestingModule } from "@nestjs/testing";
import { getRepositoryToken } from "@nestjs/typeorm";
import { DeleteResult, Repository } from "typeorm";

import { Session } from "src/entities/session.entity";
import { SessionStorageRepository } from "src/modules/sessionStorage/sessionStorage.repository";

import { SessionModel } from "../../mocks/session.repository.mock";
import { sessionStub, sessionStubSecondary } from "../../stubs/session.stub";

describe("Session storage repository service", () => {
	let service: SessionStorageRepository;
	let repository: Repository<Session>;

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			providers: [
				SessionStorageRepository,
				{
					provide: getRepositoryToken(Session),
					useValue: SessionModel,
				},
			],
		}).compile();

		service = module.get<SessionStorageRepository>(SessionStorageRepository);
		repository = module.get<Repository<Session>>(getRepositoryToken(Session));
	});

	afterEach(() => {
		jest.restoreAllMocks();
	});

	test("should be defined", () => {
		expect(service).toBeDefined();
	});

	describe("getSessions method tests", () => {
		test("should get sessions", async () => {
			const testSessions = [
				sessionStub(),
				Object.assign(sessionStubSecondary()),
				{ client_id: sessionStub().client_id },
			];

			jest.spyOn(repository, "find").mockResolvedValueOnce(testSessions);

			const sessions = await service.getSessions({ clientId: sessionStub().client_id });

			expect(sessions).toEqual(testSessions);
		});

		test("should throw default error on unexpected error", async () => {
			jest
				.spyOn(repository, "find")
				.mockRejectedValueOnce(new Error("Database was defeated by the professional book worm"));

			await expect(
				service.getSessions({ clientId: sessionStub().client_id })
			).rejects.toHaveProperty("name", "InternalServerErrorException");
		});
	});

	describe("deleteSessions method tests", () => {
		test("should delete all sessions", async () => {
			jest.spyOn(repository, "delete").mockResolvedValueOnce({} as DeleteResult);

			const result = await service.deleteSessions({ clientId: sessionStub().client_id });

			expect(result).toStrictEqual({});
		});

		test("should throw default error on unexpected error", async () => {
			jest.spyOn(repository, "delete").mockRejectedValueOnce(new Error("Database was here"));

			await expect(
				service.deleteSessions({ clientId: sessionStub().client_id })
			).rejects.toHaveProperty("name", "InternalServerErrorException");
		});
	});
});
