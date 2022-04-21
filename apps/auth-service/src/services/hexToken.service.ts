import * as crypto from "crypto";
import { promisify } from "util";

export abstract class HexTokenService {
	/**
	 * @param expiresInS token life term in seconds
	 * @param bytesAmount amount of bytes which will be transform to hex. One byte converts to two symbols
	 */
	constructor(protected readonly expiresInS: number, protected readonly bytesAmount = 24) {}

	private getRandomBytes = promisify(crypto.randomBytes);

	public async getToken(): Promise<string> {
		const tokenBuffer = await this.getRandomBytes(this.bytesAmount);
		return tokenBuffer.toString("hex");
	}

	public getExpirationDate(): Date {
		const now = Date.now();
		const expiresInMs = this.expiresInS * 1000;

		return new Date(now + expiresInMs);
	}
}
