import { Injectable, CanActivate, ExecutionContext, UnauthorizedException } from "@nestjs/common";

import { AuthService } from "../auth-service.service";
import { IRequest } from "../types/interfaces/IRequest";

/**
 *	Access token guard that checks validity of the token and passes client id from it to request as clientId
 *
 * 	Throws:
 * 	- { statusCode: 400, message: ["accessToken must be a jwt string"], error: "Bad request" }
 * 	- { statusCode: 401, message: "No authorization header provided", error: "Unauthorized"}
 * 	- { statusCode: 401, message: "Invalid access token", error: "Unauthorized"}
 * 	- { statusCode: 500, message: "Unknown error", error: "Internal server error" }
 */
@Injectable()
export class AccessTokenGuard implements CanActivate {
	constructor(private readonly authService: AuthService) {}

	public async canActivate(context: ExecutionContext): Promise<boolean> {
		const request = context.switchToHttp().getRequest<IRequest>();
		const headers = request.headers;

		const authorizationHeader = headers.authorization;
		if (!authorizationHeader) throw new UnauthorizedException("No authorization header provided");

		const accessToken = authorizationHeader.replace("Bearer ", "");

		const validationResult = await this.authService.validateAccessToken({ accessToken });
		if (!validationResult.result) throw new UnauthorizedException("Invalid access token");

		const clientIdResult = await this.authService.getAccessTokenClientId({ accessToken });

		request.clientId = clientIdResult.result;

		return true;
	}
}
