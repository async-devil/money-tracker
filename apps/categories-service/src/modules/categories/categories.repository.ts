import {
	BadRequestException,
	Injectable,
	InternalServerErrorException,
	NotFoundException,
} from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

import { Category } from "src/entities/category.entity";

@Injectable()
export class CategoriesRepository {
	constructor(
		@InjectRepository(Category) private readonly categoriesRepository: Repository<Category>
	) {}

	private throwDefaultError(message?: string) {
		throw new InternalServerErrorException(message || "Internal Server Error");
	}

	public async getOneByProperty(property: { [key: string]: unknown }): Promise<Category> {
		let account: Category;

		try {
			account = await this.categoriesRepository.findOne({
				where: property,
			});
		} catch (err) {
			this.throwDefaultError();
		}

		if (!account) throw new NotFoundException("Category not found");
		return account;
	}

	public async getManyByProperties(properties: { [key: string]: unknown }): Promise<Category[]> {
		let categories: Category[];

		try {
			categories = await this.categoriesRepository.find({
				where: properties,
			});
		} catch (err) {
			this.throwDefaultError();
		}

		return categories;
	}

	public async save(account: Category): Promise<Category> {
		try {
			return await this.categoriesRepository.save(account);
		} catch (err) {
			const error = err as Error;

			if (error.message.includes("duplicate key value violates unique constraint")) {
				throw new BadRequestException("Duplicate account");
			}

			this.throwDefaultError();
		}
	}

	public async deleteOneByProperty(property: { [key: string]: unknown }) {
		try {
			await this.categoriesRepository.delete(property);
		} catch (err) {
			this.throwDefaultError();
		}

		return {};
	}

	public async deleteManyByProperties(properties: { [key: string]: unknown }) {
		try {
			await this.categoriesRepository.delete(properties);
		} catch (err) {
			this.throwDefaultError();
		}

		return {};
	}
}
