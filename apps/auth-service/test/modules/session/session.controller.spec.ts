import { TestingModule, Test } from "@nestjs/testing";
import { getRepositoryToken } from "@nestjs/typeorm";

import { Session } from "src/entities/session.entity";
import { SessionController } from "src/modules/session/session.controller";
import { SessionRepository } from "src/modules/session/session.repository";
import { SessionService } from "src/modules/session/session.service";
import { RefreshTokenService } from "src/services/refreshToken.service";

import { RefreshTokenMock } from "../../mocks/refreshToken.service.mock";
import { SessionModel } from "../../mocks/session.repository.mock";
import { SessionServiceMock } from "../../mocks/session.service.mock";

describe("Session controller", () => {
	let controller: SessionController;

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			controllers: [SessionController],
			providers: [
				SessionRepository,
				{ provide: SessionService, useValue: SessionServiceMock },
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

		controller = module.get<SessionController>(SessionController);
	});

	afterEach(() => {
		jest.restoreAllMocks();
	});

	test("should be defined", () => {
		expect(controller).toBeDefined();
	});
});
