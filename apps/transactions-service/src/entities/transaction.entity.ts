import { Column, Entity } from "typeorm";

import { BaseEntity } from "./base.entity";

export enum TransactionType {
	RECHARGE = "recharge",
	WITHDRAW = "withdraw",
	TRANSFER = "transfer",
}

@Entity({ name: "transaction" })
export class Transaction extends BaseEntity {
	/** @example "123e4567-e89b-12d3-a456-426655440000" */
	@Column({ type: "uuid" })
	public owner: string;

	/** @example "recharge" */
	@Column({ type: "enum", enum: TransactionType })
	public type: TransactionType;

	/** Category or account id which was used to create the transaction
	 * @example "123e4567-e89b-12d3-a456-426655440000"
	 */
	@Column({ type: "uuid" })
	public from: string;

	/** Category or account id which was used to create the transaction
	 * @example "123e4567-e89b-12d3-a456-426655440000"
	 */
	@Column({ type: "uuid" })
	public to: string;

	/** Amount of transaction in specific currency. 18 numbers in total, 8 numbers after dot
	 * @example "11.35065001"
	 */
	@Column({ type: "numeric", precision: 18, scale: 8 })
	public amount_from: string;

	/** Amount of transaction in specific currency. 18 numbers in total, 8 numbers after dot
	 * @example "11.35065001"
	 */
	@Column({ type: "numeric", precision: 18, scale: 8 })
	public amount_to: string;

	/** ISO 4217 currency code. Could be any 3-4 uppercase characters
	 * @example "USD"
	 */
	@Column({ type: "varchar", length: 4 })
	public currency_from: string;

	/** ISO 4217 currency code. Could be any 3-4 uppercase characters
	 * @example "USD"
	 */
	@Column({ type: "varchar", length: 4 })
	public currency_to: string;

	/** Location where transaction was made. From 1 to 100 characters
	 * @optional
	 * @example "My favorite local shop"
	 */
	@Column({ type: "varchar", length: 100, nullable: true })
	public location?: string;

	/** Notes about category from 1 to 200 characters
	 * @optional
	 * @example "Company salary"
	 */
	@Column({ type: "varchar", length: 200, nullable: true })
	public notes?: string;
}
