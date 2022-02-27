import { Injectable } from "@nestjs/common";

@Injectable()
export class AppService {
	public ping(): string {
		return "pong";
	}
}
