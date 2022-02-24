import { ApiProperty } from "@nestjs/swagger";
import { Column, Entity } from "typeorm";

import { BaseEntity } from "../../models/base.entity";

@Entity({ name: "client" })
export class Client extends BaseEntity {
	@Column({ type: "varchar", unique: true, nullable: false })
	@ApiProperty({ example: "test@email.com" })
	email: string;

	@Column({ type: "varchar", nullable: false })
	@ApiProperty({ example: "Password5@1" })
	password: string;
}
