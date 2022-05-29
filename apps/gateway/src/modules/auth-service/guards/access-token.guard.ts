import { Injectable, CanActivate, ExecutionContext, UnauthorizedException } from "@nestjs/common";

import { AuthService } from "../auth-service.service";
import { IRequest } from "../types/interfaces/IRequest";

@Injectable()
export class AccessTokenGuard implements CanActivate {
	constructor(private readonly authService: AuthService) {}

	public async canActivate(context: ExecutionContext): Promise<boolean> {
		const request = context.switchToHttp().getRequest<IRequest>();
		const cookies = request.cookies as Record<string, string>;

		const accessToken = cookies["access_token"];
		if (!accessToken) throw new UnauthorizedException("No access token provided");

		const validationResult = await this.authService.validateAccessToken({ accessToken });
		if (!validationResult.result) throw new UnauthorizedException("Invalid access token");

		const clientIdResult = await this.authService.getAccessTokenClientId({ accessToken });

		request.clientId = clientIdResult.result;

		return true;
	}
}
