import { Injectable } from "@nestjs/common";

@Injectable()
export class AppService {
	public ping(date: number): number {
		return Date.now() - date;
	}
}
