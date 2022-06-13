import { TestingModule, Test } from "@nestjs/testing";

import { AuthService } from "src/modules/auth-service/auth-service.service";
import { AccessTokenGuard } from "src/modules/auth-service/guards/access-token.guard";

import { AuthServiceMock } from "../../../mocks/auth-service.mock";

describe("Access token guard tests", () => {
	let service: AccessTokenGuard;

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			providers: [
				AccessTokenGuard,
				{
					provide: AuthService,
					useValue: AuthServiceMock,
				},
			],
		}).compile();

		service = module.get<AccessTokenGuard>(AccessTokenGuard);
	});

	afterEach(() => {
		jest.restoreAllMocks();
	});

	test("should be defined", () => {
		expect(service).toBeDefined();
	});
});
