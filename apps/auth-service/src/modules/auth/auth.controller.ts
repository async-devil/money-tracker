import { Body, Controller } from "@nestjs/common";
import { MessagePattern } from "@nestjs/microservices";

import { AuthService } from "./auth.service";
import { GenerateTokenPairDto } from "./dtos/generateTokenPair.dto";
import { GetAccessTokenExpirationDateDto } from "./dtos/get-access-token-expiration-date.dto";
import { ValidateAccessTokenDto } from "./dtos/validateAccessToken.dto";

@Controller()
export class AuthController {
	constructor(private readonly authService: AuthService) {}

	/**
	 *	Generate access and refresh tokens if refresh token is valid and not expired
	 *
	 * 	Throws:
	 * 	- { statusCode: 400, message: [
	 * 		"refresh token must be valid",
	 * 		"tokenData.ip must be an ip address",
	 * 		"tokenData.device must be a string"],
	 * 		error: "Bad request" }
	 * 	- { statusCode: 401, message: "Refresh token expired", error: "Unauthorized" }
	 * 	- { statusCode: 404, message: "Session not found", error: "Not found"}
	 * 	- { statusCode: 500, message: "Unknown error", error: "Internal server error" }
	 */
	@MessagePattern({ cmd: "generate-token-pair" })
	public async generateTokenPair(@Body() dto: GenerateTokenPairDto) {
		return await this.authService.generateTokenPair(dto);
	}

	/**
	 *	Validate access token for matching signature, if valid return true
	 *
	 * 	Throws:
	 * 	- { statusCode: 400, message: ["accessToken must be a jwt string"], error: "Bad request" }
	 * 	- { statusCode: 500, message: "Unknown error", error: "Internal server error" }
	 */
	@MessagePattern({ cmd: "validate-access-token" })
	public async validateAccessToken(@Body() dto: ValidateAccessTokenDto) {
		return await this.authService.validateAccessToken(dto);
	}

	/**
	 *	Get access token expiration date which stored in exp header
	 *
	 * 	Throws:
	 * 	- { statusCode: 400, message: ["accessToken must be a jwt string"], error: "Bad request" }
	 *  - { statusCode: 401, message: "Invalid JWT token", error: "Unauthorized" }
	 * 	- { statusCode: 500, message: "Unknown error", error: "Internal server error" }
	 */
	@MessagePattern({ cmd: "get-access-token-expiration-date" })
	public async getAccessTokenExpirationDate(@Body() dto: GetAccessTokenExpirationDateDto) {
		return this.authService.getAccessTokenExpirationDate(dto);
	}
}
