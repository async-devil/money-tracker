import { Column, Entity } from "typeorm";

import { BaseEntity } from "./base.entity";

@Entity({ name: "client" })
export class Client extends BaseEntity {
	/** @example "test@email.com"*/
	@Column({ type: "varchar", unique: true, nullable: false })
	email: string;

	/** @example "Password5@1" */
	@Column({ type: "varchar", nullable: false })
	password: string;
}
