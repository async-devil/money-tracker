import { HttpClientTestingModule } from "@angular/common/http/testing";
import { TestBed } from "@angular/core/testing";

import { ErrorService } from "../error/error.service";
import { AccountsService } from "./accounts.service";

describe("AccountsService", () => {
	let service: AccountsService;

	beforeEach(() => {
		TestBed.configureTestingModule({
			imports: [HttpClientTestingModule],
			providers: [ErrorService],
		});
		service = TestBed.inject(AccountsService);
	});

	it("should be created", () => {
		expect(service).toBeTruthy();
	});
});
