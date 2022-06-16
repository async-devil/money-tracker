import { Column, Entity } from "typeorm";

import { BaseEntity } from "./base.entity";

export enum CategoryType {
	INCOME = "income",
	EXPENSE = "expense",
}

@Entity({ name: "category" })
export class Category extends BaseEntity {
	/** @example "123e4567-e89b-12d3-a456-426655440000" */
	@Column({ type: "uuid" })
	public owner: string;

	/** @example "income" */
	@Column({ type: "enum", enum: CategoryType })
	public type: CategoryType;

	/** Category name from 1 to 50 characters
	 * @example "Salary"
	 */
	@Column({ type: "varchar", length: 50 })
	public name: string;

	/** Id of parent category, if not provided this category is the parent one
	 * @optional
	 * @example "123e4567-e89b-12d3-a456-426655440000"
	 */
	@Column({ type: "uuid", nullable: true })
	public sub?: string;

	/** Is archived flag. If archived, the category will no longer be visible on frontend and keep it transactions
	 * @default false
	 * @example false
	 */
	@Column({ type: "boolean", default: false })
	public archived: boolean;

	/** Is mandatory flag. If mandatory, the category is one of the which cannot be avoided, like food, etc.
	 * @default false
	 * @example false
	 */
	@Column({ type: "boolean", default: false })
	public mandatory: boolean;

	/** Notes about category from 1 to 200 characters
	 * @optional
	 * @example "Company salary"
	 */
	@Column({ type: "varchar", length: 200, nullable: true })
	public notes?: string;

	/** Name of icon for frontend. From 1 to 50 characters
	 * @default "MoreHoriz"
	 */
	@Column({ type: "varchar", length: 50, default: "MoreHoriz" })
	public icon_name: string;

	/** Hex icon color for frontend. 6 characters without #
	 * @default "A6A6A6"
	 */
	@Column({ type: "varchar", length: 6, default: "A6A6A6" })
	public icon_color: string;
}
