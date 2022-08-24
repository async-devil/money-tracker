import { ComponentFixture, TestBed } from "@angular/core/testing";

import { TransactionOperatePanelComponent } from "./transaction-operate-panel.component";

describe("TransactionOperatePanelComponent", () => {
	let component: TransactionOperatePanelComponent;
	let fixture: ComponentFixture<TransactionOperatePanelComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			declarations: [TransactionOperatePanelComponent],
		}).compileComponents();

		fixture = TestBed.createComponent(TransactionOperatePanelComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it("should create", () => {
		expect(component).toBeTruthy();
	});
});
