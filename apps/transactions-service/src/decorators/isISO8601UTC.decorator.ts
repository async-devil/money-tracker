import {
	ValidatorConstraint,
	ValidatorConstraintInterface,
	registerDecorator,
	ValidationOptions,
} from "class-validator";

/** Is ISO8601 UTC date validator
  @matches "2022-06-25T05:47:53.590Z"
  @example date.toISOstring()
 */
export const tokenRegEx = new RegExp(
	/^((?:[1-9][0-9]*)?[0-9]{4})-(1[0-2]|0[1-9])-(3[01]|0[1-9]|[12][0-9])T(2[0-3]|[01][0-9]):([0-5][0-9]):([0-5][0-9])(\.[0-9]+)?(Z)$/
);

@ValidatorConstraint({ name: "IsISO8601UTC", async: false })
export class MatchConstraint implements ValidatorConstraintInterface {
	validate(date: string) {
		return tokenRegEx.test(date);
	}

	defaultMessage() {
		return "date must be valid ISO8601";
	}
}

/** Is ISO8601 UTC date validator
  @matches "2022-06-25T05:47:53.590Z"
  @example date.toISOstring()
 */
export function IsISO8601UTC(validationOptions?: ValidationOptions) {
	return (object: unknown, propertyName: string) => {
		registerDecorator({
			target: object.constructor,
			propertyName,
			options: validationOptions,
			validator: MatchConstraint,
		});
	};
}
