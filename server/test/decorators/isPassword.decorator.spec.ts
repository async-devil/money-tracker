import { MatchConstraint } from "src/decorators/isPassword.decorator";

describe("IsPasswordDecorator", () => {
	const decorator = new MatchConstraint();

	it("should be defined", () => {
		expect(decorator).toBeDefined();
	});

	it("should fail on empty string", () => {
		expect(decorator.validate("")).toBe(false);
	});

	it("should pass on valid password", () => {
		expect(decorator.validate("Password5@1")).toBe(true);
	});

	it("should fail on password without capital letter", () => {
		expect(decorator.validate("password5@1")).toBe(false);
	});

	it("should fail on password without number", () => {
		expect(decorator.validate("Password@")).toBe(false);
	});

	it("should fail on password without special symbol", () => {
		expect(decorator.validate("Password1")).toBe(false);
	});
});
