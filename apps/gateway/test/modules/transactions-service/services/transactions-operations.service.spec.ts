/* eslint-disable sonarjs/no-duplicate-string */
import { TestingModule, Test } from "@nestjs/testing";

import { AccountsService } from "src/modules/accounts-service/accounts-service.service";
import { CategoriesService } from "src/modules/categories-service/categories-service.service";
import { TransactionsOperationsService } from "src/modules/transactions-service/services/transactions-operations.service";
import { TransactionsService } from "src/modules/transactions-service/transactions-service.service";
import { UpdateTransactionProperties } from "src/modules/transactions-service/types/request/update-transaction-by-id.dto";
import { TransactionType } from "src/modules/transactions-service/types/response/transaction.entity";

import { AccountsServiceMock } from "../../../mocks/accounts-service.mock";
import { CategoriesServiceMock } from "../../../mocks/categories-service.mock";
import { TransactionsServiceMock } from "../../../mocks/transactions-service.mock";
import { accountStub, accountStubSecondary } from "../../../stubs/account.stub";
import { categoryStub, categoryStubSecondary } from "../../../stubs/category.stub";
import {
	createTransactionStub,
	createTransactionStubSecondary,
	createTransactionStubTertiary,
	transactionStub,
	transactionStubSecondary,
	transactionStubTertiary,
} from "../../../stubs/transaction.stub";

