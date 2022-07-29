import { ComponentFixture, TestBed } from "@angular/core/testing";

import { TransactionFilters } from "src/app/services/transactions/types/request/get-transactions-by-query.dto";
import { SetAmountColorPipe } from "src/app/shared/pipes/set-amount-color/set-amount-color.pipe";

import { TransactionComponent } from "./transaction.component";

describe("TransactionComponent", () => {
	let component: TransactionComponent;
	let fixture: ComponentFixture<TransactionComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			declarations: [TransactionComponent, SetAmountColorPipe, TransactionFilters],
		}).compileComponents();

		fixture = TestBed.createComponent(TransactionComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it("should create", () => {
		expect(component).toBeTruthy();
	});
});
