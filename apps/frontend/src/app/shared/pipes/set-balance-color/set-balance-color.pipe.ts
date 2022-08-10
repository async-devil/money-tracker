import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
	name: "setBalanceColor",
})
export class SetBalanceColorPipe implements PipeTransform {
	private setCssObject(object: Record<string, unknown>, color: string) {
		return Object.assign(object, { color });
	}

	public transform(value: Record<string, unknown>, balance: string) {
		const color = balance.startsWith("-") ? "#ff616e" : "#a5e075";

		return this.setCssObject(value, color);
	}
}
