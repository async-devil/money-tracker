import { Test, TestingModule } from "@nestjs/testing";

import { RequestService } from "src/common/request.service";
import { ClientsController } from "src/modules/clients-service/clients-service.controller";
import { ClientsService } from "src/modules/clients-service/clients-service.service";

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
