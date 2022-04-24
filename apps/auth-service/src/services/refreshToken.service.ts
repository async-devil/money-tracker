import { Injectable } from "@nestjs/common";

import { HexTokenService } from "./hexToken.service";

@Injectable()
export class RefreshTokenService extends HexTokenService {
	constructor() {
		super(parseInt(process.env.REFRESH_TOKEN_EXPIRE));
	}
}
