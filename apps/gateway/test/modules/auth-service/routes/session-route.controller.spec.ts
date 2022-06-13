import { TestingModule, Test } from "@nestjs/testing";

import { AuthService } from "src/modules/auth-service/auth-service.service";
import { SessionRouteController } from "src/modules/auth-service/routes/session-route.controller";

import { AuthServiceMock } from "../../../mocks/auth-service.mock";

describe("Session route controller tests", () => {
	let service: AuthService;
	let controller: SessionRouteController;

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			controllers: [SessionRouteController],
			providers: [
				{
					provide: AuthService,
					useValue: AuthServiceMock,
				},
			],
		}).compile();

		service = module.get<AuthService>(AuthService);
		controller = module.get<SessionRouteController>(SessionRouteController);
	});

	afterEach(() => {
		jest.restoreAllMocks();
	});

	test("should be defined", () => {
		expect(controller).toBeDefined();
	});
});
