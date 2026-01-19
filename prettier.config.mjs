/** @type {import('prettier').Config} */
const config = {
  // Core formatting
  semi: true,
  singleQuote: false,
  trailingComma: "es5",
  printWidth: 80,
  tabWidth: 2,
  useTabs: false,

  // Code style
  arrowParens: "always",
  bracketSpacing: true,
  bracketSameLine: false,
  endOfLine: "lf", // Consistent line endings across OS (Git handles conversion)

  // Plugins
  plugins: ["prettier-plugin-tailwindcss"],

  // File-specific overrides
  overrides: [
    {
      files: "*.mjs",
      options: {
        parser: "babel",
      },
    },
    {
      files: "*.json",
      options: {
        parser: "json",
        printWidth: 80,
      },
    },
    {
      files: "*.md",
      options: {
        parser: "markdown",
        printWidth: 100,
        proseWrap: "always",
      },
    },
  ],
};

export default config;
