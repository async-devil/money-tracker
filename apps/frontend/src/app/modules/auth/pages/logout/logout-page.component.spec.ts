import { HttpClientTestingModule } from "@angular/common/http/testing";
import { ComponentFixture, TestBed } from "@angular/core/testing";
import { RouterTestingModule } from "@angular/router/testing";

import { LogoutPageComponent } from "./logout-page.component";

describe("LogoutPageComponent", () => {
	let component: LogoutPageComponent;
	let fixture: ComponentFixture<LogoutPageComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			imports: [HttpClientTestingModule, RouterTestingModule],
			declarations: [LogoutPageComponent],
		}).compileComponents();

		fixture = TestBed.createComponent(LogoutPageComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it("should create", () => {
		expect(component).toBeTruthy();
	});
});
