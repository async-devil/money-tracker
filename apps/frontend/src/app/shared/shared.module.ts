import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { MatToolbarModule } from "@angular/material/toolbar";

import { GlobalErrorComponent } from "./components/global-error/global-error.component";

@NgModule({
	declarations: [GlobalErrorComponent],
	imports: [CommonModule, MatToolbarModule],
	exports: [GlobalErrorComponent],
})
export class SharedModule {}
