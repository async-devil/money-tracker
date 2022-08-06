import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";

import { IndexRoutingModule } from "./index-routing.module";
import { HomePageComponent } from "./pages/home/home-page.component";

@NgModule({
	declarations: [HomePageComponent],
	imports: [CommonModule, RouterModule, IndexRoutingModule],
})
export class IndexModule {}
