import {
	BadGatewayException,
	GatewayTimeoutException,
	HttpException,
	Inject,
	Injectable,
} from "@nestjs/common";
import { ClientProxy } from "@nestjs/microservices";
import { timeout, firstValueFrom } from "rxjs";

import { CreateClientDto } from "./types/create-client.dto";

@Injectable()
export class ClientsService {
	constructor(@Inject("CLIENTS_SERVICE") private readonly clientsService: ClientProxy) {}

	public async createClient(dto: CreateClientDto) {
		let result: {
			error: { statusCode: number; message: string[]; error: string };
			message: string;
		};

		try {
			const source = this.clientsService
				.send<{
					error: { statusCode: number; message: string[]; error: string };
					message: string;
				}>({ cmd: "create-client" }, dto)
				.pipe(timeout(100));

			result = await firstValueFrom(source);

			if (result.error) throw new HttpException(result.error, result.error.statusCode);
		} catch (err) {
			const error: { message: string; name: string } = err as { message: string; name: string };

			if (error.name === "HttpException") throw err;
			if (error.name === "TimeoutError") throw new GatewayTimeoutException(error.message);

			throw new BadGatewayException(error.message || "Bad Gateway");
		}

		return result;
	}
}
