import { ComponentFixture, TestBed } from "@angular/core/testing";

import { SelectOperationPanelComponent } from "./select-operation-panel.component";

describe("SelectOperationPanelComponent", () => {
	let component: SelectOperationPanelComponent;
	let fixture: ComponentFixture<SelectOperationPanelComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			declarations: [SelectOperationPanelComponent],
		}).compileComponents();

		fixture = TestBed.createComponent(SelectOperationPanelComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it("should create", () => {
		expect(component).toBeTruthy();
	});
});
