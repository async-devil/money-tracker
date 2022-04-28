import { Controller, Delete, Get, HttpException, Param } from "@nestjs/common";
import { ApiOperation, ApiResponse } from "@nestjs/swagger";

import { AuthService } from "../auth-service.service";
import { Session } from "../types/response/session.entity";

@Controller()
export class SessionStorageRouteController {
	constructor(private readonly authService: AuthService) {}

	@ApiOperation({ summary: "create all sessions by client id" })
	@ApiResponse({
		status: 200,
		type: [Session],
		description: "Sessions",
	})
	@ApiResponse({ status: 400, type: HttpException, description: "Invalid request" })
	@ApiResponse({ status: 504, type: HttpException, description: "Microservice timeout" })
	@ApiResponse({ status: 502, type: HttpException, description: "Bad gateway" })
	@Get("/session/storage/:clientId")
	public async getSessionStorageByClientId(
		@Param("clientId") clientId: string
	): Promise<Session[]> {
		return await this.authService.getAllSessionsByClientId({ clientId });
	}

	@ApiOperation({ summary: "delete all sessions by client id" })
	@ApiResponse({
		status: 200,
		description: "Nothing",
	})
	@ApiResponse({ status: 400, type: HttpException, description: "Invalid request" })
	@ApiResponse({ status: 504, type: HttpException, description: "Microservice timeout" })
	@ApiResponse({ status: 502, type: HttpException, description: "Bad gateway" })
	@Delete("/session/storage/:clientId")
	public async deleteSessionStorageByClientId(
		@Param("clientId") clientId: string
	): Promise<Record<string, never>> {
		return await this.authService.deleteAllSessionsByClientId({ clientId });
	}
}
