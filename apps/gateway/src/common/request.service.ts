import {
	BadGatewayException,
	GatewayTimeoutException,
	HttpException,
	Injectable,
	Logger,
} from "@nestjs/common";
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

			if (result.error) throw new HttpException(result.error, result.error.statusCode);
		} catch (err) {
			this.filterErrorByName(err as Error);
		}

		return result;
	}

	private filterErrorByName(error: Error) {
		if (error.name === "HttpException") throw error;
		if (error.name === "TimeoutError") throw new GatewayTimeoutException(error.message);

		throw new BadGatewayException(error.message || "Bad Gateway");
	}
}
