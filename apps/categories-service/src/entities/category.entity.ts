import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

export enum CategoryType {
	INCOME = "income",
	EXPENSE = "expense",
}

@Entity({ name: "category" })
export class Category {
	/** @example "123e4567-e89b-12d3-a456-426655440000"*/
	@PrimaryGeneratedColumn("uuid")
	public id: string;

	/** @example "123e4567-e89b-12d3-a456-426655440000" */
	@Column({ type: "uuid" })
	public owner: string;

	/** @example "income" */
	@Column({ type: "enum", enum: CategoryType })
	public type: CategoryType;

	/** @example "Salary" */
	@Column({ type: "text" })
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

	/** Notes about category
	 * @optional
	 * @example "Company salary"
	 */
	@Column({ type: "text", nullable: true })
	public notes?: string;

	/** Name of icon for frontend
	 * @default "MoreHoriz"
	 */
	@Column({ type: "text", default: "MoreHoriz" })
	public icon_name: string;

	/** Hex icon color for frontend. 6 characters without #
	 * @default "A6A6A6"
	 */
	@Column({ type: "char", length: 6, default: "A6A6A6" })
	public icon_color: string;
}
