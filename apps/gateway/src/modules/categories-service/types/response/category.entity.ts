import { ApiProperty } from "@nestjs/swagger";

export enum CategoryType {
	INCOME = "income",
	EXPENSE = "expense",
}

export class Category {
	/** @example "123e4567-e89b-12d3-a456-426655440000" */
	@ApiProperty({ example: "123e4567-e89b-12d3-a456-426675440000" })
	readonly id: string;

	/** @example "123e4567-e89b-12d3-a456-426655440000" */
	@ApiProperty({ example: "123e4567-e89b-12d3-a456-426655440000" })
	readonly owner: string;

	/** @example "income" */
	@ApiProperty({ example: "income", enum: CategoryType })
	readonly type: CategoryType;

	/** Category name
	 * @example "Salary"
	 */
	@ApiProperty({ example: "Salary", description: "Category name" })
	readonly name: string;

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
		default: false,
		description:
			"Is archived flag. If archived, the category will no longer be visible on frontend and keep it transactions",
	})
	readonly archived: boolean;

	/** Is mandatory flag. If mandatory, the category is one of the which cannot be avoided, like food, etc.
	 * @default false
	 * @example false
	 */
	@ApiProperty({
		example: false,
		default: false,
		description:
			"Is mandatory flag. If mandatory, the category is one of the which cannot be avoided, like food, etc.",
	})
	readonly mandatory: boolean;

	/** Notes about category
	 * @optional
	 * @example "Company salary"
	 */
	@ApiProperty({
		example: "Company salary",
		nullable: true,
		description: "Notes about category",
	})
	readonly notes?: string;

	/** Name of icon for frontend
	 * @default "MoreHoriz"
	 */
	@ApiProperty({
		example: "MoreHoriz",
		default: "MoreHoriz",
		description: "Name of icon for frontend",
	})
	readonly icon_name: string;

	/** Hex icon color for frontend. 6 characters without #
	 * @default "A6A6A6"
	 */
	@ApiProperty({
		example: "A6A6A6",
		default: "A6A6A6",
		description: "Hex icon color for frontend. 6 characters without #",
	})
	readonly icon_color: string;
}
