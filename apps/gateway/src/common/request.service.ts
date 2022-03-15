import { BadGatewayException, GatewayTimeoutException, Injectable } from "@nestjs/common";
import { ClientProxy } from "@nestjs/microservices";
import { firstValueFrom, timeout } from "rxjs";

import { RpcException } from "./HttpException";

@Injectable()
export class RequestService {
	public async sendRequest<Type>(
		service: ClientProxy,
		command: string,
		data: unknown,
		timeoutMs = 150
	): Promise<Type> {
		type Result = Type & RpcException;
		let result: Result;

		try {
			const source = service.send<Result>({ cmd: command }, data).pipe(timeout(timeoutMs));

			result = await firstValueFrom(source);

			if (result.error) throw result.error;
		} catch (err) {
			const error = err as { message: string; name: string };

			if (error.name === "HttpException") throw err;
			if (error.name === "TimeoutError") throw new GatewayTimeoutException(error.message);

			throw new BadGatewayException(error.message || "Bad Gateway");
		}

		return result;
	}
}
