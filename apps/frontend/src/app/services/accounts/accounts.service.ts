import { HttpClient, HttpParams, HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BehaviorSubject, catchError, Observable, throwError } from "rxjs";

import { ErrorService } from "../error/error.service";
import { HttpException } from "../error/types/HttpException";
import { GetAccountByIdDto } from "./types/request/get-account-by-id.dto";
import { GetAccountsByQueryDto } from "./types/request/get-accounts-by-properties.dto";
import { Account } from "./types/response/account.entity";

@Injectable({
	providedIn: "root",
})
export class AccountsService {
	constructor(
		private readonly http: HttpClient,
		private readonly errorService: ErrorService
	) {}

	public readonly accounts = new BehaviorSubject<Account[]>([]);

	public setAll(): void {
		this.http
			.get<Account[]>("/api/accounts", {
				params: new HttpParams({
					fromObject: { query: "e30=" }, //? empty object in base64
				}),
			})
			.pipe(catchError((err: HttpErrorResponse) => this.errorHandler(err)))
			.subscribe((accounts) => {
				this.accounts.next(accounts);
			});
	}

	public getByQuery(dto: GetAccountsByQueryDto): Observable<Account[]> {
		const query = btoa(JSON.stringify(dto));

		return this.http
			.get<Account[]>("/api/accounts", {
				params: new HttpParams({
					fromObject: { query },
				}),
			})
			.pipe(catchError((err: HttpErrorResponse) => this.errorHandler(err)));
	}

	public getById(dto: GetAccountByIdDto) {
		return this.http.get<Account>(`/api/accounts/${dto.id}`);
	}

	private errorHandler(error: HttpErrorResponse) {
		const exception = error.error as HttpException;

		this.errorService.handle(exception);

		return throwError(() => exception);
	}
}
