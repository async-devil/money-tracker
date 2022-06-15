import { Controller } from "@nestjs/common";
import { MessagePattern } from "@nestjs/microservices";

import { Account } from "src/entities/account.entity";

import { OperateAccountDto } from "./dtos/operate-account.dto";
import { OperationsService } from "./operations.service";

@Controller()
export class OperationsController {
	constructor(private readonly operationsService: OperationsService) {}

	/**
	 *	Operate account balance by id
	 *
	 * 	Throws:
	 * 	- { statusCode: 400, message: ["id must be a UUID"], error: "Bad request" }
	 * 	- { statusCode: 400, message: "Duplicate error", error: "Bad request" }
	 * 	- { statusCode: 404, message: "Account not found", error: "Not found"}
	 * 	- { statusCode: 500, message: "Unknown error", error: "Internal server error" }
	 */
	@MessagePattern({ cmd: "operate-account" })
	public async operateAccount(dto: OperateAccountDto): Promise<Account> {
		return await this.operationsService.operateAccount(dto);
	}
}
