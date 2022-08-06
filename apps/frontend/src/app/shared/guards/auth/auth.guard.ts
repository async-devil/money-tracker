import { Injectable } from "@angular/core";
import {
	ActivatedRouteSnapshot,
	CanActivate,
	Router,
	RouterStateSnapshot,
} from "@angular/router";

@Injectable({
	providedIn: "root",
})
export class AuthGuard implements CanActivate {
	constructor(private readonly router: Router) {}

	public canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
		const accessToken = localStorage.getItem("accessToken");
		const dueTo = localStorage.getItem("accessTokenDueTo");

		if (accessToken && dueTo) {
			return true;
		}

		void this.router.navigate(["/auth/login"], { queryParams: { from: state.url } });
		return false;
	}
}
