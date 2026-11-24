import eslint from "@eslint/js";
import { defineConfig } from "eslint/config";
import eslintPluginPrettierRecommended from "eslint-plugin-prettier/recommended";
import { reactRefresh } from "eslint-plugin-react-refresh";
import sort from "eslint-plugin-sort";
import tseslint from "typescript-eslint";

export default defineConfig(
  {
    extends: [
      eslint.configs.all,
      sort.configs["flat/recommended"],
      tseslint.configs.strictTypeChecked,
      tseslint.configs.stylisticTypeChecked,
      reactRefresh.configs.recommended(),
      eslintPluginPrettierRecommended,
    ],
    files: ["**/*.ts", "**/*.tsx"],
    languageOptions: {
      parser: tseslint.parser,
      parserOptions: {
        projectService: {
          allowDefaultProject: ["eslint.config.js"],
          defaultProject: "tsconfig.json",
        },
      },
    },
    rules: {
      "no-magic-numbers": "off",
      "no-ternary": "off",
      "func-style": "off",
      "sort-imports": "off",
      "sort-vars": "off",
      "@typescript-eslint/only-throw-error": "off",
      "capitalized-comments": "off",
      "max-lines-per-function": ["error", 100],
    },
  },
  {
    files: ["vite.config.ts"],
    rules: {
      camelcase: "off",
    },
  },
);
