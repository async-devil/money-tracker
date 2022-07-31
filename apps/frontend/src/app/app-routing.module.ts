import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

import { DashboardPageComponent } from "./pages/dashboard/dashboard-page/dashboard-page.component";
import { IndexPageComponent } from "./pages/index/index-page/index-page.component";
import { LoginPageComponent } from "./pages/login/login-page/login-page.component";
import { TransactionsPageComponent } from "./pages/transactions/transactions-page/transactions-page.component";
import { AuthGuard } from "./shared/guards/auth/auth.guard";

const routes: Routes = [
	{ path: "", component: IndexPageComponent },
	{
		path: "dashboard",
		component: DashboardPageComponent,
		canActivate: [AuthGuard],
	},
	{
		path: "dashboard/transactions",
		component: TransactionsPageComponent,
		canActivate: [AuthGuard],
	},
	{
		path: "login",
		component: LoginPageComponent,
	},
];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule],
})
export class AppRoutingModule {}
