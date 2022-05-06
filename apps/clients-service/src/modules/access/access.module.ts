import { Module } from "@nestjs/common";

import { ClientsModule } from "src/modules/clients/clients.module";

import { AccessController } from "./access.controller";
import { AccessService } from "./access.service";

@Module({
	imports: [ClientsModule],
	controllers: [AccessController],
	providers: [AccessService],
	exports: [AccessService],
})
export class AccessModule {}
