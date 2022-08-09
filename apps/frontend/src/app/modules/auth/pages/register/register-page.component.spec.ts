import { HttpClientTestingModule } from "@angular/common/http/testing";
import { ComponentFixture, TestBed } from "@angular/core/testing";
import { RouterTestingModule } from "@angular/router/testing";

import { RegisterPageComponent } from "./register-page.component";

describe("RegisterPageComponent", () => {
	let component: RegisterPageComponent;
	let fixture: ComponentFixture<RegisterPageComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			imports: [HttpClientTestingModule, RouterTestingModule],
			declarations: [RegisterPageComponent],
		}).compileComponents();

		fixture = TestBed.createComponent(RegisterPageComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it("should create", () => {
		expect(component).toBeTruthy();
	});
});
