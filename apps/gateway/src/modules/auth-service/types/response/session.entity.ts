import { ApiProperty } from "@nestjs/swagger";
export class Session {
	/** @example "b4d72d7e7ca77bc8221f81083fc24c5ec11f3dfe446bf521" */
	@ApiProperty({ example: "b4d72d7e7ca77bc8221f81083fc24c5ec11f3dfe446bf521" })
	readonly refresh_token: string;

	/** @example "123e4567-e89b-12d3-a456-426655440000" */
	@ApiProperty({ example: "123e4567-e89b-12d3-a456-426655440000" })
	readonly client_id: string;

	/** @example "57.37.103.24" */
	@ApiProperty({ example: "57.37.103.24" })
	readonly ip: string;

	/** @example "Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:99.0)"*/
	@ApiProperty({ example: "Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:99.0)" })
	readonly device: string;

	/** @example "2016-06-22 19:10:25-07" */
	@ApiProperty({ example: "2016-06-22 19:10:25-07" })
	readonly create_date_time: Date;

	/** @example "2016-06-22 19:10:25-07" */
	@ApiProperty({ example: "2016-06-22 19:10:25-07" })
	readonly last_changed_date_time: Date;
}
