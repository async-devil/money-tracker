export class UpdateCategoryProperties {
	/** Category name
	 * @example "Salary"
	 */
	readonly name: string;

	/** Id of parent category, if not provided this category is the parent one
	 * @optional
	 * @example "123e4567-e89b-12d3-a456-426655440000"
	 */
	readonly sub?: string;

	/** Is archived flag. If archived, the category will no longer be visible on frontend and keep it transactions
	 * @default false
	 * @example false
	 */
	readonly archived?: boolean;

	/** Is mandatory flag. If mandatory, the category is one of the which cannot be avoided, like food, etc.
	 * @default false
	 * @example false
	 */
	readonly mandatory?: boolean;

	/** Notes about category
	 * @optional
	 * @example "Company salary"
	 */
	readonly notes?: string;

	/** Name of icon for frontend
	 * @default "MoreHoriz"
	 */
	readonly icon_name?: string;

	/** Hex icon color for frontend. 6 characters without #
	 * @default "A6A6A6"
	 */
	readonly icon_color?: string;
}

export class UpdateCategoryByIdDto {
	/** @example "123e4567-e89b-12d3-a456-426655440000" */
	readonly id: string;

	readonly data: UpdateCategoryProperties;
}
