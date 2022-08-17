import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

import { AuthGuard } from "src/app/shared/guards/auth/auth.guard";

import { AccountsPageComponent } from "./pages/accounts/accounts-page.component";
import { DashboardPageComponent } from "./pages/dashboard/dashboard-page.component";
import { DashboardModuleComponent } from "./pages/index/dashboard-module.component";
import { OperateTransactionPageComponent } from "./pages/operate-transaction-page/operate-transaction-page.component";
import { TransactionsPageComponent } from "./pages/transactions/transactions-page.component";

const routes: Routes = [
	{
		path: "",
		component: DashboardModuleComponent,
		canActivate: [AuthGuard],
		children: [
			{
				path: "",
				component: DashboardPageComponent,
			},
			{
				path: "transactions",
				component: TransactionsPageComponent,
			},
			{
				path: "accounts",
				component: AccountsPageComponent,
			},
			{
				path: "transactions/:id",
				component: OperateTransactionPageComponent,
			},
		],
	},
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule],
})
export class DashboardRoutingModule {}
