import { Test, TestingModule } from "@nestjs/testing";
import { getRepositoryToken } from "@nestjs/typeorm";

import { AppController } from "src/app.controller";
import { AppService } from "src/app.service";
import { Client } from "src/entities/client.entity";
import { ClientsRepository } from "src/repositories/clients.repository";

import { ClientModel } from "../mocks/client.repository.mock";

describe("AppController", () => {
	let appController: AppController;

	beforeEach(async () => {
		const app: TestingModule = await Test.createTestingModule({
			controllers: [AppController],
			providers: [
				AppService,
				ClientsRepository,
				{
					provide: getRepositoryToken(Client),
					useValue: ClientModel,
				},
			],
		}).compile();

		appController = app.get<AppController>(AppController);
	});

	describe("root", () => {
		it('should return pong"', () => {
			expect(appController.ping()).toBe("pong");
		});
	});
});
