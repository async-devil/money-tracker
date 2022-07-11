import { ApiRequests } from "..";
import { CreateCategoryDto } from "./types/request/create-category.dto";
import { DeleteCategoryByIdDto } from "./types/request/delete-category-by-id.dto";
import { GetCategoriesByQueryDto } from "./types/request/get-categories-by-properties.dto";
import { GetCategoryByIdDto } from "./types/request/get-category-by-id.dto";
import { UpdateCategoryByIdDto } from "./types/request/update-category-by-id.dto";
import { Category } from "./types/response/category.entity";

export class CategoriesApiRequests {
	public static async create(dto: CreateCategoryDto) {
		return await ApiRequests.request<Category>("/api/categories", "post", dto);
	}

	public static async getById(dto: GetCategoryByIdDto) {
		return await ApiRequests.request<Category>(`/api/categories/${dto.id}`, "get");
	}

	public static async getByQuery(dto: GetCategoriesByQueryDto) {
		const query = ApiRequests.dtoToBase64Query(dto);

		return await ApiRequests.request<Category[]>(`/api/categories?query=${query}`, "get");
	}

	public static async updateById(dto: UpdateCategoryByIdDto) {
		return await ApiRequests.request<Category>("/api/categories", "put", dto);
	}

	public static async deleteById(dto: DeleteCategoryByIdDto) {
		return await ApiRequests.request(`/api/categories/${dto.id}`, "delete");
	}
}
