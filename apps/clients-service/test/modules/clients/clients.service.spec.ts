import { Test, TestingModule } from "@nestjs/testing";
import { getRepositoryToken } from "@nestjs/typeorm";
import { Repository } from "typeorm";

import { Client } from "src/entities/client.entity";
import { ClientsRepository } from "src/modules/clients/clients.repository";
import { ClientsService } from "src/modules/clients/clients.service";

import { ClientModel } from "../../mocks/client.repository.mock";
import {
	createClientDtoStub,
	createClientDtoStubSecondary,
	clientStub,
	clientStubSecondary,
} from "../../stubs/client.stub";

describe("Clients service", () => {
	let service: ClientsService;
	let repository: Repository<Client>;

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			providers: [
				ClientsService,
				ClientsRepository,
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

	test("should be defined", () => {
		expect(service).toBeDefined();
	});

	describe("getById method", () => {
		test("should get a client by id", async () => {
			jest.spyOn(repository, "findOne").mockResolvedValueOnce(clientStub());

			const client = await service.getClientById(clientStub().id);
			expect(client).toEqual(clientStub());
		});

		test("should throw not found on invalid id", async () => {
			jest.spyOn(repository, "findOne").mockResolvedValueOnce(undefined);

			await expect(service.getClientById(clientStub().id)).rejects.toHaveProperty(
				"name",
				"NotFoundException"
			);
		});
	});

	describe("getByEmail method", () => {
		test("should get a client by email", async () => {
			jest.spyOn(repository, "findOne").mockResolvedValueOnce(clientStub());

			const client = await service.getClientByEmail(clientStub().email);
			expect(client).toEqual(clientStub());
		});

		test("should throw not found on invalid email", async () => {
			jest.spyOn(repository, "findOne").mockResolvedValueOnce(undefined);

			await expect(service.getClientByEmail(clientStub().email)).rejects.toHaveProperty(
				"name",
				"NotFoundException"
			);
		});
	});

	describe("create method", () => {
		test("should insert a new client", async () => {
			jest.spyOn(repository, "save").mockImplementationOnce(() => Promise.resolve(clientStub()));

			const client = await service.createClient(createClientDtoStub());
			expect(client).toEqual(clientStub());
		});

		test("should insert different clients", async () => {
			jest
				.spyOn(repository, "save")
				.mockImplementationOnce(() => Promise.resolve(clientStub()))
				.mockImplementationOnce(() => Promise.resolve(clientStubSecondary()));

			const client = await service.createClient(createClientDtoStub());
			expect(client).toEqual(clientStub());

			const clientSecondary = await service.createClient(createClientDtoStubSecondary());
			expect(clientSecondary).toEqual(clientStubSecondary());
		});

		test("should throw bad request on duplicate client", async () => {
			jest
				.spyOn(repository, "save")
				.mockImplementationOnce(() => Promise.resolve(clientStub()))
				.mockImplementationOnce(() =>
					Promise.reject(new Error("duplicate key value violates unique constraint"))
				);

			const client = await service.createClient(createClientDtoStub());
			expect(client).toEqual(clientStub());

			await expect(service.createClient(createClientDtoStub())).rejects.toHaveProperty(
				"name",
				"BadRequestException"
			);
		});

		test("should throw internal server error on unknown error", async () => {
			jest
				.spyOn(repository, "save")
				.mockImplementationOnce(() => Promise.reject(new Error("Something you don't expect")));

			await expect(service.createClient(createClientDtoStub())).rejects.toHaveProperty(
				"name",
				"InternalServerErrorException"
			);
		});
	});
});
