import { Column, Entity } from "typeorm";

import { BaseEntity } from "./base.entity";

export enum AccountType {
	REGULAR = "regular",
	SAVINGS = "savings",
	DEBT = "debt",
}

@Entity({ name: "account" })
export class Account extends BaseEntity {
	/** @example "123e4567-e89b-12d3-a456-426655440000" */
	@Column({ type: "varchar" })
	public owner: string;

	/** @example "regular" */
	@Column({ type: "enum", enum: AccountType })
	public type: AccountType;

	/** @example "Personal card" */
	@Column({ type: "varchar" })
	public name: string;

	/** ISO 4217 currency code
	 * @example "USD"
	 */
	@Column({ type: "varchar" })
	public currency: string;

	/** @example "1.35" */
	@Column({ type: "numeric", precision: 18, scale: 8 })
	public balance: number;

	/** @example "My personal bank card" */
	@Column({ type: "varchar", nullable: true })
	public notes?: string;

	/** Name of icon for frontend
	 * @example "MoreHoriz"
	 */
	@Column({ type: "varchar", default: "MoreHoriz" })
	public icon_name: string;

	/** Hex icon color
	 *  @example "A6A6A6"
	 */
	@Column({ type: "varchar", default: "A6A6A6" })
	public icon_color: string;
}
