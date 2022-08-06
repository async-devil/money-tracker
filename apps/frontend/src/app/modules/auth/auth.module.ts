import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";

import { MuiModule } from "../mui.module";
import { AuthRoutingModule } from "./auth-routing.module";
import { LoginPageComponent } from "./pages/login/login-page.component";

@NgModule({
	declarations: [LoginPageComponent],
	imports: [
		CommonModule,
		RouterModule,
		ReactiveFormsModule,
		AuthRoutingModule,
		MuiModule,
	],
})
export class AuthModule {}
