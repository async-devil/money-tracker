import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";

import { SetAmountColorPipe } from "src/app/shared/pipes/set-amount-color/set-amount-color.pipe";
import { SetBalanceColorPipe } from "src/app/shared/pipes/set-balance-color/set-balance-color.pipe";
import { TransformAmountPipe } from "src/app/shared/pipes/transform-amount/transform-amount.pipe";
import { SharedModule } from "src/app/shared/shared.module";

import { MuiModule } from "../mui.module";
import { AccountComponent } from "./components/account/account.component";
import { AccountsListComponent } from "./components/accounts-list/accounts-list.component";
import { CategoryComponent } from "./components/category/category.component";
import { TransactionComponent } from "./components/transaction/transaction.component";
import { TransactionsListComponent } from "./components/transactions-list/transactions-list.component";
import { DashboardRoutingModule } from "./dashboard-routing.module";
import { AccountsPageComponent } from "./pages/accounts/accounts-page.component";
import { DashboardPageComponent } from "./pages/dashboard/dashboard-page.component";
import { DashboardModuleComponent } from "./pages/index/dashboard-module.component";
import { OperateTransactionPageComponent } from "./pages/operate-transaction-page/operate-transaction-page.component";
import { TransactionsPageComponent } from "./pages/transactions/transactions-page.component";

@NgModule({
	declarations: [
		SetAmountColorPipe,
		SetBalanceColorPipe,
		TransformAmountPipe,

		DashboardModuleComponent,

		TransactionsPageComponent,
		TransactionsListComponent,
		TransactionComponent,

		DashboardPageComponent,
		CategoryComponent,

		AccountsPageComponent,
		AccountsListComponent,
		AccountComponent,

		OperateTransactionPageComponent,
	],
	imports: [
		CommonModule,
		RouterModule,
		ReactiveFormsModule,
		DashboardRoutingModule,
		SharedModule,
		MuiModule,
	],
})
export class DashboardModule {}
