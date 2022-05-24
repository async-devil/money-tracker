import { Controller } from "@nestjs/common";

import { AuthService } from "../auth-service.service";

@Controller()
export class SessionRouteController {
	constructor(private readonly authService: AuthService) {}
}
