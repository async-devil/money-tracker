import { HttpClient } from "@angular/common/http";
import { TestBed } from "@angular/core/testing";

import { TransactionsService } from "./transactions.service";

describe("TransactionsService", () => {
	let service: TransactionsService;

	beforeEach(() => {
		TestBed.configureTestingModule({ imports: [HttpClient] });
		service = TestBed.inject(TransactionsService);
	});

	it("should be created", () => {
		expect(service).toBeTruthy();
	});
});
