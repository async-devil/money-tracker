import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

export enum TransactionType {
	RECHARGE = "recharge",
	WITHDRAW = "withdraw",
	TRANSFER = "transfer",
}

@Entity({ name: "transaction" })
export class Transaction {
	/** @example "123e4567-e89b-12d3-a456-426655440000"*/
	@PrimaryGeneratedColumn("uuid")
	public id: string;

	/** @example "123e4567-e89b-12d3-a456-426655440000" */
	@Column({ type: "uuid" })
	public owner: string;

	/** @example "recharge" */
	@Column({ type: "enum", enum: TransactionType })
	public type: TransactionType;

	/** @example "2022-06-27T06:34:59.882Z" */
	@Column({ type: "timestamp with time zone" })
	public date: Date;

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

	/** Location where transaction was made
	 * @optional
	 * @example "My favorite local shop"
	 */
	@Column({ type: "text", nullable: true })
	public location?: string;

	/** Notes about transaction
	 * @optional
	 * @example "Company salary"
	 */
	@Column({ type: "text", nullable: true })
	public notes?: string;
}
