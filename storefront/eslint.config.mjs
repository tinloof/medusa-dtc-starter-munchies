import { defineConfig, globalIgnores } from "eslint/config";
import nextCoreWebVitals from "eslint-config-next/core-web-vitals";
import _import from "eslint-plugin-import";
import { fixupPluginRules, fixupConfigRules } from "@eslint/compat";
import typescriptEslint from "@typescript-eslint/eslint-plugin";
import tsParser from "@typescript-eslint/parser";
import path from "node:path";
import { fileURLToPath } from "node:url";
import js from "@eslint/js";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const compat = new FlatCompat({
    baseDirectory: __dirname,
    recommendedConfig: js.configs.recommended,
    allConfig: js.configs.all
});

export default defineConfig([globalIgnores([
    "**/prettier.config.*",
    "**/next.config.*",
    "**/postcss.config.*",
    "**/tailwind.config.*",
    "**/sanity.generated.d.ts",
]), {
    extends: [
        ...nextCoreWebVitals,
        ...compat.extends("plugin:perfectionist/recommended-natural")
    ],

    plugins: {
        import: fixupPluginRules(_import),
    },
}, {
    files: ["**/*.ts?(x)"],

    extends: fixupConfigRules(
        compat.extends("plugin:import/typescript", "plugin:@typescript-eslint/recommended"),
    ),

    plugins: {
        "@typescript-eslint": fixupPluginRules(typescriptEslint),
    },

    languageOptions: {
        parser: tsParser,
        ecmaVersion: 2019,
        sourceType: "module",
    },

    rules: {
        "@typescript-eslint/consistent-type-assertions": "warn",
        "@typescript-eslint/consistent-type-imports": "warn",
        "@typescript-eslint/no-explicit-any": "off",
        "@next/next/no-img-element": "off",
    },
}]);