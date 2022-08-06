import { HttpErrorResponse } from "@angular/common/http";
import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { tap } from "rxjs/operators";

import { AuthService } from "src/app/services/auth/auth.service";

@Component({
	selector: "app-login-page",
	templateUrl: "./login-page.component.html",
	styleUrls: ["./login-page.component.scss"],
})
export class LoginPageComponent implements OnInit {
	constructor(
		private readonly authService: AuthService,
		private readonly router: Router,
		private readonly activeRoute: ActivatedRoute
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
	public loginError: string | undefined;
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

	public setLoginErrorMessage(statusCode: number) {
		if (statusCode === 401) {
			this.loginError = "Invalid credentials";
		}
	}

	public onSubmit() {
		if (this.isValid) {
			this.isLoading = true;

			this.authService
				.login({
					email: this.form.value.email as string,
					password: this.form.value.password as string,
				})
				.subscribe({
					next: () => {
						this.loginError = undefined;
						this.isLoading = false;

						const from = this.activeRoute.snapshot.queryParamMap.get("from");

						this.authService.refreshTokens().subscribe(() => {
							void this.router.navigate([from || "/"]);
						});
					},
					error: (error: HttpErrorResponse) => {
						this.isLoading = false;
						this.setLoginErrorMessage(error.status);
					},
				});
		}
	}
}
