import {
	HttpRequest,
	HttpHandler,
	HttpEvent,
	HttpInterceptor,
	HttpErrorResponse,
} from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { catchError, Observable, switchMap, throwError } from "rxjs";

import { AuthService } from "src/app/services/auth/auth.service";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
	constructor(
		private readonly authService: AuthService,
		private readonly router: Router
	) {}

	public intercept(
		request: HttpRequest<unknown>,
		next: HttpHandler
	): Observable<HttpEvent<unknown>> {
		const accessToken: string | null = localStorage.getItem("accessToken");

		const copiedRequest = this.getRequestWithAuthHeader(request, accessToken);

		return next.handle(copiedRequest).pipe(
			catchError((error: HttpErrorResponse) => {
				if (
					error.status !== 401 ||
					request.url.endsWith("refresh") ||
					request.url.endsWith("login") ||
					request.url.endsWith("register")
				) {
					return throwError(() => error);
				}

				return this.authService.refreshTokens().pipe(
					catchError((error: HttpErrorResponse) => {
						return throwError(() => {
							void this.router.navigate(["/auth/login"]);
							return error;
						});
					}),
					switchMap((response) => {
						const copiedRequest = this.getRequestWithAuthHeader(
							request,
							response.accessToken
						);

						return next.handle(copiedRequest);
					})
				);
			})
		);
	}

	private getRequestWithAuthHeader(
		request: HttpRequest<unknown>,
		accessToken: string | null
	) {
		if (!accessToken) accessToken = "";

		return request.clone({
			setHeaders: {
				Authorization: `Bearer ${accessToken}`,
			},
		});
	}
}
