import { Column, Entity, ManyToOne, JoinColumn, PrimaryColumn } from "typeorm";

import { BaseEntity } from "./base.entity";
import { SessionStorage } from "./sessionStorage.entity";

@Entity({ name: "session" })
export class Session extends BaseEntity {
	/** @example "eyJhbGciOiJIUzI1NiJ9.eyJleHAiOjE2NDk0MTkzMDR9.GRnpWKUZmeAJvJzc4oIXceH1Bz3kyLHJBAx_pfG2iJg" */
	@PrimaryColumn({ type: "varchar", nullable: false, unique: true })
	refresh_token: string;

	/** @example "123e4567-e89b-12d3-a456-426655440000" */
	@ManyToOne(() => SessionStorage)
	@JoinColumn({ name: "client_id" })
	client_id: string;

	/** @example "57.37.103.24" */
	@Column({ type: "inet", nullable: false })
	ip: string;

	/** @example "Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:99.0)"*/
	@Column({ type: "varchar", nullable: false })
	device: string;
}
