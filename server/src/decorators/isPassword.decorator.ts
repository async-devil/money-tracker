import {
	ValidatorConstraint,
	ValidatorConstraintInterface,
	registerDecorator,
	ValidationOptions,
} from "class-validator";

/**
 * Password properties:
 * - At least one capital letter
 * - At least one number
 * - At least one special character like [!@#$&*.,?%^]
 */
export const passwordRegEx = new RegExp(
	/^(?=.*[A-Z])(?=.*[!@#$&*.,?%^])(?=.*[0-9])(?=.*[a-z]).*$/gm
);

@ValidatorConstraint({ name: "IsPassword", async: false })
export class MatchConstraint implements ValidatorConstraintInterface {
	validate(password: string) {
		return passwordRegEx.test(password);
	}

	defaultMessage() {
		return "password must have at least one capital letter, one number and one special character like !@#$&*.,?%^";
	}
}

/**
 * Password properties:
 * - At least one capital letter
 * - At least one number
 * - At least one special character like [!@#$&*.,?%^]
 */
export function IsPassword(validationOptions?: ValidationOptions) {
	return (object: unknown, propertyName: string) => {
		registerDecorator({
			target: object.constructor,
			propertyName,
			options: validationOptions,
			validator: MatchConstraint,
		});
	};
}
