import { Test, TestingModule } from "@nestjs/testing";
import { getRepositoryToken } from "@nestjs/typeorm";
import { ClientsService } from "src/clients/clients.service";
import { Client } from "src/clients/models/client.entity";
import { ErrorsService } from "src/errors/errors.service";
import { DuplicationException } from "src/errors/exceptions";
import { Repository } from "typeorm";

import { ClientModel } from "./mocks/client.repository.mock";
import {
	createClientDtoStub,
	createClientDtoStubSecondary,
	clientStub,
	clientStubSecondary,
} from "./stubs/client.stub";

describe("ClientsService", () => {
	let service: ClientsService;
	let repository: Repository<Client>;

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			providers: [
				ClientsService,
				ErrorsService,
				{
					provide: getRepositoryToken(Client),
					useValue: ClientModel,
				},
			],
		}).compile();

		service = module.get<ClientsService>(ClientsService);
		repository = module.get<Repository<Client>>(getRepositoryToken(Client));
	});

	afterEach(() => {
		jest.restoreAllMocks();
	});

	it("should be defined", () => {
		expect(service).toBeDefined();
	});

	describe("getById method", () => {
		it("should get a client by id", async () => {
			jest.spyOn(repository, "findOne").mockResolvedValueOnce(clientStub());

			const client = await service.getById(clientStub().id);
			expect(client).toEqual(clientStub());
		});

		it("should throw on not found id", async () => {
			jest.spyOn(repository, "findOne").mockResolvedValueOnce(undefined);

			await expect(service.getById(clientStub().id)).rejects.toHaveProperty("message", "Not Found");
		});
	});

	describe("getByEmail method", () => {
		it("should get a client by email", async () => {
			jest.spyOn(repository, "findOne").mockResolvedValueOnce(clientStub());

			const client = await service.getByEmail(clientStub().email);
			expect(client).toEqual(clientStub());
		});

		it("should throw on not found email", async () => {
			jest.spyOn(repository, "findOne").mockResolvedValueOnce(undefined);

			await expect(service.getByEmail(clientStub().email)).rejects.toHaveProperty(
				"message",
				"Not Found"
			);
		});
	});

	describe("create method", () => {
		it("should insert a new client", async () => {
			jest.spyOn(repository, "save").mockImplementationOnce(() => Promise.resolve(clientStub()));

			const client = await service.create(createClientDtoStub());
			expect(client).toEqual(clientStub());
		});
	});

	it("should insert different clients", async () => {
		jest
			.spyOn(repository, "save")
			.mockImplementationOnce(() => Promise.resolve(clientStub()))
			.mockImplementationOnce(() => Promise.resolve(clientStubSecondary()));

		const client = await service.create(createClientDtoStub());
		expect(client).toEqual(clientStub());

		const clientSecondary = await service.create(createClientDtoStubSecondary());
		expect(clientSecondary).toEqual(clientStubSecondary());
	});

	it("should throw on duplicate client", async () => {
		jest
			.spyOn(repository, "save")
			.mockImplementationOnce(() => Promise.resolve(clientStub()))
			.mockImplementationOnce(() => Promise.reject(new DuplicationException()));

		const client = await service.create(createClientDtoStub());
		expect(client).toEqual(clientStub());

		await expect(service.create(createClientDtoStub())).rejects.toHaveProperty(
			"message",
			"Duplicate error"
		);
	});
});
