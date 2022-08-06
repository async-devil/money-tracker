import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

import { AuthGuard } from "./shared/guards/auth/auth.guard";

const routes: Routes = [
	{
		path: "",
		loadChildren: () => import("./modules/index/index.module").then((m) => m.IndexModule),
	},
	{
		path: "dashboard",
		loadChildren: () =>
			import("./modules/dashboard/dashboard.module").then((m) => m.DashboardModule),
	},
	{
		path: "auth",
		loadChildren: () => import("./modules/auth/auth.module").then((m) => m.AuthModule),
	},
];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule],
})
export class AppRoutingModule {}
