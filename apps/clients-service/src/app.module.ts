import { Module } from "@nestjs/common";

import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { AccessModule } from "./modules/access/access.module";
import { ClientsModule } from "./modules/clients/clients.module";

@Module({
	imports: [ClientsModule, AccessModule],
	controllers: [AppController],
	providers: [AppService],
})
export class AppModule {}
