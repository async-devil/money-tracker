/* eslint-disable sonarjs/no-duplicate-string */
import { Test, TestingModule } from "@nestjs/testing";
import { getRepositoryToken } from "@nestjs/typeorm";
import { Repository } from "typeorm";

import { Category } from "src/entities/category.entity";
import { CategoriesRepository } from "src/modules/categories/categories.repository";

import { CategoryModel } from "../../mocks/category.model.mock";

describe("Categories repository service", () => {
	let service: CategoriesRepository;
	let repository: Repository<Category>;

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			providers: [
				CategoriesRepository,
				{
					provide: getRepositoryToken(Category),
					useValue: CategoryModel,
				},
			],
		}).compile();

		service = module.get<CategoriesRepository>(CategoriesRepository);
		repository = module.get<Repository<Category>>(getRepositoryToken(Category));
	});

	afterEach(() => {
		jest.restoreAllMocks();
	});

	test("should be defined", () => {
		expect(service).toBeDefined();
	});

	describe("getOneByProperty method tests", () => {
		test("should be defined", () => {
			expect(service.getOneByProperty).toBeDefined();
		});
	});

	describe("getManyByProperties method tests", () => {
		test("should be defined", () => {
			expect(service.getManyByProperties).toBeDefined();
		});
	});

	describe("save method tests", () => {
		test("should be defined", () => {
			expect(service.save).toBeDefined();
		});
	});

	describe("deleteOneByProperty method tests", () => {
		test("should be defined", () => {
			expect(service.deleteOneByProperty).toBeDefined();
		});
	});

	describe("deleteManyByProperties method tests", () => {
		test("should be defined", () => {
			expect(service.deleteManyByProperties).toBeDefined();
		});
	});
});
