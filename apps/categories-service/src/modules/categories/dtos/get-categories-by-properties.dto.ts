import { IsBoolean, IsEnum, IsOptional, IsUUID } from "class-validator";

import { CategoryType } from "src/entities/category.entity";

export class GetCategoriesByPropertiesDto {
	/** @example "123e4567-e89b-12d3-a456-426655440000" */
	@IsOptional()
	@IsUUID()
	readonly owner?: string;

	/** @example "income" */
	@IsOptional()
	@IsEnum(CategoryType)
	readonly type?: CategoryType;

	/** Id of parent category, if not provided this category is the parent one
	 * @optional
	 * @example "123e4567-e89b-12d3-a456-426655440000"
	 */
	@IsOptional()
	@IsUUID()
	readonly sub?: string;

	/** Is archived flag. If archived, the category will no longer be visible on frontend and keep it transactions
	 * @example false
	 */
	@IsOptional()
	@IsBoolean()
	readonly archived?: boolean;

	/** Is mandatory flag. If mandatory, the category is one of the which cannot be avoided, like food, etc.
	 * @example false
	 */
	@IsOptional()
	@IsBoolean()
	readonly mandatory?: boolean;
}
