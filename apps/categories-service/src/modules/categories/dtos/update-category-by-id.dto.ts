import { Type } from "class-transformer";
import {
	IsBoolean,
	IsHexadecimal,
	IsOptional,
	IsString,
	IsUUID,
	Length,
	ValidateNested,
} from "class-validator";

export class UpdateProperties {
	/** Category name from 1 to 50 characters
	 * @example "Salary"
	 */
	@IsOptional()
	@IsString()
	@Length(1, 50)
	readonly name?: string;

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

	/** Notes about category from 1 to 200 characters
	 * @optional
	 * @example "Company salary"
	 */
	@IsOptional()
	@IsString()
	@Length(1, 200)
	readonly notes?: string;

	/** Name of icon for frontend. From 1 to 50 characters
	 * @default "MoreHoriz"
	 */
	@IsOptional()
	@IsString()
	@Length(1, 50)
	readonly icon_name?: string;

	/** Hex icon color for frontend. 6 characters without #
	 * @default "A6A6A6"
	 */
	@IsOptional()
	@IsHexadecimal()
	@Length(6, 6)
	readonly icon_color?: string;
}

export class UpdateCategoryByIdDto {
	/** @example "123e4567-e89b-12d3-a456-426655440000" */
	@IsUUID()
	readonly id: string;

	@ValidateNested()
	@Type(() => UpdateProperties)
	readonly data: UpdateProperties;
}
