const prettierConfig = {
	printWidth: 80,
	tabWidth: 2,
	useTabs: true,
	semi: true,
	singleQuote: false,
	quoteProps: "as-needed",
	jsxSingleQuote: false,
	trailingComma: "es5",
	bracketSpacing: true,
	bracketSameLine: false,
	arrowParens: "always",
	requirePragma: false,
	insertPragma: false,
	proseWrap: "preserve",
	htmlWhitespaceSensitivity: "css",
	endOfLine: "lf",
	embeddedLanguageFormatting: "auto",
	singleAttributePerLine: false,
	plugins: ['@trivago/prettier-plugin-sort-imports'],
  importOrder: [
    '^@?\\w',

    // '^@/app/(.*)$',
    // '^@/pages/(.*)$',
    // '^@/widgets/(.*)$',
    // '^@/features/(.*)$',
    // '^@/entities/(.*)$',
    // '^@/shared/(.*)$',

    '^[./](?!.*\\.(css|scss|less)$)',

    '^.+\\.module\\.(css|scss|less)$',
  ],
  importOrderSeparation: true,
  importOrderSortSpecifiers: true,
}

export default prettierConfig
