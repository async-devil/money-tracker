import { ApiProperty } from "@nestjs/swagger";

export class ValidateAccessTokenDto {
	/** @example "eyJhbGciOiJIUzI1NiJ9.eyJjbGllbnRJZCI6IjA5N2Y2MTNmLTkwYjctNDMyNi04MTIxLTkzYzZkNTE4NDVkNiIsImV4cCI6MTY1MDQ2MzAzOCwiaWF0IjoxNjUwNDYxMjM4fQ.wZ5w5ZiEuSUXm3h4MO7YCPPAdvnR8fZE9yzpwXMWn8w" */
	@ApiProperty({
		example:
			"eyJhbGciOiJIUzI1NiJ9.eyJjbGllbnRJZCI6IjA5N2Y2MTNmLTkwYjctNDMyNi04MTIxLTkzYzZkNTE4NDVkNiIsImV4cCI6MTY1MDQ2MzAzOCwiaWF0IjoxNjUwNDYxMjM4fQ.wZ5w5ZiEuSUXm3h4MO7YCPPAdvnR8fZE9yzpwXMWn8w",
	})
	readonly accessToken: string;
}
