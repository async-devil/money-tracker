import { HttpClient, HttpErrorResponse, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { catchError, Observable, throwError } from "rxjs";

import { ErrorService } from "../error/error.service";
import { HttpException } from "../error/types/HttpException";
import { CreateCategoryDto } from "./types/request/create-category.dto";
import { DeleteCategoryByIdDto } from "./types/request/delete-category-by-id.dto";
import { GetCategoriesByQueryDto } from "./types/request/get-categories-by-properties.dto";
import { GetCategoryByIdDto } from "./types/request/get-category-by-id.dto";
import { UpdateCategoryByIdDto } from "./types/request/update-category-by-id.dto";
import { Category } from "./types/response/category.entity";

@Injectable({
	providedIn: "root",
})
export class CategoriesService {
	constructor(
		private readonly http: HttpClient,
		private readonly errorService: ErrorService
	) {}

	public getByQuery(dto?: GetCategoriesByQueryDto): Observable<Category[]> {
		const query = btoa(JSON.stringify(dto || {}));

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

	public create(dto: CreateCategoryDto): Observable<Category> {
		return this.http
			.post<Category>("/api/categories", dto)
			.pipe(catchError((err: HttpErrorResponse) => this.errorHandler(err)));
	}

	public updateById(dto: UpdateCategoryByIdDto): Observable<Category> {
		return this.http
			.put<Category>(`/api/categories/${dto.id}`, dto.data)
			.pipe(catchError((err: HttpErrorResponse) => this.errorHandler(err)));
	}

	public delete(dto: DeleteCategoryByIdDto) {
		return this.http
			.delete(`/api/categories/${dto.id}`)
			.pipe(catchError((err: HttpErrorResponse) => this.errorHandler(err)));
	}

	private errorHandler(error: HttpErrorResponse) {
		const exception = error.error as HttpException;

		this.errorService.handle(exception);

		return throwError(() => exception);
	}
}
