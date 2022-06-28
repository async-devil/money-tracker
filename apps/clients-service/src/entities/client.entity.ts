import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: "client" })
export class Client {
	/** @example "123e4567-e89b-12d3-a456-426655440000"*/
	@PrimaryGeneratedColumn("uuid")
	public id: string;

	/** @example "2022-06-27T06:34:59.882Z" */
	@CreateDateColumn({
		type: "timestamp with time zone",
		default: () => "CURRENT_TIMESTAMP",
	})
	public create_date_time: Date;

	/** @example "test@email.com"*/
	@Column({ type: "citext", unique: true, nullable: false })
	public email: string;

	/** @example "Password5@1" */
	@Column({ type: "text", nullable: false })
	public password: string;
}
