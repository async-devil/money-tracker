const mainRules = {
	"import/order": [
		1,
		{
			groups: ["builtin", "external", "internal", ["parent", "sibling"]],
			pathGroups: [
				{
					pattern: "react",
					group: "external",
					position: "before",
				},
			],
			pathGroupsExcludedImportTypes: ["react"],
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

	"jsx-quotes": [1, "prefer-double"],
	"linebreak-style": 0,
	"no-tabs": 0,
	"implicit-arrow-linebreak": 0,
	"operator-linebreak": 0,
	"object-curly-newline": 0,

	"no-nested-ternary": 0,
	"no-bitwise": 1,

	"react/jsx-indent": 0,
	"react/jsx-indent-props": 0,
	"react/no-array-index-key": 1,
	"react/require-default-props": 0,
	"react/jsx-curly-newline": 0,
};

const typescriptRules = {
	"@typescript-eslint/comma-dangle": 0,
	"@typescript-eslint/indent": 0,
	"@typescript-eslint/quotes": 0,
	"@typescript-eslint/no-unused-vars": 1,
	"@typescript-eslint/comma-dangle": 0,
	"@typescript-eslint/interface-name-prefix": 0,
	"@typescript-eslint/explicit-function-return-type": 0,
	"@typescript-eslint/explicit-module-boundary-types": 0,
	"@typescript-eslint/no-explicit-any": 0,
};

module.exports = {
	extends: [
		"eslint:recommended",
		"prettier",

		"plugin:import/recommended",
		"plugin:import/typescript",
		"plugin:react/recommended",
		"plugin:react-hooks/recommended",

		"plugin:sonarjs/recommended",
		"plugin:promise/recommended",
		"plugin:security-node/recommended",
	],
	ignorePatterns: ["**/*.cjs"],
	rules: mainRules,
	plugins: ["prettier", "import", "react", "react-hooks", "sonarjs", "promise", "security-node"],
	settings: { react: { version: "detect" } },
	overrides: [
		{
			files: ["*.ts", "*.tsx"],
			parser: "@typescript-eslint/parser",
			parserOptions: {
				project: "tsconfig.json",
				tsconfigRootDir: ".",
			},
			extends: [
				"plugin:@typescript-eslint/eslint-recommended",
				"plugin:@typescript-eslint/recommended",
				"plugin:@typescript-eslint/recommended-requiring-type-checking",
				"airbnb-typescript",
			],
			plugins: ["@typescript-eslint"],
			rules: Object.assign(typescriptRules, mainRules),
		},
		{
			files: "*.js",
			parser: "esprima",
		},
	],
};
