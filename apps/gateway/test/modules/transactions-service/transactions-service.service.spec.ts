import { TestingModule, Test } from "@nestjs/testing";

import { RequestService } from "src/common/request.service";
import { TransactionsService } from "src/modules/transactions-service/transactions-service.service";

import { RequestServiceMock } from "../../mocks/request.service.mock";

describe("TransactionsService service", () => {
	let service: TransactionsService;
	let requestService: RequestService;

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			providers: [
				TransactionsService,
				{
					provide: RequestService,
					useValue: RequestServiceMock,
				},
				{
					provide: "TRANSACTIONS_SERVICE",
					useValue: jest.fn(),
				},
			],
		}).compile();

		service = module.get<TransactionsService>(TransactionsService);
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
