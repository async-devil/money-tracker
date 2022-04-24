import { Injectable } from "@nestjs/common";

import { JWTService } from "./jwt.service";

@Injectable()
export class AccessTokenService extends JWTService {
	constructor() {
		super(process.env.ACCESS_TOKEN_SECRET, parseInt(process.env.ACCESS_TOKEN_EXPIRE));
	}
}
