import { PrimaryGeneratedColumn, UpdateDateColumn, CreateDateColumn } from "typeorm";

export abstract class BaseEntity {
	/**
	 * example: "123e4567-e89b-12d3-a456-426655440000"
	 */
	@PrimaryGeneratedColumn("uuid")
	id: string;

	/**
	 * example: "2016-06-22 19:10:25-07"
	 */
	@CreateDateColumn({ type: "timestamp with time zone", default: () => "CURRENT_TIMESTAMP" })
	createDateTime: Date;

	/**
	 * example: "2016-06-22 19:10:25-07"
	 */
	@UpdateDateColumn({ type: "timestamp with time zone", default: () => "CURRENT_TIMESTAMP" })
	lastChangedDateTime: Date;
}
