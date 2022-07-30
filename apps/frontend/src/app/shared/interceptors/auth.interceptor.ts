import {
	HttpRequest,
	HttpHandler,
	HttpEvent,
	HttpInterceptor,
	HttpErrorResponse,
} from "@angular/common/http";
import { Injectable } from "@angular/core";
import { catchError, Observable, switchMap, throwError } from "rxjs";

import { AuthService } from "src/app/services/auth/auth.service";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
	constructor(private readonly authService: AuthService) {}

	public intercept(
		request: HttpRequest<unknown>,
		next: HttpHandler
	): Observable<HttpEvent<unknown>> {
		const accessToken: string | null = localStorage.getItem("accessToken");

		const copiedRequest = this.getRequestWithAuthHeader(request, accessToken);

		console.log("hello");

		return next.handle(copiedRequest).pipe(
			catchError((error: HttpErrorResponse) => {
				if (error.status !== 401 || request.url.endsWith("refresh")) {
					return throwError(() => error);
				}

				return this.authService.refreshTokens().pipe(
					switchMap((response) => {
						const copiedRequest = this.getRequestWithAuthHeader(
							request,
							response.accessToken
						);

						console.log(response);

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