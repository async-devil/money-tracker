import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, tap } from "rxjs";

import { LoginDto } from "./types/request/login.dto";
import { RegisterDto } from "./types/request/register.dto";
import { RefreshTokenPairDto } from "./types/response/refresh-token-pair.dto";

@Injectable({
	providedIn: "root",
})
export class AuthService {
	constructor(private readonly http: HttpClient) {}

	public register(dto: RegisterDto): Observable<void> {
		return this.http.post<void>("/api/auth/register", dto);
	}

	public login(dto: LoginDto): Observable<void> {
		return this.http.post<void>("/api/auth/login", dto);
	}

	public refreshTokens(): Observable<RefreshTokenPairDto> {
		return this.http.post<RefreshTokenPairDto>("/api/auth/refresh", {}).pipe(
			tap((result) => {
				localStorage.setItem("accessToken", result.accessToken);
				localStorage.setItem("accessTokenDueTo", result.dueTo);
			})
		);
	}

	public logout(): Observable<void> {
		return this.http.post<void>("/api/auth/logout", {}).pipe(
			tap(() => {
				localStorage.removeItem("accessToken");
				localStorage.removeItem("accessTokenDueTo");
			})
		);
	}
}
