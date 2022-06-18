import { ApiProperty, OmitType } from "@nestjs/swagger";

import { CategoryType } from "../response/category.entity";

export class GetCategoriesByPropertiesDto {
	/** @example "123e4567-e89b-12d3-a456-426655440000" */
	@ApiProperty({ example: "123e4567-e89b-12d3-a456-426655440000", nullable: true })
	readonly owner?: string;

	/** @example "income" */
	@ApiProperty({ example: "income", enum: CategoryType, nullable: true })
	readonly type?: CategoryType;

	/** Id of parent category, if not provided this category is the parent one
	 * @optional
	 * @example "123e4567-e89b-12d3-a456-426655440000"
	 */
	@ApiProperty({
		example: "123e4567-e89b-12d3-a456-426655440000",
		nullable: true,
		description: "Id of parent category, if not provided this category is the parent one",
	})
	readonly sub?: string;

	/** Is archived flag. If archived, the category will no longer be visible on frontend and keep it transactions
	 * @default false
	 * @example false
	 */
	@ApiProperty({
		example: false,
		nullable: true,
		description:
			"Is archived flag. If archived, the category will no longer be visible on frontend and keep it transactions",
	})
	readonly archived?: boolean;

	/** Is mandatory flag. If mandatory, the category is one of the which cannot be avoided, like food, etc.
	 * @default false
	 * @example false
	 */
	@ApiProperty({
		example: false,
		nullable: true,
		description:
			"Is mandatory flag. If mandatory, the category is one of the which cannot be avoided, like food, etc.",
	})
	readonly mandatory?: boolean;
}

export class GetCategoriesByPropertiesControllerDto extends OmitType(GetCategoriesByPropertiesDto, [
	"owner",
]) {}
