import { UnauthorizedException } from "@nestjs/common";
import * as jose from "jose";

export abstract class JWTService {
	protected readonly secretKey: string;
	protected readonly expiresInS: number;

	constructor(secretKey: string, expiresInS: number) {
		this.secretKey = secretKey;
		this.expiresInS = expiresInS;
	}

	/** Get key acceptable for signing jwt */
	private getKey(): Buffer {
		return Buffer.from(Buffer.from(this.secretKey).toString("base64url"));
	}

	public async signJwt(message: jose.JWTPayload): Promise<string> {
		return await new jose.SignJWT(message)
			.setProtectedHeader({ alg: "HS256" })
			.setExpirationTime(`${this.expiresInS}s`)
			.setIssuedAt()
			.sign(this.getKey());
	}

	public async getJwtData(jwt: string): Promise<jose.JWTDecryptResult> {
		try {
			return await jose.jwtDecrypt(jwt, this.getKey());
		} catch (err) {
			const error = err as Error;
			throw new UnauthorizedException(error.message);
		}
	}

	public async isValidJwt(jwt: string): Promise<boolean> {
		try {
			if (await this.getJwtData(jwt)) return true;
		} catch (err) {
			return false;
		}
	}
}
