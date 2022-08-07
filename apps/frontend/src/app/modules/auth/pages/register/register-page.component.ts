import { HttpErrorResponse } from "@angular/common/http";
import { Component, OnInit } from "@angular/core";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { tap } from "rxjs";

import { AuthService } from "src/app/services/auth/auth.service";

@Component({
	selector: "app-register-page",
	templateUrl: "./register-page.component.html",
	styleUrls: ["./register-page.component.scss"],
})
export class RegisterPageComponent implements OnInit {
	constructor(
		private readonly authService: AuthService,
		private readonly router: Router
	) {}

	public ngOnInit() {
		this.form.valueChanges
			.pipe(
				tap(() => {
					this.isValid = this.form.status === "VALID";
				})
			)
			.subscribe();
	}

	public isValid = false;
	public isPasswordHidden = true;
	public registerError: string | undefined;
	public isLoading = false;

	public form = new FormGroup({
		email: new FormControl("", [Validators.required, Validators.email]),
		password: new FormControl("", [
			Validators.required,
			Validators.minLength(6),
			Validators.pattern(/^(?=.*[A-Z])(?=.*[!@#$&*.,?%^])(?=.*[0-9])(?=.*[a-z]).*$/),
		]),
	});

	public getEmailErrorMessage() {
		if (this.form.controls.email.hasError("email")) {
			return "Email must be a valid email address";
		}

		return undefined;
	}

	public getPasswordErrorMessage() {
		if (this.form.controls.password.hasError("pattern")) {
			return "Password must contain only latin and at least one capital character, number and one of the following characters: !@#$&*.,?%^";
		}

		if (this.form.controls.password.hasError("minlength")) {
			return "Password must contain at least 6 characters";
		}

		return undefined;
	}

	public setRegisterErrorMessage(statusCode: number) {
		if (statusCode === 400) {
			this.registerError = "Duplicate client";
		}
	}

	public onSubmit() {
		if (this.isValid) {
			this.isLoading = true;

			this.authService
				.register({
					email: this.form.value.email as string,
					password: this.form.value.password as string,
				})
				.subscribe({
					next: () => {
						this.registerError = undefined;
						this.isLoading = false;

						this.authService.refreshTokens().subscribe(() => {
							void this.router.navigate(["/dashboard"]);
						});
					},
					error: (error: HttpErrorResponse) => {
						this.isLoading = false;
						this.setRegisterErrorMessage(error.status);
					},
				});
		}
	}
}
