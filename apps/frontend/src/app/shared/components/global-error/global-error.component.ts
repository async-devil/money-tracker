import { Component, OnInit } from "@angular/core";

import { ErrorService } from "src/app/services/error/error.service";

@Component({
	selector: "app-global-error",
	templateUrl: "./global-error.component.html",
	styleUrls: ["./global-error.component.scss"],
})
export class GlobalErrorComponent {
	constructor(public readonly errorService: ErrorService) {}
}
