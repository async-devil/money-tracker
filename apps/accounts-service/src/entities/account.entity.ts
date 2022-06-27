import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

export enum AccountType {
	REGULAR = "regular",
	SAVINGS = "savings",
	DEBT = "debt",
}

@Entity({ name: "account" })
export class Account {
	/** @example "123e4567-e89b-12d3-a456-426655440000"*/
	@PrimaryGeneratedColumn("uuid")
	public id: string;

	/** @example "123e4567-e89b-12d3-a456-426655440000" */
	@Column({ type: "uuid" })
	public owner: string;

	/** @example "regular" */
	@Column({ type: "enum", enum: AccountType })
	public type: AccountType;

	/** @example "Personal card" */
	@Column({ type: "text" })
	public name: string;

	/** ISO 4217 currency code. Could be any 3-4 uppercase characters
	 * @example "USD"
	 */
	@Column({ type: "varchar", length: 4 })
	public currency: string;

	/** Balance of the account. 18 numbers in total, 8 numbers after dot
	 * @default "0.00000000"
	 * @example "11.35065001"
	 */
	@Column({ type: "numeric", precision: 18, scale: 8, default: 0 })
	public balance: string;

	/** Notes about account
	 * @optional
	 * @example "My personal bank card"
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
