import { ComponentFixture, TestBed } from "@angular/core/testing";

import { CategoryOperatePanelComponent } from "./category-operate-panel.component";

describe("CategoryOperatePanelComponent", () => {
	let component: CategoryOperatePanelComponent;
	let fixture: ComponentFixture<CategoryOperatePanelComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			declarations: [CategoryOperatePanelComponent],
		}).compileComponents();

		fixture = TestBed.createComponent(CategoryOperatePanelComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it("should create", () => {
		expect(component).toBeTruthy();
	});
});
