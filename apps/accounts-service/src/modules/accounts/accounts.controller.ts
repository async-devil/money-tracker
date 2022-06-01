import { Controller } from "@nestjs/common";

import { AccountsService } from "./accounts.service";

@Controller()
export class AccountsController {
	constructor(private readonly accountsService: AccountsService) {}
}
