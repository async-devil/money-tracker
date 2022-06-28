import {
	ValidatorConstraint,
	ValidatorConstraintInterface,
	registerDecorator,
	ValidationOptions,
} from "class-validator";

/** Is amount validator.
 * 18 numbers in total, 8 numbers after dot
  @example ["1234567890.12345678", "12.34", "1", "-1"]
 */
export const amountRegEx = new RegExp(/^-?\d{1,10}(\.\d{0,8})?$/);

@ValidatorConstraint({ name: "IsAmount", async: false })
export class MatchConstraint implements ValidatorConstraintInterface {
	validate(date: string) {
		return amountRegEx.test(date);
	}

	defaultMessage() {
		return "amount should have 18 numbers in total, 8 numbers after dot";
	}
}

/** Is amount validator.
 * 18 numbers in total, 8 numbers after dot
  @example ["1234567890.12345678", "12.34", "1", "-1"]
 */
export function IsAmount(validationOptions?: ValidationOptions) {
	return (object: unknown, propertyName: string) => {
		registerDecorator({
			target: object.constructor,
			propertyName,
			options: validationOptions,
			validator: MatchConstraint,
		});
	};
}
