import { Controller } from "@nestjs/common";

import { TransactionsService } from "./transactions.service";

@Controller()
export class TransactionsController {
	constructor(private readonly transactionsService: TransactionsService) {}
}
