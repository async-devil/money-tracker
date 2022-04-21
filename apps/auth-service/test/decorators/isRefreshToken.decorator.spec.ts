import { MatchConstraint } from "src/decorators/isRefreshToken.decorator";

describe("IsPasswordDecorator", () => {
	const decorator = new MatchConstraint();

	test("should be defined", () => {
		expect(decorator).toBeDefined();
	});

	test("should fail on empty string", () => {
		expect(decorator.validate("")).toBe(false);
	});

	test("should pass on valid token", () => {
		expect(decorator.validate("3d5b8d7035bd10bb4d32d95fdd272ceb8e6a2ddbbe79d966")).toBe(true);
	});

	test("should fail on invalid length", () => {
		expect(decorator.validate("3d5b8d7035bd10bb4d32d95fdd272ceb8e6a2ddbbe79d")).toBe(false);
	});

	test("should fail on uppercase symbols", () => {
		expect(decorator.validate("3d5b8d7035bd10bb4d32d95fdd272ceb8e6a2ddbbe79D966")).toBe(false);
	});

	test("should fail on non hex symbols", () => {
		expect(decorator.validate("3d5b8d7035bd10bb4d32d95fdd272ceb8e6a2ddbbe79z966")).toBe(false);
	});

	test("should return default message", () => {
		expect(decorator.defaultMessage()).toMatch("refresh token must be valid");
	});
});
