import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: "session" })
export class Session {
	/** @example "123e4567-e89b-12d3-a456-426655440000"*/
	@PrimaryGeneratedColumn("uuid")
	public id: string;

	/** Session 48 chars long refresh token
	 * @example "b4d72d7e7ca77bc8221f81083fc24c5ec11f3dfe446bf521"
	 */
	@Column({ type: "char", unique: true, length: 48 })
	public refresh_token: string;

	/** @example "123e4567-e89b-12d3-a456-426655440000" */
	@Column({ type: "uuid" })
	public client_id: string;

	/** @example "2022-06-27T06:34:59.882Z" */
	@Column({ type: "timestamp with time zone" })
	public valid_until: Date;

	/** @example "57.37.103.24" */
	@Column({ type: "inet" })
	public ip: string;

	/** @example "Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:99.0)"*/
	@Column({ type: "text" })
	public device: string;
}
