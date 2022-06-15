import { Module } from "@nestjs/common";

import { AccountsModule } from "src/modules/accounts/accounts.module";

import { OperationsController } from "./operations.controller";
import { OperationsService } from "./operations.service";

@Module({
	imports: [AccountsModule],
	controllers: [OperationsController],
	providers: [OperationsService],
	exports: [OperationsService],
})
export class OperationsModule {}
