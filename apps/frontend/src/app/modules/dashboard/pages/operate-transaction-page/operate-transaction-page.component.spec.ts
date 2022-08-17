import { ComponentFixture, TestBed } from "@angular/core/testing";

import { OperateTransactionPageComponent } from "./operate-transaction-page.component";

describe("OperateTransactionPageComponent", () => {
	let component: OperateTransactionPageComponent;
	let fixture: ComponentFixture<OperateTransactionPageComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			declarations: [OperateTransactionPageComponent],
		}).compileComponents();

		fixture = TestBed.createComponent(OperateTransactionPageComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it("should create", () => {
		expect(component).toBeTruthy();
	});
});
