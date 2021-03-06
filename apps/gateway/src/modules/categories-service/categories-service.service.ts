import { Inject, Injectable } from "@nestjs/common";
import { ClientProxy } from "@nestjs/microservices";

import { RequestService } from "src/common/request.service";

import { CreateCategoryDto } from "./types/request/create-category.dto";
import { DeleteAllCategoriesByOwnerIdDto } from "./types/request/delete-all-categories-by-owner-id.dto";
import { DeleteCategoryByIdDto } from "./types/request/delete-category-by-id.dto";
import { GetCategoriesByPropertiesDto } from "./types/request/get-categories-by-properties.dto";
import { GetCategoryByIdDto } from "./types/request/get-category-by-id.dto";
import { UpdateCategoryByIdDto } from "./types/request/update-category-by-id.dto";
import { Category } from "./types/response/category.entity";

@Injectable()
export class CategoriesService {
	constructor(
		@Inject("CATEGORIES_SERVICE") private readonly categoriesService: ClientProxy,
		private readonly requestService: RequestService
	) {}

	public async ping(text: string): Promise<string> {
		return await this.requestService.sendRequest<string>(this.categoriesService, "ping", {
			text,
		});
	}

	/**
	 *	Create new category from dto and return it if successfully
	 *
	 * 	Throws:
	 * 	- { statusCode: 400, message: ["name must be string"], error: "Bad request" }
	 * 	- { statusCode: 400, message: "Duplicate error", error: "Bad request" }
	 * 	- { statusCode: 500, message: "Unknown error", error: "Internal server error" }
	 */
	public async create(dto: CreateCategoryDto): Promise<Category> {
		return await this.requestService.sendRequest<Category>(
			this.categoriesService,
			"create-category",
			dto
		);
	}

	/**
	 *	Get category by it's id
	 *
	 * 	Throws:
	 * 	- { statusCode: 400, message: ["id must be a UUID"], error: "Bad request" }
	 * 	- { statusCode: 404, message: "Category not found", error: "Not found"}
	 * 	- { statusCode: 500, message: "Unknown error", error: "Internal server error" }
	 */
	public async getById(dto: GetCategoryByIdDto): Promise<Category> {
		return await this.requestService.sendRequest<Category>(
			this.categoriesService,
			"get-category-by-id",
			dto
		);
	}

	/**
	 *	Get categories by similar properties, would pass even if no matching accounts found
	 *
	 * 	Throws:
	 * 	- { statusCode: 400, message: ["owner must be a UUID"], error: "Bad request" }
	 * 	- { statusCode: 500, message: "Unknown error", error: "Internal server error" }
	 */
	public async getByProperties(dto: GetCategoriesByPropertiesDto): Promise<Category[]> {
		return await this.requestService.sendRequest<Category[]>(
			this.categoriesService,
			"get-categories-by-properties",
			dto
		);
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
	public async updateById(dto: UpdateCategoryByIdDto): Promise<Category> {
		return await this.requestService.sendRequest<Category>(
			this.categoriesService,
			"update-category-by-id",
			dto
		);
	}

	/**
	 *	Delete category and its sub categories by its id
	 *
	 * 	Throws:
	 * 	- { statusCode: 400, message: ["id must be a UUID"], error: "Bad request" }
	 * 	- { statusCode: 404, message: "Category not found", error: "Not found"}
	 * 	- { statusCode: 500, message: "Unknown error", error: "Internal server error" }
	 */
	public async deleteById(dto: DeleteCategoryByIdDto) {
		return await this.requestService.sendRequest(
			this.categoriesService,
			"delete-category-by-id",
			dto
		);
	}

	/**
	 *	Delete all categories by owner's id, would pass even if categories not found
	 *
	 * 	Throws:
	 * 	- { statusCode: 400, message: ["owner must be a UUID"], error: "Bad request" }
	 * 	- { statusCode: 500, message: "Unknown error", error: "Internal server error" }
	 */
	public async deleteAllByOwnerId(dto: DeleteAllCategoriesByOwnerIdDto) {
		return await this.requestService.sendRequest(
			this.categoriesService,
			"delete-all-categories-by-owner-id",
			dto
		);
	}
}
