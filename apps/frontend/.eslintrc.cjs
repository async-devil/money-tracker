const mainRules = {
	"import/order": [
		1,
		{
			groups: ["builtin", "external", "internal", ["parent", "sibling"]],
			"newlines-between": "always",
			alphabetize: {
				order: "asc",
				caseInsensitive: true,
			},
		},
	],
	"import/no-extraneous-dependencies": [
		"error",
		{ devDependencies: ["**/*.spec.tsx", "**/*.spec.ts", "**/*.e2e-spec.ts"] },
	],

	"linebreak-style": 0,
	"no-tabs": 0,
	"implicit-arrow-linebreak": 0,
	"operator-linebreak": 0,
	"object-curly-newline": 0,

	"no-nested-ternary": 0,
	"no-bitwise": 1,

	"import/no-extraneous-dependencies": 0,
	"no-return-await": 0,
	"@typescript-eslint/return-await": 0,
	"@typescript-eslint/no-unsafe-assignment": 0,
};

const typescriptRules = {
	"@typescript-eslint/comma-dangle": 0,
	"@typescript-eslint/indent": 0,
	"@typescript-eslint/quotes": 0,
	"@typescript-eslint/no-unused-vars": 1,
	"@typescript-eslint/interface-name-prefix": 0,
	"@typescript-eslint/explicit-function-return-type": 0,
	"@typescript-eslint/explicit-module-boundary-types": 0,
	"@typescript-eslint/no-explicit-any": 0,
	"@typescript-eslint/unbound-method": 0,
};

module.exports = {
	extends: [
		"eslint:recommended",
		"prettier",

		"plugin:import/recommended",
		"plugin:import/typescript",

		"plugin:sonarjs/recommended",
		"plugin:promise/recommended",
		"plugin:security-node/recommended",

		"plugin:@angular-eslint/recommended",
		"plugin:@angular-eslint/template/process-inline-templates",
	],
	ignorePatterns: ["**/*.cjs", "dist"],
	rules: mainRules,
	plugins: ["prettier", "import", "sonarjs", "promise", "security-node"],
	settings: {
		"import/resolver": {
			typescript: {},
		},
	},
	overrides: [
		{
			files: ["*.ts", "*.tsx"],
			parser: "@typescript-eslint/parser",
			parserOptions: {
				project: "tsconfig.json",
				tsconfigRootDir: __dirname,
			},
			extends: [
				"plugin:@typescript-eslint/eslint-recommended",
				"plugin:@typescript-eslint/recommended",
				"plugin:@typescript-eslint/recommended-requiring-type-checking",
			],
			plugins: ["@typescript-eslint"],
			rules: Object.assign(typescriptRules, mainRules),
		},
		{
			files: ["*.spec.ts", "*.spec.tsx"],
			parser: "@typescript-eslint/parser",
			parserOptions: {
				project: "tsconfig.json",
				tsconfigRootDir: __dirname,
			},
			plugins: ["jest"],
			rules: {
				"@typescript-eslint/unbound-method": 0,
				"@typescript-eslint/no-misused-promises": 0,
				"jest/unbound-method": 1,
				"import/no-unresolved": 0,
			},
		},
		{
			files: "*.js",
			parser: "esprima",
		},
		{
			files: ["*.html"],
			extends: ["plugin:@angular-eslint/template/recommended"],
			rules: {},
		},
	],
};
