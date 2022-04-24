import { ApiProperty } from "@nestjs/swagger";

export class HttpException {
	@ApiProperty({ example: 400 })
	statusCode: number;

	@ApiProperty({
		example: [["email must be email"], "Microservice timeout"],
		oneOf: [{ type: "string" }, { type: "array", items: { type: "string" } }],
	})
	message: string | string[];

	@ApiProperty({ example: "Bad Request" })
	error: string;
}

export class RpcException {
	error: HttpException;
}
