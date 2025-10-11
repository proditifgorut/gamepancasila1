import js from "@eslint/js";
import globals from "globals";
import eslintReact from "@eslint-react/eslint-plugin";
import jsxA11y from "eslint-plugin-jsx-a11y";
import reactCompiler from "eslint-plugin-react-compiler";
import tseslint from "typescript-eslint";

export default tseslint.config(
  { ignores: ["dist", "eslint.dualite.config.js", "postcss.config.js", "tailwind.config.js"] },
  js.configs.recommended,
  ...tseslint.configs.recommendedTypeChecked,
  {
    files: ["**/*.{js,jsx,ts,tsx}"],
    plugins: {
      "@eslint-react": eslintReact,
      "jsx-a11y": jsxA11y,
      "react-compiler": reactCompiler,
    },
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.node,
      },
      parserOptions: {
        ecmaFeatures: { jsx: true },
        project: true,
        tsconfigRootDir: import.meta.dirname,
      },
    },
    rules: {
      ...eslintReact.configs.recommended.rules,
      ...jsxA11y.configs.recommended.rules,
      "react-compiler/react-compiler": "error",
    },
    settings: {
      react: {
        version: "detect",
      },
    },
  }
);
