import { TestingModule, Test } from "@nestjs/testing";

import { AuthService } from "src/modules/auth-service/auth-service.service";
import { CategoriesService } from "src/modules/categories-service/categories-service.service";
import { CategoriesRouteController } from "src/modules/categories-service/routes/categories-route.controller";

import { AuthServiceMock } from "../../../mocks/auth-service.mock";
import { CategoriesServiceMock } from "../../../mocks/categories-service.mock";

describe("Categories route controller tests", () => {
	let service: CategoriesService;
	let controller: CategoriesRouteController;

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			controllers: [CategoriesRouteController],
			providers: [
				{
					provide: CategoriesService,
					useValue: CategoriesServiceMock,
				},
				{
					provide: AuthService,
					useValue: AuthServiceMock,
				},
			],
		}).compile();

		service = module.get<CategoriesService>(CategoriesService);
		controller = module.get<CategoriesRouteController>(CategoriesRouteController);
	});

	afterEach(() => {
		jest.restoreAllMocks();
	});

	test("should be defined", () => {
		expect(controller).toBeDefined();
	});
});
