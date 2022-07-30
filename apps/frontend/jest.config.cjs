module.exports = {
	moduleFileExtensions: ["js", "json", "ts"],
	moduleNameMapper: {
		"^src/(.*)$": "<rootDir>/src/$1",
	},
	rootDir: "./",
	testRegex: ".*\\.spec\\.ts$",
	setupFilesAfterEnv: ["<rootDir>/src/test.ts"],
	collectCoverageFrom: ["<rootDir>/src/**/*.(t|j)s"],
	coverageDirectory: "./coverage",

	preset: "jest-preset-angular",
	testEnvironment: "jsdom",
};
