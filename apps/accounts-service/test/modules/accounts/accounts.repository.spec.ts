/* eslint-disable sonarjs/no-duplicate-string */
import { Test, TestingModule } from "@nestjs/testing";
import { getRepositoryToken } from "@nestjs/typeorm";
import { DeleteResult, Repository } from "typeorm";

import { Account } from "src/entities/account.entity";
import { AccountsRepository } from "src/modules/accounts/accounts.repository";

import { AccountModel } from "../../mocks/account.model.mock";
import { accountStub, accountStubSecondary, createAccountStub } from "../../stubs/account.stub";

describe("Accounts repository service", () => {
	let service: AccountsRepository;
	let repository: Repository<Account>;

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			providers: [
				AccountsRepository,
				{
					provide: getRepositoryToken(Account),
					useValue: AccountModel,
				},
			],
		}).compile();

		service = module.get<AccountsRepository>(AccountsRepository);
		repository = module.get<Repository<Account>>(getRepositoryToken(Account));
	});

	afterEach(() => {
		jest.restoreAllMocks();
	});

	test("should be defined", () => {
		expect(service).toBeDefined();
	});

	describe("getOneByCredential method tests", () => {
		test("should successfully get one by valid data", async () => {
			jest.spyOn(repository, "findOne").mockResolvedValueOnce(accountStub());

			const account = await service.getOneByProperty({ id: accountStub().id });
			expect(account).toEqual(accountStub());
		});

		test("should throw not found if not found one", async () => {
			jest.spyOn(repository, "findOne").mockResolvedValueOnce(undefined);

			await expect(service.getOneByProperty({ id: accountStub().id })).rejects.toHaveProperty(
				"name",
				"NotFoundException"
			);
		});

		test("should throw default error on unexpected error", async () => {
			jest
				.spyOn(repository, "findOne")
				.mockRejectedValueOnce(new Error("Database was corrupted by pirates in Australia"));

			await expect(service.getOneByProperty({ id: accountStub().id })).rejects.toHaveProperty(
				"name",
				"InternalServerErrorException"
			);
		});
	});

	describe("save method tests", () => {
		test("should insert new one", async () => {
			jest.spyOn(repository, "save").mockResolvedValueOnce(accountStub());

			const session = await service.save(Object.assign(new Account(), createAccountStub()));

			expect(session).toEqual(accountStub());
		});

		test("should update account", async () => {
			const updatedStub = () =>
				Object.assign(accountStub(), { balance: accountStubSecondary().balance });

			jest
				.spyOn(repository, "save")
				.mockResolvedValueOnce(accountStub())
				.mockResolvedValueOnce(updatedStub());

			await service.save(accountStub());

			const account = await service.save(updatedStub());

			expect(account).toEqual(updatedStub());
		});

		test("should throw duplicate error on duplicate account", async () => {
			jest
				.spyOn(repository, "save")
				.mockResolvedValueOnce(accountStub())
				.mockRejectedValueOnce(new Error("duplicate key value violates unique constraint"));

			await service.save(accountStub());

			await expect(
				service.save(Object.assign(accountStubSecondary(), { id: accountStub().id }))
			).rejects.toHaveProperty("name", "BadRequestException");
		});

		test("should throw default error on unexpected error", async () => {
			jest
				.spyOn(repository, "save")
				.mockRejectedValueOnce(new Error("Database was robbed by the large spiders"));

			await expect(service.save(accountStub())).rejects.toHaveProperty(
				"name",
				"InternalServerErrorException"
			);
		});
	});

	describe("delete method tests", () => {
		test("should successfully delete account", async () => {
			jest.spyOn(repository, "delete").mockResolvedValueOnce({} as DeleteResult);

			const result = await service.deleteOneByProperty({ id: accountStub().id });

			expect(result).toStrictEqual({});
		});

		test("should throw default error on unexpected error", async () => {
			jest
				.spyOn(repository, "delete")
				.mockRejectedValueOnce(new Error("Database was but no longer"));

			await expect(service.deleteOneByProperty({ id: accountStub().id })).rejects.toHaveProperty(
				"name",
				"InternalServerErrorException"
			);
		});
	});

	describe("getManyByProperties method tests", () => {
		test("should get many accounts", async () => {
			const testAccounts = [accountStub(), accountStubSecondary()];

			jest.spyOn(repository, "find").mockResolvedValueOnce(testAccounts);

			const accounts = await service.getManyByProperties({ owner: accountStub().owner });

			expect(accounts).toEqual(testAccounts);
		});

		test("should throw default error on unexpected error", async () => {
			jest
				.spyOn(repository, "find")
				.mockRejectedValueOnce(new Error("Database was defeated by the professional book worm"));

			await expect(
				service.getManyByProperties({ owner: accountStub().owner })
			).rejects.toHaveProperty("name", "InternalServerErrorException");
		});
	});

	describe("deleteManyByProperties method tests", () => {
		test("should delete all sessions", async () => {
			jest.spyOn(repository, "delete").mockResolvedValueOnce({} as DeleteResult);

			const result = await service.deleteManyByProperties({ owner: accountStub().owner });

			expect(result).toStrictEqual({});
		});

		test("should throw default error on unexpected error", async () => {
			jest.spyOn(repository, "delete").mockRejectedValueOnce(new Error("Database was here"));

			await expect(
				service.deleteManyByProperties({ owner: accountStub().owner })
			).rejects.toHaveProperty("name", "InternalServerErrorException");
		});
	});
});
