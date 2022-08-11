import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { MatButtonModule } from "@angular/material/button";
import { MatCardModule } from "@angular/material/card";
import { MatChipsModule } from "@angular/material/chips";
import { MatDividerModule } from "@angular/material/divider";
import { MatIconModule } from "@angular/material/icon";
import { MatInputModule } from "@angular/material/input";
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";
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
	],
})
export class MuiModule {}