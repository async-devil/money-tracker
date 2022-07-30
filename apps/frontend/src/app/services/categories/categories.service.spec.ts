import { HttpClientTestingModule } from "@angular/common/http/testing";
import { TestBed } from "@angular/core/testing";

import { ErrorService } from "../error/error.service";
import { CategoriesService } from "./categories.service";

describe("CategoriesService", () => {
	let service: CategoriesService;

	beforeEach(() => {
		TestBed.configureTestingModule({
			imports: [HttpClientTestingModule],
			providers: [ErrorService],
		});
		service = TestBed.inject(CategoriesService);
	});

	it("should be created", () => {
		expect(service).toBeTruthy();
	});
});
