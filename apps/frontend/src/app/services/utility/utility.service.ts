import { Injectable } from "@angular/core";

@Injectable({
	providedIn: "root",
})
export class UtilityService {
	/**
	 * @param target Array target
	 * @param criteria Function which return group key
	 * @returns Grouped arrays
	 *
	 * @example
	 * const numbers = [6.1, 4.2, 6.3];
	 * // returns [[4, [4.2]], [6, [6.1, 6.3]]]
	 * this.utilityService.groupBy(numbers, Math.floor);
	 */
	public groupBy<T>(
		target: Array<T>,
		criteria: (item: T) => string
	): Array<[string, Array<T>]> {
		return Object.entries(
			target.reduce((prev: Record<string, Array<T>>, curr) => {
				const key = criteria(curr);

				//? If the key doesn't exist yet, create it
				if (!Object.prototype.hasOwnProperty.call(prev, key)) {
					prev[key] = [];
				}

				prev[key].push(curr);

				return prev;
			}, {})
		);
	}

	/**
	 * @param target Target object
	 * @param criteria Sort function, see Array.sort()
	 * @returns Sorted object
	 * @example
	 * const obj = [[4, [4.2]], [6, [6.1, 6.3]]]
	 * // returns [[6, [6.1, 6.3]], [4, [4.2]]];
	 * this.utilityService.sortObjectByKeys(obj, (a, b) => parseInt(b) - parseInt(a));
	 */
	public sortObjectByKeys<T>(
		target: Array<[string, Array<T>]>,
		criteria: (a: string, b: string) => number
	): Array<[string, Array<T>]> {
		return target.sort((a, b) => criteria(a[0], b[0]));
	}
}
