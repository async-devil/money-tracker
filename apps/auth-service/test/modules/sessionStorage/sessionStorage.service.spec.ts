import { TestingModule, Test } from "@nestjs/testing";
import { getRepositoryToken } from "@nestjs/typeorm";
import { Repository } from "typeorm";

import { Session } from "src/entities/session.entity";
import { SessionStorageRepository } from "src/modules/sessionStorage/sessionStorage.repository";
import { SessionStorageService } from "src/modules/sessionStorage/sessionStorage.service";

import { SessionModel } from "../../mocks/session.repository.mock";
import { sessionStub } from "../../stubs/session.stub";

describe("Session storage service", () => {
	let service: SessionStorageService;
	let repository: Repository<Session>;

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			providers: [
				SessionStorageService,
				SessionStorageRepository,
				{
					provide: getRepositoryToken(Session),
					useValue: SessionModel,
				},
			],
		}).compile();

		service = module.get<SessionStorageService>(SessionStorageService);
		repository = module.get<Repository<Session>>(getRepositoryToken(Session));
	});

	afterEach(() => {
		jest.restoreAllMocks();
	});

	test("should be defined", () => {
		expect(service).toBeDefined();
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
