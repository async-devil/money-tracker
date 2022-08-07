import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";

import { MuiModule } from "../mui.module";
import { AuthRoutingModule } from "./auth-routing.module";
import { LoginPageComponent } from "./pages/login/login-page.component";
import { LogoutPageComponent } from "./pages/logout/logout-page.component";
import { RegisterPageComponent } from "./pages/register/register-page.component";

@NgModule({
	declarations: [LoginPageComponent, RegisterPageComponent, LogoutPageComponent],
	imports: [
		CommonModule,
		RouterModule,
		ReactiveFormsModule,
		AuthRoutingModule,
		MuiModule,
	],
})
export class AuthModule {}
