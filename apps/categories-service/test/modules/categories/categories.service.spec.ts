/* eslint-disable sonarjs/no-duplicate-string */
import { Test, TestingModule } from "@nestjs/testing";

import { CategoriesRepository } from "src/modules/categories/categories.repository";
import { CategoriesService } from "src/modules/categories/categories.service";

import { CategoriesRepositoryMock } from "../../mocks/categories.repository.mock";

describe("Categories service service", () => {
	let service: CategoriesService;
	let repository: CategoriesRepository;

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			providers: [
				CategoriesService,
				{
					provide: CategoriesRepository,
					useValue: CategoriesRepositoryMock,
				},
			],
		}).compile();

		service = module.get<CategoriesService>(CategoriesService);
		repository = module.get<CategoriesRepository>(CategoriesRepository);
	});

	afterEach(() => {
		jest.restoreAllMocks();
	});

	test("should be defined", () => {
		expect(service).toBeDefined();
	});

	describe("createCategory method tests", () => {
		test("should be defined", () => {
			expect(service.createCategory).toBeDefined();
		});
	});

	describe("getCategoryById method tests", () => {
		test("should be defined", () => {
			expect(service.getCategoryById).toBeDefined();
		});
	});

	describe("getCategoriesByProperties method tests", () => {
		test("should be defined", () => {
			expect(service.getCategoriesByProperties).toBeDefined();
		});
	});

	describe("updateCategoryById method tests", () => {
		test("should be defined", () => {
			expect(service.updateCategoryById).toBeDefined();
		});
	});

	describe("deleteCategoryById method tests", () => {
		test("should be defined", () => {
			expect(service.deleteCategoryById).toBeDefined();
		});
	});

	describe("deleteAllCategoriesByOwnerId method tests", () => {
		test("should be defined", () => {
			expect(service.deleteAllCategoriesByOwnerId).toBeDefined();
		});
	});
});
