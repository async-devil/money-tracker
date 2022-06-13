import { TestingModule, Test } from "@nestjs/testing";

import { AuthService } from "src/modules/auth-service/auth-service.service";
import { AuthRouteController } from "src/modules/auth-service/routes/auth-route.controller";
import { ClientsService } from "src/modules/clients-service/clients-service.service";

import { AuthServiceMock } from "../../../mocks/auth-service.mock";
import { ClientsServiceMock } from "../../../mocks/clients-service.mock";

describe("Auth route controller tests", () => {
	let service: AuthService;
	let controller: AuthRouteController;

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			controllers: [AuthRouteController],
			providers: [
				{
					provide: AuthService,
					useValue: AuthServiceMock,
				},
				{
					provide: ClientsService,
					useValue: ClientsServiceMock,
				},
			],
		}).compile();

		service = module.get<AuthService>(AuthService);
		controller = module.get<AuthRouteController>(AuthRouteController);
	});

	afterEach(() => {
		jest.restoreAllMocks();
	});

	test("should be defined", () => {
		expect(controller).toBeDefined();
	});
});
