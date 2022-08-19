import { Component, OnInit } from "@angular/core";
import { NavigationStart, Router } from "@angular/router";
import { filter } from "rxjs";

@Component({
	selector: "app-dashboard-module",
	templateUrl: "./dashboard-module.component.html",
	styleUrls: ["./dashboard-module.component.scss"],
})
export class DashboardModuleComponent implements OnInit {
	public currentPage: string;

	constructor(private readonly router: Router) {}

	public ngOnInit() {
		this.router.events
			.pipe(filter((event) => event instanceof NavigationStart))
			.subscribe((event) => {
				const data = event as NavigationStart;

				const match = data.url.match(/(?<=\/dashboard\/)\w*/);

				this.currentPage = match ? match[0] : "dashboard";
			});
	}
}
