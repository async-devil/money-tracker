import { Test, TestingModule } from "@nestjs/testing";

import { ClientsService } from "src/clients-service/clients-service.service";
import { RequestService } from "src/common/request.service";

describe("ClientsService", () => {
	let service: ClientsService;

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			providers: [ClientsService, RequestService, { provide: "CLIENTS_SERVICE", useValue: {} }],
		}).compile();

		service = module.get<ClientsService>(ClientsService);
	});

	test("should be defined", () => {
		expect(service).toBeDefined();
	});
});
