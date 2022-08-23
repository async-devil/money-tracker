import { Component, EventEmitter, Inject, Output } from "@angular/core";
import { MAT_DIALOG_DATA } from "@angular/material/dialog";

export type SelectOperationPanelData = {
	title: string;
	actions: Array<{
		actionTitle: string;
		actionId: string;
		iconName: string;
		iconColor: string;
	}>;
};

@Component({
	selector: "app-select-operation-panel",
	templateUrl: "./select-operation-panel.component.html",
	styleUrls: ["./select-operation-panel.component.scss"],
})
export class SelectOperationPanelComponent {
	@Output() $event = new EventEmitter<string>();

	constructor(@Inject(MAT_DIALOG_DATA) public readonly data: SelectOperationPanelData) {
		console.log(data);
	}

	public onClick(id: string) {
		this.$event.emit(id);
	}
}
