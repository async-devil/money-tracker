/* eslint-disable sonarjs/no-duplicate-string */
import { BadRequestException, NotFoundException } from "@nestjs/common";
import { TestingModule, Test } from "@nestjs/testing";

import { AccountsRepository } from "src/modules/accounts/accounts.repository";
import { AccountsService } from "src/modules/accounts/accounts.service";

import { AccountsRepositoryMock } from "../../mocks/accounts.repository.mock";
import {
	accountStub,
	accountStubSecondary,
	createAccountStub,
	createAccountStubSecondary,
} from "../../stubs/account.stub";

describe("Accounts service tests", () => {
	let service: AccountsService;
	let repository: AccountsRepository;

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			providers: [
				AccountsService,
				{ provide: AccountsRepository, useValue: AccountsRepositoryMock },
			],
		}).compile();

		service = module.get<AccountsService>(AccountsService);
		repository = module.get<AccountsRepository>(AccountsRepository);
	});

	afterEach(() => {
		jest.restoreAllMocks();
	});

	test("should be defined", () => {
		expect(service).toBeDefined();
	});

	describe("createAccount method tests", () => {
		test("should be defined", () => {
			expect(service.createAccount).toBeDefined();
		});

		test("should create a new account", async () => {
			jest.spyOn(repository, "save").mockResolvedValueOnce(accountStub());

			const account = await service.createAccount(createAccountStub());

			expect(account).toEqual(accountStub());
		});

		test("should throw on duplicate account", async () => {
			jest
				.spyOn(repository, "save")
				.mockRejectedValueOnce(new BadRequestException("Duplicate account"));

			await expect(service.createAccount(createAccountStub())).rejects.toHaveProperty(
				"name",
				"BadRequestException"
			);
		});

		test("should throw on invalid balance value", async () => {
			jest
				.spyOn(repository, "save")
				.mockRejectedValueOnce(new BadRequestException("Invalid balance value"));

			await expect(service.createAccount(createAccountStub())).rejects.toHaveProperty(
				"name",
				"BadRequestException"
			);
		});
	});

	describe("getAccountById method tests", () => {
		test("should be defined", () => {
			expect(service.getAccountById).toBeDefined();
		});

		test("should get account by id", async () => {
			jest.spyOn(repository, "getOneByProperty").mockResolvedValueOnce(accountStub());

			const account = await service.getAccountById({ id: accountStub().id });

			expect(account).toEqual(accountStub());
		});

		test("should throw on not found account", async () => {
			jest
				.spyOn(repository, "getOneByProperty")
				.mockRejectedValueOnce(new NotFoundException("Account not found"));

			await expect(service.getAccountById({ id: accountStub().id })).rejects.toHaveProperty(
				"name",
				"NotFoundException"
			);
		});
	});

	describe("getAccountsByProperties method tests", () => {
		test("should be defined", () => {
			expect(service.getAccountsByProperties).toBeDefined();
		});

		test("should get accounts by matching owner", async () => {
			jest
				.spyOn(repository, "getManyByProperties")
				.mockResolvedValueOnce([accountStub(), accountStubSecondary()]);

			const accounts = await service.getAccountsByProperties({ owner: accountStub().owner });

			expect(accounts).toEqual([accountStub(), accountStubSecondary()]);
		});
	});

	describe("updateAccountById method tests", () => {
		test("should be defined", () => {
			expect(service.updateAccountById).toBeDefined();
		});

		test("should update existing account", async () => {
			jest.spyOn(repository, "getOneByProperty").mockResolvedValueOnce(accountStub());
			jest.spyOn(repository, "save").mockResolvedValueOnce(accountStubSecondary());

			const updateParams = createAccountStubSecondary();

			const updatedAccount = await service.updateAccountById({
				id: accountStub().id,
				data: updateParams,
			});

			expect(updatedAccount).toEqual(accountStubSecondary());
		});
	});

	describe("deleteAccountById method tests", () => {
		test("should be defined", () => {
			expect(service.deleteAccountById).toBeDefined();
		});

		test("should delete account by id", async () => {
			jest.spyOn(repository, "deleteOneByProperty").mockResolvedValueOnce({});

			const result = await service.deleteAccountById({ id: accountStub().id });

			expect(result).toEqual({});
		});
	});

	describe("deleteAllAccountsByOwnerId method tests", () => {
		test("should be defined", () => {
			expect(service.deleteAllAccountsByOwnerId).toBeDefined();
		});

		test("should delete accounts by owner id", async () => {
			jest.spyOn(repository, "deleteManyByProperties").mockResolvedValueOnce({});

			const result = await service.deleteAllAccountsByOwnerId({ owner: accountStub().owner });

			expect(result).toEqual({});
		});
	});
});
