import { Column, Entity, ManyToOne } from "typeorm";

import { BaseEntity } from "./base.entity";
import { SessionStorage } from "./sessionStorage.entity";

@Entity({ name: "session" })
export class Session extends BaseEntity {
	@ManyToOne(() => SessionStorage, (sessionStorage) => sessionStorage.sessions)
	session_storage: SessionStorage;

	/** @example "57.37.103.24" */
	@Column({ type: "inet", nullable: false })
	ip: string;

	/** @example "Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:99.0)"*/
	@Column({ type: "varchar", nullable: false })
	device: string;
}
