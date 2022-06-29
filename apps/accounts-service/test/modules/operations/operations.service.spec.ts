/* eslint-disable sonarjs/no-duplicate-string */
import { TestingModule, Test } from "@nestjs/testing";

import { AccountsService } from "src/modules/accounts/accounts.service";
import { TransactionType } from "src/modules/operations/dtos/operate-account.dto";
import { OperationsService } from "src/modules/operations/operations.service";

import { AccountsServiceMock } from "../../mocks/accounts.service.mock";
import { accountStub } from "../../stubs/account.stub";

describe("Operations service tests", () => {
	let service: OperationsService;
	let accountsService: AccountsService;

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			providers: [
				OperationsService,
				{
					provide: AccountsService,
					useValue: AccountsServiceMock,
				},
			],
		}).compile();

		service = module.get<OperationsService>(OperationsService);
		accountsService = module.get<AccountsService>(AccountsService);
	});

	afterEach(() => {
		jest.restoreAllMocks();
	});

	test("should be defined", () => {
		expect(service).toBeDefined();
	});

	describe("operateAccount method tests", () => {
		test("should be defined", () => {
			expect(service.operateAccount).toBeDefined();
		});

		test("should reduce account balance", async () => {
			jest.spyOn(accountsService, "getAccountById").mockResolvedValueOnce(accountStub());
			jest
				.spyOn(accountsService, "updateAccountById")
				.mockResolvedValue(
					accountStub({ balance: String(parseFloat(accountStub().balance) - 10) })
				);

			const updatedAccount = await service.operateAccount({
				accountId: accountStub().id,
				amount: "10",
				type: TransactionType.WITHDRAW,
			});

			expect(updatedAccount).toEqual(
				accountStub({ balance: String(parseFloat(accountStub().balance) - 10) })
			);
		});

		test("should raise account balance", async () => {
			jest.spyOn(accountsService, "getAccountById").mockResolvedValueOnce(accountStub());
			jest
				.spyOn(accountsService, "updateAccountById")
				.mockResolvedValue(
					accountStub({ balance: String(parseFloat(accountStub().balance) + 10) })
				);

			const updatedAccount = await service.operateAccount({
				accountId: accountStub().id,
				amount: "10",
				type: TransactionType.RECHARGE,
			});

			expect(updatedAccount).toEqual(
				accountStub({ balance: String(parseFloat(accountStub().balance) + 10) })
			);
		});
	});
});
