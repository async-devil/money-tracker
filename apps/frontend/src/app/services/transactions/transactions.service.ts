import { HttpClient, HttpErrorResponse, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BehaviorSubject, catchError, Observable, throwError } from "rxjs";

import { ErrorService } from "src/app/services/error/error.service";

import { HttpException } from "../error/types/HttpException";
import { GetTransactionByIdDto } from "./types/request/get-transaction-by-id.dto";
import { GetTransactionsByQueryDto } from "./types/request/get-transactions-by-query.dto";
import { Transaction } from "./types/response/transaction.entity";

@Injectable({
	providedIn: "root",
})
export class TransactionsService {
	constructor(
		private readonly http: HttpClient,
		private readonly errorService: ErrorService
	) {}

	public readonly transactions = new BehaviorSubject<Transaction[]>([]);

	public setAll(): void {
		this.http
			.get<Transaction[]>("/api/transactions", {
				params: new HttpParams({
					fromObject: { query: "e30=" }, //? empty object in base64
				}),
			})
			.pipe(catchError((err: HttpErrorResponse) => this.errorHandler(err)))
			.subscribe((transactions) => {
				this.transactions.next(transactions);
			});
	}

	public getByQuery(dto: GetTransactionsByQueryDto): Observable<Transaction[]> {
		const query = btoa(JSON.stringify(dto));

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

	private errorHandler(error: HttpErrorResponse) {
		const exception = error.error as HttpException;

		this.errorService.handle(exception);

		return throwError(() => exception);
	}
}
