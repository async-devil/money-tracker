import { TestingModule, Test } from "@nestjs/testing";

import { AccountsService } from "src/modules/accounts-service/accounts-service.service";
import { AccountsRouteController } from "src/modules/accounts-service/routes/accounts-route.controller";
import { AuthService } from "src/modules/auth-service/auth-service.service";
import { TransactionsOperationsService } from "src/modules/transactions-service/services/transactions-operations.service";

import { AccountsServiceMock } from "../../../mocks/accounts-service.mock";
import { AuthServiceMock } from "../../../mocks/auth-service.mock";
import { TransactionsOperationsServiceMock } from "../../../mocks/transactions-operations.service.mock";

describe("Accounts route controller tests", () => {
	let service: AccountsService;
	let controller: AccountsRouteController;

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			controllers: [AccountsRouteController],
			providers: [
				{
					provide: AccountsService,
					useValue: AccountsServiceMock,
				},
				{
					provide: AuthService,
					useValue: AuthServiceMock,
				},
				{
					provide: TransactionsOperationsService,
					useValue: TransactionsOperationsServiceMock,
				},
			],
		}).compile();

		service = module.get<AccountsService>(AccountsService);
		controller = module.get<AccountsRouteController>(AccountsRouteController);
	});

	afterEach(() => {
		jest.restoreAllMocks();
	});

	test("should be defined", () => {
		expect(controller).toBeDefined();
	});
});