describe("TransactionsService service", () => {
	let service: TransactionsOperationsService;
	let transactionsService: TransactionsService;
	let accountsService: AccountsService;
	let categoriesService: CategoriesService;

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			providers: [
				TransactionsOperationsService,
				{
					provide: TransactionsService,
					useValue: TransactionsServiceMock,
				},
				{
					provide: AccountsService,
					useValue: AccountsServiceMock,
				},
				{
					provide: CategoriesService,
					useValue: CategoriesServiceMock,
				},
			],
		}).compile();

		service = module.get<TransactionsOperationsService>(TransactionsOperationsService);
		transactionsService = module.get<TransactionsService>(TransactionsService);
		accountsService = module.get<AccountsService>(AccountsService);
		categoriesService = module.get<CategoriesService>(CategoriesService);
	});

	afterEach(() => {
		jest.restoreAllMocks();
	});

	test("should be defined", () => {
		expect(service).toBeDefined();
	});

	describe("createTransaction method tests", () => {
		test("should be defined", () => {
			expect(service.createTransaction).toBeDefined();
		});

		describe("should create transaction", () => {
			test("recharge type", async () => {
				jest.spyOn(categoriesService, "getById").mockResolvedValueOnce(categoryStub());
				jest.spyOn(accountsService, "getById").mockResolvedValue(accountStub());

				jest.spyOn(transactionsService, "create").mockResolvedValueOnce(transactionStub());

				const result = await service.createTransaction(createTransactionStub());

				expect(accountsService.operate).toBeCalledWith({
					accountId: transactionStub().to,
					amount: transactionStub().amount_to,
					type: TransactionType.RECHARGE,
				});

				expect(result).toStrictEqual(transactionStub());
			});

			test("withdraw type", async () => {
				jest.spyOn(accountsService, "getById").mockResolvedValueOnce(accountStubSecondary());
				jest.spyOn(categoriesService, "getById").mockResolvedValueOnce(categoryStubSecondary());

				jest.spyOn(transactionsService, "create").mockResolvedValueOnce(transactionStubSecondary());

				jest.spyOn(accountsService, "getById").mockResolvedValueOnce(accountStubSecondary());

				const result = await service.createTransaction(createTransactionStubSecondary());

				expect(accountsService.operate).toBeCalledWith({
					accountId: transactionStubSecondary().from,
					amount: transactionStubSecondary().amount_from,
					type: TransactionType.WITHDRAW,
				});

				expect(result).toStrictEqual(transactionStubSecondary());
			});

			test("transfer type", async () => {
				jest.spyOn(transactionsService, "create").mockResolvedValueOnce(transactionStubTertiary());

				const result = await service.createTransaction(createTransactionStubTertiary());

				expect(accountsService.operate).toBeCalledWith({
					accountId: createTransactionStubTertiary().from,
					amount: createTransactionStubTertiary().amount_from,
					type: TransactionType.WITHDRAW,
				});

				expect(accountsService.operate).toBeCalledWith({
					accountId: createTransactionStubTertiary().to,
					amount: createTransactionStubTertiary().amount_to,
					type: TransactionType.RECHARGE,
				});

				expect(result).toStrictEqual(transactionStubTertiary());
			});
		});

		test("should throw on not found recepient", async () => {
			jest.spyOn(accountsService, "getById").mockRejectedValueOnce(new Error("Not found"));

			await expect(
				service.createTransaction(createTransactionStubSecondary())
			).rejects.toThrowError();
		});

		test("should throw on not matching currencies", async () => {
			jest.spyOn(accountsService, "getById").mockResolvedValue(accountStub());
			jest.spyOn(categoriesService, "getById").mockResolvedValueOnce(categoryStubSecondary());

			jest
				.spyOn(transactionsService, "create")
				.mockResolvedValueOnce(transactionStubSecondary({ currency_from: "UPD" }));

			await expect(
				service.createTransaction(createTransactionStubSecondary())
			).rejects.toThrowError();
		});
	});

	describe("updateTransaction method tests", () => {
		test("should be defined", () => {
			expect(service.updateTransaction).toBeDefined();
		});

		describe("should update transaction", () => {
			test("recharge type", async () => {
				const updateProperties: UpdateTransactionProperties = {
					amount_from: "800",
					amount_to: "800",
				};

				jest.spyOn(transactionsService, "getById").mockResolvedValueOnce(transactionStub());

				jest.spyOn(categoriesService, "getById").mockResolvedValueOnce(categoryStub());
				jest.spyOn(accountsService, "getById").mockResolvedValue(accountStub());

				jest
					.spyOn(transactionsService, "updateById")
					.mockResolvedValueOnce(transactionStub(updateProperties));

				const result = await service.updateTransaction({
					id: transactionStub().id,
					data: updateProperties,
				});

				expect(accountsService.operate).toBeCalledWith({
					accountId: transactionStub().to,
					amount: transactionStub().amount_to,
					type: TransactionType.WITHDRAW,
				});

				expect(accountsService.operate).toBeCalledWith({
					accountId: transactionStub(updateProperties).to,
					amount: transactionStub(updateProperties).amount_to,
					type: TransactionType.RECHARGE,
				});

				expect(result).toStrictEqual(transactionStub(updateProperties));
			});

			test("witdraw type", async () => {
				const updateProperties: UpdateTransactionProperties = {
					from: accountStub().id,
					amount_to: "330",
				};

				jest
					.spyOn(transactionsService, "getById")
					.mockResolvedValueOnce(transactionStubSecondary());

				jest.spyOn(accountsService, "getById").mockResolvedValueOnce(accountStubSecondary());
				jest.spyOn(categoriesService, "getById").mockResolvedValueOnce(categoryStubSecondary());

				jest
					.spyOn(transactionsService, "updateById")
					.mockResolvedValueOnce(transactionStubSecondary(updateProperties));

				const result = await service.updateTransaction({
					id: transactionStubSecondary().id,
					data: updateProperties,
				});

				expect(accountsService.operate).toBeCalledWith({
					accountId: transactionStubSecondary().from,
					amount: transactionStubSecondary().amount_from,
					type: TransactionType.RECHARGE,
				});

				expect(accountsService.operate).toBeCalledWith({
					accountId: transactionStubSecondary(updateProperties).from,
					amount: transactionStubSecondary(updateProperties).amount_from,
					type: TransactionType.WITHDRAW,
				});

				expect(result).toStrictEqual(transactionStubSecondary(updateProperties));
			});

			test("transfer type", async () => {
				const updateProperties: UpdateTransactionProperties = {
					amount_from: "500",
					amount_to: "521.46",
				};

				jest.spyOn(transactionsService, "getById").mockResolvedValueOnce(transactionStubTertiary());

				jest.spyOn(accountsService, "getById").mockResolvedValueOnce(accountStubSecondary());
				jest.spyOn(accountsService, "getById").mockResolvedValueOnce(accountStub());

				jest.spyOn(accountsService, "getById").mockResolvedValueOnce(accountStubSecondary());
				jest.spyOn(accountsService, "getById").mockResolvedValueOnce(accountStub());

				jest
					.spyOn(transactionsService, "updateById")
					.mockResolvedValueOnce(transactionStubTertiary(updateProperties));

				const result = await service.updateTransaction({
					id: transactionStubTertiary().id,
					data: updateProperties,
				});

				expect(accountsService.operate).toBeCalledWith({
					accountId: transactionStubTertiary().from,
					amount: transactionStubTertiary().amount_from,
					type: TransactionType.RECHARGE,
				});

				expect(accountsService.operate).toBeCalledWith({
					accountId: transactionStubTertiary(updateProperties).from,
					amount: transactionStubTertiary(updateProperties).amount_from,
					type: TransactionType.WITHDRAW,
				});

				expect(accountsService.operate).toBeCalledWith({
					accountId: transactionStubTertiary().to,
					amount: transactionStubTertiary().amount_to,
					type: TransactionType.WITHDRAW,
				});

				expect(accountsService.operate).toBeCalledWith({
					accountId: transactionStubTertiary(updateProperties).to,
					amount: transactionStubTertiary(updateProperties).amount_to,
					type: TransactionType.RECHARGE,
				});

				expect(result).toStrictEqual(transactionStubTertiary(updateProperties));
			});
		});
	});

	describe("deleteTransaction method tests", () => {
		test("should be defined", () => {
			expect(service.deleteTransaction).toBeDefined();
		});

		describe("should delete transaction", () => {
			test("recharge type", async () => {
				jest.spyOn(transactionsService, "getById").mockResolvedValueOnce(transactionStub());

				jest.spyOn(categoriesService, "getById").mockResolvedValueOnce(categoryStub());
				jest.spyOn(accountsService, "getById").mockResolvedValue(accountStub());

				await service.deleteTransaction({ id: transactionStub().id });

				expect(accountsService.operate).toBeCalledWith({
					accountId: transactionStub().to,
					amount: transactionStub().amount_to,
					type: TransactionType.WITHDRAW,
				});
			});

			test("withdraw type", async () => {
				jest
					.spyOn(transactionsService, "getById")
					.mockResolvedValueOnce(transactionStubSecondary());

				jest.spyOn(accountsService, "getById").mockResolvedValueOnce(accountStub());
				jest.spyOn(categoriesService, "getById").mockResolvedValueOnce(categoryStubSecondary());

				await service.deleteTransaction({ id: transactionStubSecondary().id });

				expect(accountsService.operate).toBeCalledWith({
					accountId: transactionStubSecondary().from,
					amount: transactionStubSecondary().amount_from,
					type: TransactionType.RECHARGE,
				});
			});

			test("transfer type", async () => {
				jest.spyOn(transactionsService, "getById").mockResolvedValueOnce(transactionStubTertiary());

				jest.spyOn(accountsService, "getById").mockResolvedValueOnce(accountStubSecondary());
				jest.spyOn(accountsService, "getById").mockResolvedValueOnce(accountStub());

				jest.spyOn(accountsService, "getById").mockResolvedValueOnce(accountStubSecondary());
				jest.spyOn(accountsService, "getById").mockResolvedValueOnce(accountStub());

				await service.deleteTransaction({ id: transactionStubTertiary().id });

				expect(accountsService.operate).toBeCalledWith({
					accountId: createTransactionStubTertiary().from,
					amount: createTransactionStubTertiary().amount_from,
					type: TransactionType.RECHARGE,
				});

				expect(accountsService.operate).toBeCalledWith({
					accountId: createTransactionStubTertiary().to,
					amount: createTransactionStubTertiary().amount_to,
					type: TransactionType.WITHDRAW,
				});
			});
		});
	});

	describe("deleteAllTransactionsByAccountId method tests", () => {
		test("should be defined", () => {
			expect(service.deleteAllTransactionsByAccountId).toBeDefined();
		});

		test("should call deleteTransaction 3 times", async () => {
			jest.spyOn(transactionsService, "getByQuery").mockResolvedValueOnce([transactionStub()]);
			jest
				.spyOn(transactionsService, "getByQuery")
				.mockResolvedValueOnce([transactionStubSecondary(), transactionStubTertiary()]);

			jest.spyOn(transactionsService, "getById").mockResolvedValue(transactionStub());

			const deleteTransactionMethod = jest
				.spyOn(service, "deleteTransaction")
				.mockResolvedValue({});

			await service.deleteAllTransactionsByAccountId({
				owner: transactionStub().id,
				accountId: transactionStub().from,
			});

			expect(deleteTransactionMethod).toBeCalledTimes(3);
		});
	});

	describe("deleteAllTransactionsByCategoryId method tests", () => {
		test("should be defined", () => {
			expect(service.deleteAllTransactionsByCategoryId).toBeDefined();
		});

		test("should call deleteTransaction 3 times", async () => {
			jest.spyOn(transactionsService, "getByQuery").mockResolvedValueOnce([transactionStub()]);
			jest
				.spyOn(transactionsService, "getByQuery")
				.mockResolvedValueOnce([transactionStubSecondary(), transactionStubTertiary()]);

			jest.spyOn(transactionsService, "getById").mockResolvedValue(transactionStub());

			const deleteTransactionMethod = jest
				.spyOn(service, "deleteTransaction")
				.mockResolvedValue({});

			await service.deleteAllTransactionsByCategoryId({
				owner: transactionStub().id,
				categoryId: transactionStub().from,
			});

			expect(deleteTransactionMethod).toBeCalledTimes(3);
		});
	});
});
