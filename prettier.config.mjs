/** @type {import('prettier').Config & import('prettier-plugin-tailwindcss').options} */
const config = {
  plugins: ["prettier-plugin-tailwindcss"],
  singleQuote: true,
  trailingComma: "all",
  jsxSingleQuote: false,
  arrowParens: "always",
  bracketSpacing: true,
  printWidth: 100,
  tabWidth: 2,
  semi: true,
  overrides: [
    {
      files: ["**/*.css", "**/*.scss", "**/*.html"],
      options: {
        singleQuote: false,
      },
    },
    {
      files: ["**/*.css", "**/*.scss"],
      options: {
        printWidth: 120,
      },
    },
  ],
};

export default config;