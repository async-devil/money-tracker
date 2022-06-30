import { Body, Controller, NotFoundException, Param, Post, Req, UseGuards } from "@nestjs/common";
import { ApiCookieAuth, ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";

import { HttpException } from "src/common/HttpException";
import { AccessTokenGuard } from "src/modules/auth-service/guards/access-token.guard";
import { IRequest } from "src/modules/auth-service/types/interfaces/IRequest";

import { AccountsService } from "../accounts-service.service";
import { OperateAccountControllerDto } from "../types/request/operate-account-dto";
import { Account } from "../types/response/account.entity";

@ApiTags("Accounts service")
@Controller()
export class OperationsRouteController {
	constructor(private readonly accountsService: AccountsService) {}

	@ApiOperation({ summary: "Operate account balance by id" })
	@ApiResponse({
		status: 201,
		type: Account,
	})
	@ApiResponse({ status: 400, type: HttpException, description: "Invalid request" })
	@ApiResponse({ status: 400, type: HttpException, description: "Duplicate error" })
	@ApiResponse({ status: 401, type: HttpException, description: "No access token provided" })
	@ApiResponse({ status: 401, type: HttpException, description: "Invalid access token" })
	@ApiResponse({ status: 404, type: HttpException, description: "Account not found" })
	@ApiResponse({ status: 504, type: HttpException, description: "Microservice timeout" })
	@ApiResponse({ status: 502, type: HttpException, description: "Bad gateway" })
	@ApiCookieAuth()
	@UseGuards(AccessTokenGuard)
	@Post("/operate/:id")
	public async operateAccount(
		@Req() request: IRequest,
		@Param("id") id: string,
		@Body() dto: OperateAccountControllerDto
	) {
		const account = await this.accountsService.getAccountById({ id });

		if (account.owner !== request.clientId) throw new NotFoundException("Account not found");

		return await this.accountsService.operateAccount({
			accountId: id,
			amount: dto.amount,
			type: dto.type,
		});
	}
}
