import { ApiProperty } from "@nestjs/swagger";

export class Client {
	/** @example "54d45c35-f390-4a73-bf20-353ffffa2c42" */
	@ApiProperty({ example: "54d45c35-f390-4a73-bf20-353ffffa2c42" })
	readonly id: string;

	/** @example "test@email.com" */
	@ApiProperty({ example: "test@email.com" })
	readonly email: string;

	/** @example "Password5@1" */
	@ApiProperty({ example: "Password5@1" })
	readonly password: string;

	/** @example "2016-06-22 19:10:25-07" */
	@ApiProperty({ example: "2016-06-22 19:10:25-07" })
	readonly create_date_time: Date;

	/** @example "2016-06-22 19:10:25-07" */
	@ApiProperty({ example: "2016-06-22 19:10:25-07" })
	readonly last_changed_date_time: Date;
}
