import { Controller } from "@nestjs/common";
import { MessagePattern } from "@nestjs/microservices";

import { CategoriesService } from "./categories.service";
import { CreateCategoryDto } from "./dtos/create-category.dto";
import { DeleteAllCategoriesByOwnerIdDto } from "./dtos/delete-all-categories-by-owner-id.dto";
import { DeleteCategoryByIdDto } from "./dtos/delete-category-by-id.dto";
import { GetCategoriesByPropertiesDto } from "./dtos/get-categories-by-properties.dto";
import { GetCategoryByIdDto } from "./dtos/get-category-by-id.dto";
import { UpdateCategoryByIdDto } from "./dtos/update-category-by-id.dto";

@Controller()
export class CategoriesController {
	constructor(private readonly categoriesService: CategoriesService) {}

	/**
	 *	Create new category from dto and return it if successfully
	 *
	 * 	Throws:
	 * 	- { statusCode: 400, message: ["name must be string"], error: "Bad request" }
	 * 	- { statusCode: 400, message: "Duplicate error", error: "Bad request" }
	 * 	- { statusCode: 500, message: "Unknown error", error: "Internal server error" }
	 */
	@MessagePattern({ cmd: "create-category" })
	public async createCategory(dto: CreateCategoryDto) {
		return await this.categoriesService.createCategory(dto);
	}

	/**
	 *	Get category by it's id
	 *
	 * 	Throws:
	 * 	- { statusCode: 400, message: ["id must be a UUID"], error: "Bad request" }
	 * 	- { statusCode: 404, message: "Category not found", error: "Not found"}
	 * 	- { statusCode: 500, message: "Unknown error", error: "Internal server error" }
	 */
	@MessagePattern({ cmd: "get-category-by-id" })
	public async getCategoryById(dto: GetCategoryByIdDto) {
		return await this.categoriesService.getCategoryById(dto);
	}

	/**
	 *	Get categories by similar properties, would pass even if no matching accounts found
	 *
	 * 	Throws:
	 * 	- { statusCode: 400, message: ["owner must be a UUID"], error: "Bad request" }
	 * 	- { statusCode: 500, message: "Unknown error", error: "Internal server error" }
	 */
	@MessagePattern({ cmd: "get-categories-by-properties" })
	public async getCategoriesByProperties(dto: GetCategoriesByPropertiesDto) {
		return await this.categoriesService.getCategoriesByProperties(dto);
	}

	/**
	 *	Update category by it's id
	 *
	 * 	Throws:
	 * 	- { statusCode: 400, message: ["id must be a UUID"], error: "Bad request" }
	 * 	- { statusCode: 400, message: "Duplicate error", error: "Bad request" }
	 * 	- { statusCode: 404, message: "Category not found", error: "Not found"}
	 * 	- { statusCode: 500, message: "Unknown error", error: "Internal server error" }
	 */
	@MessagePattern({ cmd: "update-category-by-id" })
	public async updateCategoryById(dto: UpdateCategoryByIdDto) {
		return await this.categoriesService.updateCategoryById(dto);
	}

	/**
	 *	Delete category and its sub categories by its id
	 *
	 * 	Throws:
	 * 	- { statusCode: 400, message: ["id must be a UUID"], error: "Bad request" }
	 * 	- { statusCode: 404, message: "Category not found", error: "Not found"}
	 * 	- { statusCode: 500, message: "Unknown error", error: "Internal server error" }
	 */
	@MessagePattern({ cmd: "delete-category-by-id" })
	public async deleteCategoryById(dto: DeleteCategoryByIdDto) {
		return await this.categoriesService.deleteCategoryById(dto);
	}

	/**
	 *	Delete all categories by owner's id, would pass even if categories not found
	 *
	 * 	Throws:
	 * 	- { statusCode: 400, message: ["owner must be a UUID"], error: "Bad request" }
	 * 	- { statusCode: 500, message: "Unknown error", error: "Internal server error" }
	 */
	@MessagePattern({ cmd: "delete-all-categories-by-owner-id" })
	public async deleteAllCategoriesByOwnerId(dto: DeleteAllCategoriesByOwnerIdDto) {
		return await this.categoriesService.deleteAllCategoriesByOwnerId(dto);
	}
}
