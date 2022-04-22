import { ApiProperty } from "@nestjs/swagger";

export class TokenPairDto {
	/** @example "eyJhbGciOiJIUzI1NiJ9.eyJjbGllbnRJZCI6IjA5N2Y2MTNmLTkwYjctNDMyNi04MTIxLTkzYzZkNTE4NDVkNiIsImV4cCI6MTY1MDQ2MzAzOCwiaWF0IjoxNjUwNDYxMjM4fQ.wZ5w5ZiEuSUXm3h4MO7YCPPAdvnR8fZE9yzpwXMWn8w" */
	@ApiProperty({
		example:
			"eyJhbGciOiJIUzI1NiJ9.eyJjbGllbnRJZCI6IjA5N2Y2MTNmLTkwYjctNDMyNi04MTIxLTkzYzZkNTE4NDVkNiIsImV4cCI6MTY1MDQ2MzAzOCwiaWF0IjoxNjUwNDYxMjM4fQ.wZ5w5ZiEuSUXm3h4MO7YCPPAdvnR8fZE9yzpwXMWn8w",
	})
	readonly accessToken: string;

	/** @example "b4d72d7e7ca77bc8221f81083fc24c5ec11f3dfe446bf521" */
	@ApiProperty({ example: "b4d72d7e7ca77bc8221f81083fc24c5ec11f3dfe446bf521" })
	readonly refreshToken: string;
}
