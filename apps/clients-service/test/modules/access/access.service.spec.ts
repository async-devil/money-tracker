/* eslint-disable @typescript-eslint/no-unused-vars */
import { NotFoundException } from "@nestjs/common";
import { TestingModule, Test } from "@nestjs/testing";
import * as bcrypt from "bcrypt";

import { AccessService } from "src/modules/access/access.service";
import { ClientsService } from "src/modules/clients/clients.service";

import { ClientsServiceMock } from "../../mocks/clients.service.mock";
import { clientStub, createClientDtoStub } from "../../stubs/client.stub";

describe("Access service", () => {
	let service: AccessService;
	let clientsService: ClientsService;

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			providers: [
				AccessService,
				{
					provide: ClientsService,
					useValue: ClientsServiceMock,
				},
			],
		}).compile();

		service = module.get<AccessService>(AccessService);
		clientsService = module.get<ClientsService>(ClientsService);
	});

	afterEach(() => {
		jest.restoreAllMocks();
	});

	test("should be defined", () => {
		expect(service).toBeDefined();
	});

	describe("validateClientCredentials method tests", () => {
		test("should return true on valid client credentials", async () => {
			jest.spyOn(clientsService, "getClientByEmail").mockResolvedValueOnce(clientStub());
			jest.spyOn(bcrypt, "compare").mockImplementationOnce((_a: string, _b: string) => true);

			const result = await service.validateClientCredentials(createClientDtoStub());
			expect(result).toStrictEqual({ result: true });
		});

		test("should throw UnathorizedException on non found email", async () => {
			jest.spyOn(clientsService, "getClientByEmail").mockRejectedValueOnce(new NotFoundException());

			await expect(service.validateClientCredentials(createClientDtoStub())).rejects.toHaveProperty(
				"name",
				"UnauthorizedException"
			);
		});

		test("should throw UnathorizedException on non valid password", async () => {
			jest.spyOn(clientsService, "getClientByEmail").mockResolvedValueOnce(clientStub());
			jest.spyOn(bcrypt, "compare").mockImplementationOnce((_a: string, _b: string) => false);

			await expect(service.validateClientCredentials(createClientDtoStub())).rejects.toHaveProperty(
				"name",
				"UnauthorizedException"
			);
		});
	});
});
