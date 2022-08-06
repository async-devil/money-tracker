import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";

import { SetAmountColorPipe } from "src/app/shared/pipes/set-amount-color/set-amount-color.pipe";
import { TransformAmountPipe } from "src/app/shared/pipes/transform-amount/transform-amount.pipe";
import { SharedModule } from "src/app/shared/shared.module";

import { MuiModule } from "../mui.module";
import { TransactionComponent } from "./components/transaction/transaction.component";
import { DashboardRoutingModule } from "./dashboard-routing.module";
import { AccountsPageComponent } from "./pages/accounts/accounts-page.component";
import { DashboardPageComponent } from "./pages/dashboard/dashboard-page.component";
import { DashboardModuleComponent } from "./pages/index/dashboard-module.component";
import { TransactionsPageComponent } from "./pages/transactions/transactions-page.component";

@NgModule({
	declarations: [
		SetAmountColorPipe,
		TransformAmountPipe,
		TransactionComponent,

		DashboardModuleComponent,
		DashboardPageComponent,
		AccountsPageComponent,
		TransactionsPageComponent,
	],
	imports: [CommonModule, RouterModule, DashboardRoutingModule, SharedModule, MuiModule],
})
export class DashboardModule {}
