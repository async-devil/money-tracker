import { UpdateDateColumn, CreateDateColumn, PrimaryGeneratedColumn } from "typeorm";

export abstract class BaseEntity {
	/** @example "123e4567-e89b-12d3-a456-426655440000"*/
	@PrimaryGeneratedColumn("uuid")
	public id: string;

	/** @example "2016-06-22 19:10:25-07" */
	@CreateDateColumn({
		type: "timestamp with time zone",
		default: () => "CURRENT_TIMESTAMP",
	})
	public create_date_time: Date;

	/** @example "2016-06-22 19:10:25-07" */
	@UpdateDateColumn({
		type: "timestamp with time zone",
		default: () => "CURRENT_TIMESTAMP",
	})
	public last_changed_date_time: Date;
}
