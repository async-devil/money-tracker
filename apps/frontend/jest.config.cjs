module.exports = {
	moduleFileExtensions: ["js", "json", "ts", "tsx", "jsx"],
	moduleNameMapper: {
		"^.+\\.module\\.(css|sass|scss)$": "identity-obj-proxy",
		"^src/(.*)$": "<rootDir>/src/$1",
	},

	setupFiles: ["react-app-polyfill/jsdom"],
	setupFilesAfterEnv: ["<rootDir>/src/setupTests.ts"],

	rootDir: "./",
	roots: ["<rootDir>/test"],
	testRegex: ".*\\.tsx$",
	transform: {
		".+\\.(css|styl|less|sass|scss|png|jpg|ttf|woff|woff2|svg)$": "jest-transform-stub",
		"^.+\\.(js|jsx|ts|tsx)$": "ts-jest",
	},

	testEnvironment: "jsdom",
	preset: "ts-jest",

	collectCoverageFrom: ["**/*.(js|jsx|ts|tsx)"],
	coverageReporters: ["json", "lcov", "text-summary", "clover"],
	coverageThreshold: { global: { statements: 95, branches: 95, lines: 95, functions: 95 } },
	coverageDirectory: "./coverage",
};
