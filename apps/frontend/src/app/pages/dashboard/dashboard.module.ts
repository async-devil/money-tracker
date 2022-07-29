import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { MatIconModule } from "@angular/material/icon";
import { RouterModule } from "@angular/router";

import { SharedModule } from "src/app/shared/shared.module";

import { DashboardPageComponent } from "./dashboard-page/dashboard-page.component";

@NgModule({
	declarations: [DashboardPageComponent],
	imports: [CommonModule, RouterModule, SharedModule, MatIconModule],
})
export class DashboardModule {}
