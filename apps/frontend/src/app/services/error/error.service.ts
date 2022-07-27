import { Injectable } from "@angular/core";
import { Subject } from "rxjs";

import { HttpException } from "./types/HttpException";

@Injectable({
	providedIn: "root",
})
export class ErrorService {
	error$ = new Subject<HttpException | null>();

	public handle(exception: HttpException) {
		this.error$.next(exception);
	}

	public clear() {
		this.error$.next(null);
	}
}
