import { TestingModule, Test } from "@nestjs/testing";

import { RequestService } from "src/common/request.service";
import { AccountsService } from "src/modules/accounts-service/accounts-service.service";

import { RequestServiceMock } from "../../mocks/request.service.mock";

describe("AccountsService service", () => {
	let service: AccountsService;
	let requestService: RequestService;

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			providers: [
				AccountsService,
				{
					provide: RequestService,
					useValue: RequestServiceMock,
				},
				{
					provide: "ACCOUNTS_SERVICE",
					useValue: jest.fn(),
				},
			],
		}).compile();

		service = module.get<AccountsService>(AccountsService);
		requestService = module.get<RequestService>(RequestService);
	});

	afterEach(() => {
		jest.restoreAllMocks();
	});

	test("should be defined", () => {
		expect(service).toBeDefined();
	});

	test("ping method should call request service", async () => {
		await service.ping("test");

		expect(requestService.sendRequest).toBeCalled();
	});
});
