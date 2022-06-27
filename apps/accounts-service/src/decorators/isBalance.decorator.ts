import {
	ValidatorConstraint,
	ValidatorConstraintInterface,
	registerDecorator,
	ValidationOptions,
} from "class-validator";

/** Is balance amount validator.
 * 18 numbers in total, 8 numbers after dot
  @example ["1234567890.12345678", "12.34", "1"]
 */
export const balanceRegEx = new RegExp(/^\d{1,10}(\.\d{0,8})?$/);

@ValidatorConstraint({ name: "IsBalance", async: false })
export class MatchConstraint implements ValidatorConstraintInterface {
	validate(date: string) {
		return balanceRegEx.test(date);
	}

	defaultMessage() {
		return "balance should have 18 numbers in total, 8 numbers after dot";
	}
}

/** Is balance amount validator.
 * 18 numbers in total, 8 numbers after dot
  @example ["1234567890.12345678", "12.34", "1"]
 */
export function IsBalance(validationOptions?: ValidationOptions) {
	return (object: unknown, propertyName: string) => {
		registerDecorator({
			target: object.constructor,
			propertyName,
			options: validationOptions,
			validator: MatchConstraint,
		});
	};
}
