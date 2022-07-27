export class HttpException {
	/** @example 400 */
	readonly statusCode: number;

	/** @example [["email must be email"], "Microservice timeout"] */
	readonly message: string | string[];

	/** @example "Bad Request" */
	readonly error: string;
}
