import { HttpClient, HttpErrorResponse, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { catchError, Observable, throwError } from "rxjs";

import { ErrorService } from "src/app/services/error/error.service";

import { HttpException } from "../error/types/HttpException";
import { CreateTransactionDto } from "./types/request/create-transaction.dto";
import { DeleteTransactionByIdDto } from "./types/request/delete-transaction-by-id.dto";
import { GetTransactionByIdDto } from "./types/request/get-transaction-by-id.dto";
import { GetTransactionsByQueryDto } from "./types/request/get-transactions-by-query.dto";
import { UpdateTransactionByIdDto } from "./types/request/update-transaction-by-id.dto";
import { Transaction } from "./types/response/transaction.entity";

@Injectable({
	providedIn: "root",
})
export class TransactionsService {
	constructor(
		private readonly http: HttpClient,
		private readonly errorService: ErrorService
	) {}

	public getByQuery(dto?: GetTransactionsByQueryDto): Observable<Transaction[]> {
		const query = btoa(JSON.stringify(dto || {}));

		return this.http
			.get<Transaction[]>("/api/transactions", {
				params: new HttpParams({
					fromObject: { query },
				}),
			})
			.pipe(catchError((err: HttpErrorResponse) => this.errorHandler(err)));
	}

	public getById(dto: GetTransactionByIdDto) {
		return this.http.get<Transaction>(`/api/transactions/${dto.id}`);
	}

	public create(dto: CreateTransactionDto): Observable<Transaction> {
		return this.http
			.post<Transaction>("/api/transactions", dto)
			.pipe(catchError((err: HttpErrorResponse) => this.errorHandler(err)));
	}

	public updateById(dto: UpdateTransactionByIdDto): Observable<Transaction> {
		return this.http
			.put<Transaction>(`/api/transactions/${dto.id}`, dto.data)
			.pipe(catchError((err: HttpErrorResponse) => this.errorHandler(err)));
	}

	public delete(dto: DeleteTransactionByIdDto) {
		return this.http
			.delete(`/api/transactions/${dto.id}`)
			.pipe(catchError((err: HttpErrorResponse) => this.errorHandler(err)));
	}

	private errorHandler(error: HttpErrorResponse) {
		const exception = error.error as HttpException;

		this.errorService.handle(exception);

		return throwError(() => exception);
	}
}
