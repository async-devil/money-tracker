import {
	ValidatorConstraint,
	ValidatorConstraintInterface,
	registerDecorator,
	ValidationOptions,
} from "class-validator";

/**
 * Token properties:
 * - 24 symbols
 * - lowercase hex symbols
 */
export const tokenRegEx = new RegExp(/^[a-f0-9]{48}$/);

@ValidatorConstraint({ name: "IsRefreshToken", async: false })
export class MatchConstraint implements ValidatorConstraintInterface {
	validate(token: string) {
		return tokenRegEx.test(token);
	}

	defaultMessage() {
		return "refresh token must be valid";
	}
}

/**
 * Token properties:
 * - 24 symbols
 * - lowercase hex symbols
 */
export function IsRefreshToken(validationOptions?: ValidationOptions) {
	return (object: unknown, propertyName: string) => {
		registerDecorator({
			target: object.constructor,
			propertyName,
			options: validationOptions,
			validator: MatchConstraint,
		});
	};
}
