import js from "@eslint/js";
import globals from "globals";
import eslintReact from "@eslint-react/eslint-plugin";
import jsxA11y from "eslint-plugin-jsx-a11y";
import reactCompiler from "eslint-plugin-react-compiler";
import reactRefresh from "eslint-plugin-react-refresh";
import tseslint from "typescript-eslint";

export default tseslint.config(
  { ignores: ["dist", "tailwind.config.js", "postcss.config.js", "eslint.config.js"] },

  // General config for all JS/TS files
  {
    files: ["**/*.{js,jsx,ts,tsx}"],
    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "module",
      globals: globals.browser,
      parser: tseslint.parser,
      parserOptions: {
        ecmaFeatures: { jsx: true },
      },
    },
    plugins: {
      "@eslint-react": eslintReact,
      "jsx-a11y": jsxA11y,
      "react-compiler": reactCompiler,
      "react-refresh": reactRefresh,
    },
    rules: {
      // Base rules
      ...js.configs.recommended.rules,
      ...tseslint.configs.recommended.rules,
      // React rules
      ...eslintReact.configs.recommended.rules,
      // Accessibility rules
      ...jsxA11y.configs.recommended.rules,
      
      // Compiler
      "react-compiler/react-compiler": "error",
      
      // Refresh
      "react-refresh/only-export-components": ["warn", { allowConstantExport: true }],

      // Overrides & Preferences from original config
      "@typescript-eslint/no-unused-vars": ["warn", { "argsIgnorePattern": "^_", "varsIgnorePattern": "^_" }],
      "@eslint-react/no-unescaped-entities": "off",
      
      // Sensible relaxations
      "@eslint-react/no-unstable-nested-components": ["warn"],
      "@eslint-react/naming-convention/filename": "off",
    },
    settings: {
      react: {
        version: "detect",
      },
    },
  },

  // Override for TypeScript files in `src` to enable type-aware linting
  {
    files: ["src/**/*.{ts,tsx}"],
    languageOptions: {
      parserOptions: {
        project: "./tsconfig.dualite.json",
        tsconfigRootDir: import.meta.dirname,
      },
    },
    rules: {
      ...tseslint.configs.stylistic.rules,
    },
  }
);
