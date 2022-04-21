import { Injectable } from "@nestjs/common";

import { HexTokenService } from "./hexToken.service";

@Injectable()
export class RefreshTokenService extends HexTokenService {
	constructor() {
		super(parseInt(process.env.JWT_REFRESH_EXPIRE));
	}
}
