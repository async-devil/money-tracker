import { Controller } from "@nestjs/common";

import { AuthService } from "./auth-service.service";

@Controller("auth")
export class AuthController {
	constructor(private readonly authService: AuthService) {}
}
