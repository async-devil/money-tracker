import { ComponentFixture, TestBed } from "@angular/core/testing";

import { DashboardModuleComponent } from "./dashboard-module.component";

describe("DashboardModuleComponent", () => {
	let component: DashboardModuleComponent;
	let fixture: ComponentFixture<DashboardModuleComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			declarations: [DashboardModuleComponent],
		}).compileComponents();

		fixture = TestBed.createComponent(DashboardModuleComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it("should create", () => {
		expect(component).toBeTruthy();
	});
});
