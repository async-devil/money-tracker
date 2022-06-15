import { TestingModule, Test } from "@nestjs/testing";

import { AccountsService } from "src/modules/accounts-service/accounts-service.service";
import { OperationsRouteController } from "src/modules/accounts-service/routes/operations-route.controller";
import { AuthService } from "src/modules/auth-service/auth-service.service";

import { AccountsServiceMock } from "../../../mocks/accounts-service.mock";
import { AuthServiceMock } from "../../../mocks/auth-service.mock";

describe("Operations route controller tests", () => {
	let service: AccountsService;
	let controller: OperationsRouteController;

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			controllers: [OperationsRouteController],
			providers: [
				{
					provide: AccountsService,
					useValue: AccountsServiceMock,
				},
				{
					provide: AuthService,
					useValue: AuthServiceMock,
				},
			],
		}).compile();

		service = module.get<AccountsService>(AccountsService);
		controller = module.get<OperationsRouteController>(OperationsRouteController);
	});

	afterEach(() => {
		jest.restoreAllMocks();
	});

	test("should be defined", () => {
		expect(controller).toBeDefined();
	});
});
