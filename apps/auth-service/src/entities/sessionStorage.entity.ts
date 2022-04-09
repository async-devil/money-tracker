import { Entity, OneToMany, PrimaryColumn } from "typeorm";

import { BaseEntity } from "./base.entity";
import { Session } from "./session.entity";

@Entity({ name: "session_storage" })
export class SessionStorage extends BaseEntity {
	/** @example "123e4567-e89b-12d3-a456-426655440000" */
	@PrimaryColumn({ type: "varchar", unique: true })
	client_id: string;

	@OneToMany(() => Session, (session) => session.session_storage)
	sessions: Session[];
}
