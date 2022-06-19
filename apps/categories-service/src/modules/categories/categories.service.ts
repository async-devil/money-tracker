import { Injectable } from "@nestjs/common";

import { Category } from "src/entities/category.entity";

import { CategoriesRepository } from "./categories.repository";
import { CreateCategoryDto } from "./dtos/create-category.dto";
import { DeleteAllCategoriesByOwnerIdDto } from "./dtos/delete-all-categories-by-owner-id.dto";
import { DeleteCategoryByIdDto } from "./dtos/delete-category-by-id.dto";
import { GetCategoriesByPropertiesDto } from "./dtos/get-categories-by-properties.dto";
import { GetCategoryByIdDto } from "./dtos/get-category-by-id.dto";
import { UpdateCategoryByIdDto } from "./dtos/update-category-by-id.dto";

@Injectable()
export class CategoriesService {
	constructor(private readonly categoriesRepository: CategoriesRepository) {}

	public async createCategory(dto: CreateCategoryDto) {
		const category = new Category();

		Object.assign(category, dto);

		return await this.categoriesRepository.save(category);
	}

	public async getCategoryById(dto: GetCategoryByIdDto) {
		return await this.categoriesRepository.getOneByProperty({ ...dto });
	}

	public async getCategoriesByProperties(dto: GetCategoriesByPropertiesDto) {
		return await this.categoriesRepository.getManyByProperties({ ...dto });
	}

	public async updateCategoryById(dto: UpdateCategoryByIdDto) {
		const category = await this.getCategoryById({ id: dto.id });

		Object.assign(category, dto.data);

		return await this.categoriesRepository.save(category);
	}

	public async deleteCategoryById(dto: DeleteCategoryByIdDto) {
		const category = await this.getCategoryById(dto);

		await this.categoriesRepository.deleteManyByProperties({
			owner: category.owner,
			sub: category.id,
		});

		return await this.categoriesRepository.deleteOneByProperty({ ...dto });
	}

	public async deleteAllCategoriesByOwnerId(dto: DeleteAllCategoriesByOwnerIdDto) {
		return await this.categoriesRepository.deleteManyByProperties({ ...dto });
	}
}
