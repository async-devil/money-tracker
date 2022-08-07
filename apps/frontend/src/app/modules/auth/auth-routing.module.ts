import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

import { LoginPageComponent } from "./pages/login/login-page.component";
import { LogoutPageComponent } from "./pages/logout/logout-page.component";
import { RegisterPageComponent } from "./pages/register/register-page.component";

const routes: Routes = [
	{
		path: "login",
		component: LoginPageComponent,
	},
	{
		path: "register",
		component: RegisterPageComponent,
	},
	{
		path: "logout",
		component: LogoutPageComponent,
	},
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule],
})
export class AuthRoutingModule {}
