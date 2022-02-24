import { forwardRef, Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";

import { ErrorsService } from "../errors/errors.service";
import { ClientsController } from "./clients.controller";
import { ClientsService } from "./clients.service";
import { Client } from "./models/client.entity";

@Module({
	imports: [
		TypeOrmModule.forFeature([Client]),
		// forwardRef(() => AuthModule),
	],
	controllers: [ClientsController],
	providers: [ClientsService, ErrorsService],
	exports: [ClientsService],
})
export class ClientsModule {}
