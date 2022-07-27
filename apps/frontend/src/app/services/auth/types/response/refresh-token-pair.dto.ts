export class RefreshTokenPairDto {
	/** @example "eyJhbGciOiJIUzI1NiJ9.eyJjbGllbnRJZCI6IjA5N2Y2MTNmLTkwYjctNDMyNi04MTIxLTkzYzZkNTE4NDVkNiIsImV4cCI6MTY1MDQ2MzAzOCwiaWF0IjoxNjUwNDYxMjM4fQ.wZ5w5ZiEuSUXm3h4MO7YCPPAdvnR8fZE9yzpwXMWn8w" */
	readonly accessToken: string;

	/** @example "2022-06-27T06:34:59.882Z" */
	readonly dueTo: string;
}
