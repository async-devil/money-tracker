import { TestingModule, Test } from "@nestjs/testing";

import { RequestService } from "src/common/request.service";
import { AuthService } from "src/modules/auth-service/auth-service.service";

import { RequestServiceMock } from "../..//mocks/request.service.mock";

describe("AuthService service", () => {
	let service: AuthService;
	let requestService: RequestService;

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			providers: [
				AuthService,
				{
					provide: RequestService,
					useValue: RequestServiceMock,
				},
				{
					provide: "AUTH_SERVICE",
					useValue: jest.fn(),
				},
			],
		}).compile();

		service = module.get<AuthService>(AuthService);
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
