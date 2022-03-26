import { Injectable } from "@nestjs/common";

import { JWTService } from "./jwt.service";

@Injectable()
export class AccessTokenService extends JWTService {
	constructor() {
		super(process.env.JWT_ACCESS_SECRET, parseInt(process.env.JWT_ACCESS_EXPIRE));
	}
}
