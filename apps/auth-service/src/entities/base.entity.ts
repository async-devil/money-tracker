import { UpdateDateColumn, CreateDateColumn } from "typeorm";

export abstract class BaseEntity {
	/** @example "2016-06-22 19:10:25-07" */
	@CreateDateColumn({
		type: "timestamp with time zone",
		default: () => "CURRENT_TIMESTAMP",
	})
	create_date_time: Date;

	/** @example "2016-06-22 19:10:25-07" */
	@UpdateDateColumn({
		type: "timestamp with time zone",
		default: () => "CURRENT_TIMESTAMP",
	})
	last_changed_date_time: Date;
}
