import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { MatToolbarModule } from "@angular/material/toolbar";

import { GlobalErrorComponent } from "./components/global-error/global-error.component";
import { DashboardLayoutComponent } from "./layouts/dashboard-layout/dashboard-layout.component";

@NgModule({
	declarations: [GlobalErrorComponent, DashboardLayoutComponent],
	imports: [CommonModule, MatToolbarModule],
	exports: [GlobalErrorComponent, DashboardLayoutComponent],
})
export class SharedModule {}
