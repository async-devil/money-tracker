/* eslint-disable sonarjs/no-duplicate-string */
import {
	Body,
	Controller,
	Delete,
	Get,
	NotFoundException,
	Param,
	Post,
	Put,
	Req,
	UseGuards,
} from "@nestjs/common";
import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";

import { HttpException } from "src/common/HttpException";
import { AccessTokenGuard } from "src/modules/auth-service/guards/access-token.guard";
import { IRequest } from "src/modules/auth-service/types/interfaces/IRequest";

import { CategoriesService } from "../categories-service.service";
import { CreateCategoryControllerDto } from "../types/request/create-category.dto";
import { GetCategoriesByPropertiesControllerDto } from "../types/request/get-categories-by-properties.dto";
import { UpdateProperties } from "../types/request/update-category-by-id.dto";
import { Category } from "../types/response/category.entity";

@ApiTags("Categories service")
@Controller()
export class CategoriesRouteController {
	constructor(private readonly categoriesService: CategoriesService) {}

	@ApiOperation({ summary: "Create account using current client id" })
	@ApiResponse({
		status: 201,
		type: Category,
	})
	@ApiResponse({ status: 400, type: HttpException, description: "Invalid request" })
	@ApiResponse({ status: 400, type: HttpException, description: "Duplicate error" })
	@ApiResponse({ status: 401, type: HttpException, description: "No access token provided" })
	@ApiResponse({ status: 401, type: HttpException, description: "Invalid access token" })
	@ApiResponse({ status: 504, type: HttpException, description: "Microservice timeout" })
	@ApiResponse({ status: 502, type: HttpException, description: "Bad gateway" })
	@UseGuards(AccessTokenGuard)
	@Post("/")
	public async createCategory(
		@Req() request: IRequest,
		@Body() dto: CreateCategoryControllerDto
	): Promise<Category> {
		return await this.categoriesService.createCategory({ owner: request.clientId, ...dto });
	}

	@ApiOperation({ summary: "Get category by id" })
	@ApiResponse({
		status: 200,
		type: Category,
	})
	@ApiResponse({ status: 400, type: HttpException, description: "Invalid request" })
	@ApiResponse({ status: 401, type: HttpException, description: "No access token provided" })
	@ApiResponse({ status: 401, type: HttpException, description: "Invalid access token" })
	@ApiResponse({ status: 404, type: HttpException, description: "Category not found" })
	@ApiResponse({ status: 504, type: HttpException, description: "Microservice timeout" })
	@ApiResponse({ status: 502, type: HttpException, description: "Bad gateway" })
	@UseGuards(AccessTokenGuard)
	@Get("/:id")
	public async getCategoryById(
		@Req() request: IRequest,
		@Param("id") id: string
	): Promise<Category> {
		const category = await this.categoriesService.getCategoryById({ id });

		if (category.owner !== request.clientId) throw new NotFoundException("Category not found");

		return category;
	}

	@ApiOperation({ summary: "Get categories by properties or just all" })
	@ApiResponse({
		status: 200,
		type: [Category],
	})
	@ApiResponse({ status: 400, type: HttpException, description: "Invalid request" })
	@ApiResponse({ status: 401, type: HttpException, description: "No access token provided" })
	@ApiResponse({ status: 401, type: HttpException, description: "Invalid access token" })
	@ApiResponse({ status: 504, type: HttpException, description: "Microservice timeout" })
	@ApiResponse({ status: 502, type: HttpException, description: "Bad gateway" })
	@UseGuards(AccessTokenGuard)
	@Get("/")
	public async getCategoriesByProperties(
		@Req() req: IRequest,
		@Body() dto: GetCategoriesByPropertiesControllerDto
	): Promise<Category[]> {
		return await this.categoriesService.getCategoriesByProperties({ owner: req.clientId, ...dto });
	}

	@ApiOperation({ summary: "Update category by id" })
	@ApiResponse({
		status: 200,
		type: [Category],
	})
	@ApiResponse({ status: 400, type: HttpException, description: "Invalid request" })
	@ApiResponse({ status: 400, type: HttpException, description: "Duplicate error" })
	@ApiResponse({ status: 401, type: HttpException, description: "No access token provided" })
	@ApiResponse({ status: 401, type: HttpException, description: "Invalid access token" })
	@ApiResponse({ status: 404, type: HttpException, description: "Category not found" })
	@ApiResponse({ status: 504, type: HttpException, description: "Microservice timeout" })
	@ApiResponse({ status: 502, type: HttpException, description: "Bad gateway" })
	@UseGuards(AccessTokenGuard)
	@Put("/:id")
	public async updateCategoryById(
		@Req() request: IRequest,
		@Param("id") id: string,
		@Body() dto: UpdateProperties
	): Promise<Category> {
		const category = await this.categoriesService.getCategoryById({ id });

		if (category.owner !== request.clientId) throw new NotFoundException("Category not found");

		return await this.categoriesService.updateCategoryById({ id, data: dto });
	}

	@ApiOperation({ summary: "Delete category and its sub categories by its id" })
	@ApiResponse({ status: 200 })
	@ApiResponse({ status: 400, type: HttpException, description: "Invalid request" })
	@ApiResponse({ status: 401, type: HttpException, description: "No access token provided" })
	@ApiResponse({ status: 401, type: HttpException, description: "Invalid access token" })
	@ApiResponse({ status: 404, type: HttpException, description: "Category not found" })
	@ApiResponse({ status: 504, type: HttpException, description: "Microservice timeout" })
	@ApiResponse({ status: 502, type: HttpException, description: "Bad gateway" })
	@UseGuards(AccessTokenGuard)
	@Delete("/:id")
	public async deleteCategoryById(@Req() request: IRequest, @Param("id") id: string) {
		const category = await this.categoriesService.getCategoryById({ id });

		if (category.owner !== request.clientId) throw new NotFoundException("Category not found");

		return await this.categoriesService.deleteCategoryById({ id });
	}
}
