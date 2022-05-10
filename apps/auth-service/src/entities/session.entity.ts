import { Column, Entity } from "typeorm";

import { BaseEntity } from "./base.entity";

@Entity({ name: "session" })
export class Session extends BaseEntity {
	/** @example "b4d72d7e7ca77bc8221f81083fc24c5ec11f3dfe446bf521" */
	@Column({ type: "varchar", unique: true })
	refresh_token: string;

	/** @example "123e4567-e89b-12d3-a456-426655440000" */
	@Column({ type: "varchar" })
	client_id: string;

	@Column({ type: "timestamp with time zone" })
	valid_until: Date;

	/** @example "57.37.103.24" */
	@Column({ type: "inet" })
	ip: string;

	/** @example "Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:99.0)"*/
	@Column({ type: "varchar" })
	device: string;
}
