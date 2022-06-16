import { Injectable } from "@nestjs/common";

@Injectable()
export class AppService {
	public ping(text: string): string {
		return `categories-service sends ${text}`;
	}
}
