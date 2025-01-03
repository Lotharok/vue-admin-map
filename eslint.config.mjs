import globals from "globals";
import path from "node:path";
import { fileURLToPath } from "node:url";
import js from "@eslint/js";
import { FlatCompat } from "@eslint/eslintrc";
import simpleImportSort from "eslint-plugin-simple-import-sort";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const compat = new FlatCompat({
   baseDirectory: __dirname,
   recommendedConfig: js.configs.recommended,
   allConfig: js.configs.all,
});

export default [
   {
      ignores: ["**/dist", "**/.eslintrc.cjs", "**/drop"],
   },
   ...compat.extends(
      "plugin:@typescript-eslint/recommended",
      "eslint:recommended",
      "plugin:vue/vue3-recommended",
      "prettier",
   ),
   {
      plugins: { "simple-import-sort": simpleImportSort },

      languageOptions: {
         parserOptions: {
            parser: "@typescript-eslint/parser",
         },
         globals: {
            ...globals.browser,
         },

         ecmaVersion: "latest",
         sourceType: "module",
      },

      settings: {},

      rules: { "simple-import-sort/imports": "error", "simple-import-sort/exports": "error" },
   },
];
