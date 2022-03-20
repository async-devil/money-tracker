import { Test, TestingModule } from "@nestjs/testing";
import { getRepositoryToken } from "@nestjs/typeorm";
import { Repository } from "typeorm";

import { Client } from "src/entities/client.entity";
import { ClientsRepository } from "src/repositories/clients.repository";

import { ClientModel } from "../mocks/client.repository.mock";
import {
	createClientDtoStub,
	createClientDtoStubSecondary,
	clientStub,
	clientStubSecondary,
} from "../stubs/client.stub";

describe("Clients repository service", () => {
	let service: ClientsRepository;
	let repository: Repository<Client>;

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			providers: [
				ClientsRepository,
				{
					provide: getRepositoryToken(Client),
					useValue: ClientModel,
				},
			],
		}).compile();

		service = module.get<ClientsRepository>(ClientsRepository);
		repository = module.get<Repository<Client>>(getRepositoryToken(Client));
	});

	afterEach(() => {
		jest.restoreAllMocks();
	});

	it("should be defined", () => {
		expect(service).toBeDefined();
	});

	describe("getOneByCredential method", () => {
		it("should successfully get one by valid data", async () => {
			jest.spyOn(repository, "findOne").mockResolvedValueOnce(clientStub());

			const client = await service.getOneByCredential({ name: "id", value: clientStub().id });
			expect(client).toEqual(clientStub());
		});

		it("should throw not found if not found one", async () => {
			jest.spyOn(repository, "findOne").mockResolvedValueOnce(undefined);

			await expect(
				service.getOneByCredential({ name: "id", value: clientStub().id })
			).rejects.toHaveProperty("name", "NotFoundException");
		});

		it("should throw internal server error on unknown error", async () => {
			jest
				.spyOn(repository, "findOne")
				.mockImplementationOnce(() => Promise.reject(new Error("Something you don't expect")));

			await expect(
				service.getOneByCredential({ name: "id", value: clientStub().id })
			).rejects.toHaveProperty("name", "InternalServerErrorException");
		});
	});

	describe("create method", () => {
		it("should insert a new one", async () => {
			jest.spyOn(repository, "save").mockImplementationOnce(() => Promise.resolve(clientStub()));

			const client = await service.create(createClientDtoStub());
			expect(client).toEqual(clientStub());
		});
	});

	it("should insert different schemes", async () => {
		jest
			.spyOn(repository, "save")
			.mockImplementationOnce(() => Promise.resolve(clientStub()))
			.mockImplementationOnce(() => Promise.resolve(clientStubSecondary()));

		const client = await service.create(createClientDtoStub());
		expect(client).toEqual(clientStub());

		const clientSecondary = await service.create(createClientDtoStubSecondary());
		expect(clientSecondary).toEqual(clientStubSecondary());
	});

	it("should throw bad request on duplicate scheme", async () => {
		jest
			.spyOn(repository, "save")
			.mockImplementationOnce(() => Promise.resolve(clientStub()))
			.mockImplementationOnce(() =>
				Promise.reject(new Error("duplicate key value violates unique constraint"))
			);

		const client = await service.create(createClientDtoStub());
		expect(client).toEqual(clientStub());

		await expect(service.create(createClientDtoStub())).rejects.toHaveProperty(
			"name",
			"BadRequestException"
		);
	});

	it("should throw internal server error on unknown error", async () => {
		jest
			.spyOn(repository, "save")
			.mockImplementationOnce(() => Promise.reject(new Error("Something you don't expect")));

		await expect(service.create(createClientDtoStub())).rejects.toHaveProperty(
			"name",
			"InternalServerErrorException"
		);
	});
});
