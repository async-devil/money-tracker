import { HttpClient, HttpErrorResponse, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BehaviorSubject, catchError, Observable, throwError } from "rxjs";

import { ErrorService } from "../error/error.service";
import { HttpException } from "../error/types/HttpException";
import { GetCategoriesByQueryDto } from "./types/request/get-categories-by-properties.dto";
import { GetCategoryByIdDto } from "./types/request/get-category-by-id.dto";
import { Category } from "./types/response/category.entity";

@Injectable({
	providedIn: "root",
})
export class CategoriesService {
	constructor(
		private readonly http: HttpClient,
		private readonly errorService: ErrorService
	) {}

	public readonly categories = new BehaviorSubject<Category[]>([]);

	public setAll() {
		this.http
			.get<Category[]>("/api/categories", {
				params: new HttpParams({
					fromObject: { query: "e30=" }, //? empty object in base64
				}),
			})
			.pipe(catchError((err: HttpErrorResponse) => this.errorHandler(err)))
			.subscribe((categories) => {
				this.categories.next(categories);
			});
	}

	public getByQuery(dto: GetCategoriesByQueryDto): Observable<Category[]> {
		const query = btoa(JSON.stringify(dto));

		return this.http
			.get<Category[]>("/api/categories", {
				params: new HttpParams({
					fromObject: { query },
				}),
			})
			.pipe(catchError((err: HttpErrorResponse) => this.errorHandler(err)));
	}

	public getById(dto: GetCategoryByIdDto) {
		return this.http.get<Category>(`/api/categories/${dto.id}`);
	}

	private errorHandler(error: HttpErrorResponse) {
		const exception = error.error as HttpException;

		this.errorService.handle(exception);

		return throwError(() => exception);
	}
}
