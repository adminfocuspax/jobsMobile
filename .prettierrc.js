module.exports = {
  // Basic formatting
  semi: true,
  singleQuote: true,
  quoteProps: 'as-needed',
  trailingComma: 'es5',
  tabWidth: 2,
  useTabs: false,

  // Line length and wrapping
  printWidth: 80,
  endOfLine: 'lf',

  // JSX specific
  jsxSingleQuote: true,
  bracketSameLine: false,

  // Object and array formatting
  bracketSpacing: true,
  arrowParens: 'avoid',

  // File type overrides
  overrides: [
    {
      files: '*.json',
      options: {
        printWidth: 200,
      },
    },
    {
      files: '*.md',
      options: {
        printWidth: 100,
        proseWrap: 'always',
      },
    },
  ],
};
