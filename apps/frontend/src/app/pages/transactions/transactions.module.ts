import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { MatCardModule } from "@angular/material/card";
import { MatDividerModule } from "@angular/material/divider";
import { MatIconModule } from "@angular/material/icon";
import { RouterModule } from "@angular/router";

import { SetAmountColorPipe } from "src/app/shared/pipes/set-amount-color/set-amount-color.pipe";
import { TransformAmountPipe } from "src/app/shared/pipes/transform-amount/transform-amount.pipe";
import { SharedModule } from "src/app/shared/shared.module";

import { TransactionComponent } from "./components/transaction/transaction.component";
import { TransactionsPageComponent } from "./transactions-page/transactions-page.component";

@NgModule({
	declarations: [
		TransactionsPageComponent,
		TransactionComponent,
		SetAmountColorPipe,
		TransformAmountPipe,
	],
	imports: [
		CommonModule,
		RouterModule,
		SharedModule,
		MatCardModule,
		MatIconModule,
		MatDividerModule,
	],
})
export class TransactionsModule {}
