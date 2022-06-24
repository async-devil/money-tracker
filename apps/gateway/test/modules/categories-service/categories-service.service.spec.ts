import { TestingModule, Test } from "@nestjs/testing";

import { RequestService } from "src/common/request.service";
import { CategoriesService } from "src/modules/categories-service/categories-service.service";

import { RequestServiceMock } from "../../mocks/request.service.mock";

describe("CategoriesService service", () => {
	let service: CategoriesService;
	let requestService: RequestService;

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			providers: [
				CategoriesService,
				{
					provide: RequestService,
					useValue: RequestServiceMock,
				},
				{
					provide: "CATEGORIES_SERVICE",
					useValue: jest.fn(),
				},
			],
		}).compile();

		service = module.get<CategoriesService>(CategoriesService);
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
