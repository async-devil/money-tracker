import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { MatButtonModule } from "@angular/material/button";
import { MatButtonToggleModule } from "@angular/material/button-toggle";
import { MatCardModule } from "@angular/material/card";
import { MatChipsModule } from "@angular/material/chips";
import { MatRippleModule, MatNativeDateModule } from "@angular/material/core";
import { MatDatepickerModule } from "@angular/material/datepicker";
import { MatDividerModule } from "@angular/material/divider";
import { MatIconModule } from "@angular/material/icon";
import { MatInputModule } from "@angular/material/input";
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";
import { MatSelectModule } from "@angular/material/select";
import { MatToolbarModule } from "@angular/material/toolbar";

@NgModule({
	imports: [
		CommonModule,
		MatCardModule,
		MatDividerModule,
		MatChipsModule,
		MatInputModule,
		MatIconModule,
		MatButtonModule,
		MatProgressSpinnerModule,
		MatToolbarModule,
		MatButtonToggleModule,
		MatRippleModule,
		MatDatepickerModule,
		MatNativeDateModule,
		MatSelectModule,
	],
	exports: [
		CommonModule,
		MatCardModule,
		MatDividerModule,
		MatChipsModule,
		MatInputModule,
		MatIconModule,
		MatButtonModule,
		MatProgressSpinnerModule,
		MatToolbarModule,
		MatButtonToggleModule,
		MatRippleModule,
		MatDatepickerModule,
		MatNativeDateModule,
		MatSelectModule,
	],
})
export class MuiModule {}
