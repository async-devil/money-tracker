/* eslint-disable sonarjs/no-duplicate-string */
import { Test, TestingModule } from "@nestjs/testing";
import { getRepositoryToken } from "@nestjs/typeorm";
import { DeleteResult, Repository } from "typeorm";

import { Session } from "src/entities/session.entity";
import { SessionRepository } from "src/modules/session/session.repository";

import { SessionModel } from "../../mocks/session.repository.mock";
import { createSessionDtoStub, sessionStub, sessionStubSecondary } from "../../stubs/session.stub";

describe("Session repository service", () => {
	let service: SessionRepository;
	let repository: Repository<Session>;

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			providers: [
				SessionRepository,
				{
					provide: getRepositoryToken(Session),
					useValue: SessionModel,
				},
			],
		}).compile();

		service = module.get<SessionRepository>(SessionRepository);
		repository = module.get<Repository<Session>>(getRepositoryToken(Session));
	});

	afterEach(() => {
		jest.restoreAllMocks();
	});

	test("should be defined", () => {
		expect(service).toBeDefined();
	});

	describe("getOneByCredential method tests", () => {
		test("should successfully get one by valid data", async () => {
			jest.spyOn(repository, "findOne").mockResolvedValueOnce(sessionStub());

			const session = await service.getOneByCredential({
				name: "refresh_token",
				value: sessionStub().refresh_token,
			});
			expect(session).toEqual(sessionStub());
		});

		test("should throw not found if not found one", async () => {
			jest.spyOn(repository, "findOne").mockResolvedValueOnce(undefined);

			await expect(
				service.getOneByCredential({
					name: "refresh_token",
					value: sessionStub().refresh_token,
				})
			).rejects.toHaveProperty("name", "NotFoundException");
		});

		test("should throw default error on unexpected error", async () => {
			jest
				.spyOn(repository, "findOne")
				.mockRejectedValueOnce(new Error("Database was corrupted by pirates in Australia"));

			await expect(
				service.getOneByCredential({
					name: "refresh_token",
					value: sessionStub().refresh_token,
				})
			).rejects.toHaveProperty("name", "InternalServerErrorException");
		});
	});

	describe("save method tests", () => {
		test("should insert new session", async () => {
			jest.spyOn(repository, "save").mockResolvedValueOnce(sessionStub());

			const session = await service.save(
				Object.assign(new Session(), {
					refresh_token: sessionStub().refresh_token,
					valid_until: sessionStub().valid_until,
					...createSessionDtoStub(),
				})
			);

			expect(session).toEqual(sessionStub());
		});

		test("should update session", async () => {
			const updatedStub = () => Object.assign(sessionStub(), { ip: sessionStubSecondary().ip });

			jest
				.spyOn(repository, "save")
				.mockResolvedValueOnce(sessionStub())
				.mockResolvedValueOnce(updatedStub());

			await service.save(sessionStub());

			const session = await service.save(updatedStub());

			expect(session).toEqual(updatedStub());
		});

		test("should throw duplicate error on duplicate session", async () => {
			jest
				.spyOn(repository, "save")
				.mockResolvedValueOnce(sessionStub())
				.mockRejectedValueOnce(new Error("duplicate key value violates unique constraint"));

			await service.save(sessionStub());

			await expect(
				service.save(
					Object.assign(sessionStubSecondary(), { refresh_token: sessionStub().refresh_token })
				)
			).rejects.toHaveProperty("name", "BadRequestException");
		});

		test("should throw default error on unexpected error", async () => {
			jest
				.spyOn(repository, "save")
				.mockRejectedValueOnce(new Error("Database was robbed by the large spiders"));

			await expect(service.save(sessionStub())).rejects.toHaveProperty(
				"name",
				"InternalServerErrorException"
			);
		});
	});

	describe("delete method tests", () => {
		test("should successfully delete session", async () => {
			jest.spyOn(repository, "delete").mockResolvedValueOnce({} as DeleteResult);

			const result = await service.deleteOneByCredential({
				name: "refresh_token",
				value: sessionStub().refresh_token,
			});

			expect(result).toStrictEqual({});
		});

		test("should throw default error on unexpected error", async () => {
			jest
				.spyOn(repository, "delete")
				.mockRejectedValueOnce(new Error("Database was but no longer"));

			await expect(
				service.deleteOneByCredential({
					name: "refresh_token",
					value: sessionStub().refresh_token,
				})
			).rejects.toHaveProperty("name", "InternalServerErrorException");
		});
	});

	describe("getSessions method tests", () => {
		test("should get sessions", async () => {
			const testSessions = [
				sessionStub(),
				Object.assign(sessionStubSecondary()),
				{ client_id: sessionStub().client_id },
			];

			jest.spyOn(repository, "find").mockResolvedValueOnce(testSessions);

			const sessions = await service.getAll({ clientId: sessionStub().client_id });

			expect(sessions).toEqual(testSessions);
		});

		test("should throw default error on unexpected error", async () => {
			jest
				.spyOn(repository, "find")
				.mockRejectedValueOnce(new Error("Database was defeated by the professional book worm"));

			await expect(service.getAll({ clientId: sessionStub().client_id })).rejects.toHaveProperty(
				"name",
				"InternalServerErrorException"
			);
		});
	});

	describe("deleteSessions method tests", () => {
		test("should delete all sessions", async () => {
			jest.spyOn(repository, "delete").mockResolvedValueOnce({} as DeleteResult);

			const result = await service.deleteAll({ clientId: sessionStub().client_id });

			expect(result).toStrictEqual({});
		});

		test("should throw default error on unexpected error", async () => {
			jest.spyOn(repository, "delete").mockRejectedValueOnce(new Error("Database was here"));

			await expect(service.deleteAll({ clientId: sessionStub().client_id })).rejects.toHaveProperty(
				"name",
				"InternalServerErrorException"
			);
		});
	});
});
