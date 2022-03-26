import { Injectable } from "@nestjs/common";

import { JWTService } from "./jwt.service";

@Injectable()
export class RefreshTokenService extends JWTService {
	constructor() {
		super(process.env.JWT_REFRESH_SECRET, parseInt(process.env.JWT_REFRESH_EXPIRE));
	}
}
