import { HttpClient, HttpParams, HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { catchError, Observable, throwError } from "rxjs";

import { ErrorService } from "../error/error.service";
import { HttpException } from "../error/types/HttpException";
import { CreateAccountDto } from "./types/request/create-account.dto";
import { DeleteAccountByIdDto } from "./types/request/delete-account-by-id.dto";
import { GetAccountByIdDto } from "./types/request/get-account-by-id.dto";
import { GetAccountsByQueryDto } from "./types/request/get-accounts-by-properties.dto";
import { UpdateAccountByIdDto } from "./types/request/update-account-by-id.dto";
import { Account } from "./types/response/account.entity";

@Injectable({
	providedIn: "root",
})
export class AccountsService {
	constructor(
		private readonly http: HttpClient,
		private readonly errorService: ErrorService
	) {}

	public getByQuery(dto?: GetAccountsByQueryDto): Observable<Account[]> {
		const query = btoa(JSON.stringify(dto || {}));

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

	public create(dto: CreateAccountDto): Observable<Account> {
		return this.http
			.post<Account>("/api/accounts", dto)
			.pipe(catchError((err: HttpErrorResponse) => this.errorHandler(err)));
	}

	public updateById(dto: UpdateAccountByIdDto): Observable<Account> {
		return this.http
			.put<Account>(`/api/accounts/${dto.id}`, dto.data)
			.pipe(catchError((err: HttpErrorResponse) => this.errorHandler(err)));
	}

	public delete(dto: DeleteAccountByIdDto) {
		return this.http
			.delete(`/api/accounts/${dto.id}`)
			.pipe(catchError((err: HttpErrorResponse) => this.errorHandler(err)));
	}

	private errorHandler(error: HttpErrorResponse) {
		const exception = error.error as HttpException;

		this.errorService.handle(exception);

		return throwError(() => exception);
	}
}
