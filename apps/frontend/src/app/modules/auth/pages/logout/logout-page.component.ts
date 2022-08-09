import { Component } from "@angular/core";
import { Router } from "@angular/router";

import { AuthService } from "src/app/services/auth/auth.service";

@Component({
	selector: "app-logout-page",
	templateUrl: "./logout-page.component.html",
	styleUrls: ["./logout-page.component.scss"],
})
export class LogoutPageComponent {
	constructor(
		private readonly authService: AuthService,
		private readonly router: Router
	) {}

	public logout() {
		this.authService.logout().subscribe(() => {
			void this.router.navigate(["/"]);
		});
	}

	public redirect() {
		void this.router.navigate(["/dashboard"]);
	}
}
