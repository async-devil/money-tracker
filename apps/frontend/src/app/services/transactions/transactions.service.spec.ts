import { HttpClientTestingModule } from "@angular/common/http/testing";
import { TestBed } from "@angular/core/testing";

import { ErrorService } from "../error/error.service";
import { TransactionsService } from "./transactions.service";

describe("TransactionsService", () => {
	let service: TransactionsService;

	beforeEach(() => {
		TestBed.configureTestingModule({
			imports: [HttpClientTestingModule],
			providers: [ErrorService],
		});
		service = TestBed.inject(TransactionsService);
	});

	it("should be created", () => {
		expect(service).toBeTruthy();
	});
});
