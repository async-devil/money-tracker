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
	@Column({ type: "uuid" })
	public owner: string;

	/** @example "regular" */
	@Column({ type: "enum", enum: AccountType })
	public type: AccountType;

	/** Account name from 1 to 50 characters
	 * @example "Personal card"
	 */
	@Column({ type: "varchar", length: 50 })
	public name: string;

	/** ISO 4217 currency code. Could be any 3-4 uppercase characters
	 * @example "USD"
	 */
	@Column({ type: "varchar", length: 4 })
	public currency: string;

	/** Balance of the account. 18 numbers in total, 8 numbers after dot
	 * @default 0
	 * @example 11.35065001
	 */
	@Column({ type: "numeric", precision: 18, scale: 8, default: 0 })
	public balance: number;

	/** Notes about account. From 1 to 200 characters
	 * @optional
	 * @example "My personal bank card"
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
