import { Test, TestingModule } from "@nestjs/testing";

import { ClientsController } from "src/clients-service/clients-service.controller";
import { ClientsService } from "src/clients-service/clients-service.service";
import { RequestService } from "src/common/request.service";

describe("ClientsController", () => {
	let controller: ClientsController;

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			controllers: [ClientsController],
			providers: [ClientsService, RequestService, { provide: "CLIENTS_SERVICE", useValue: {} }],
		}).compile();

		controller = module.get<ClientsController>(ClientsController);
	});

	test("should be defined", () => {
		expect(controller).toBeDefined();
	});
});
