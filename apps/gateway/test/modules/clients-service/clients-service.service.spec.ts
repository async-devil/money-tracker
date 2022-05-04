import { Test, TestingModule } from "@nestjs/testing";

import { RequestService } from "src/common/request.service";
import { ClientsService } from "src/modules/clients-service/clients-service.service";

import { RequestServiceMock } from "../../mocks/request.service.mock";

describe("ClientsService service", () => {
	let service: ClientsService;
	let requestService: RequestService;

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			providers: [
				ClientsService,
				{
					provide: RequestService,
					useValue: RequestServiceMock,
				},
				{
					provide: "CLIENTS_SERVICE",
					useValue: jest.fn(),
				},
			],
		}).compile();

		service = module.get<ClientsService>(ClientsService);
		requestService = module.get<RequestService>(RequestService);
	});

	test("should be defined", () => {
		expect(service).toBeDefined();
	});

	test("ping method should call request service", async () => {
		await service.ping("test");

		expect(requestService.sendRequest).toBeCalled();
	});
});
