import { Inject, Injectable } from "@nestjs/common";
import { ClientProxy } from "@nestjs/microservices";

@Injectable()
export class AppService {
	constructor(@Inject("CLIENTS_SERVICE") private clientsService: ClientProxy) {}

	public ping() {
		return this.clientsService.send({ cmd: "ping" }, "");
	}
}
