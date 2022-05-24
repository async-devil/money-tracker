import { Controller } from "@nestjs/common";
import { MessagePattern, Payload } from "@nestjs/microservices";

import { AccessService } from "./access.service";
import { ValidateClientCredentialsDto } from "./dtos/validate-client-credentials.dto";

@Controller()
export class AccessController {
	constructor(private readonly accessService: AccessService) {}

	/**
	 *	Validate client email and password, if invalid throw
	 *
	 * 	Throws:
	 * 	- { statusCode: 400, message: ["email must be email"], error: "Bad request" }
	 * 	- { statusCode: 401, message: "Invalid client credentials", error: "Unauthorized" }
	 */
	@MessagePattern({ cmd: "validate-client-credentials" })
	public async validateClientCredentials(
		@Payload() dto: ValidateClientCredentialsDto
	): Promise<{ result: boolean }> {
		return await this.accessService.validateClientCredentials(dto);
	}
}
