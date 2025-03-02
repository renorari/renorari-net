import pluginReact from "eslint-plugin-react";
import globals from "globals";
import tseslint from "typescript-eslint";

import pluginJs from "@eslint/js";
import stylisticTs from "@stylistic/eslint-plugin-ts";

import pluginRenorari from "./eslint/index.js";

/** @type {import('eslint').Linter.Config[]} */
export default [
    {"files": ["**/*.{js,mjs,cjs,ts,jsx,tsx}"]},
    {"languageOptions": { "globals": globals.browser }},
    pluginJs.configs.recommended,
    ...tseslint.configs.recommended,
    pluginReact.configs.flat.recommended,
    {
        "settings": {
            "react": {
                "version": "detect"
            }
        },
        "plugins": {
            "@stylistic/ts": stylisticTs,
            "@renorari": pluginRenorari
        },
        "rules": {
            "@/linebreak-style": ["error", "unix"],
            "@typescript-eslint/no-unused-vars": [
                "error",
                {
                    "argsIgnorePattern": "^_",
                    "caughtErrorsIgnorePattern": "^_",
                    "destructuredArrayIgnorePattern": "^_",
                    "varsIgnorePattern": "^_"
                }
            ],
            "@stylistic/ts/indent": ["error", 4],
            "@stylistic/ts/quotes": ["error", "double"],
            "@stylistic/ts/semi": ["error", "always"],
            "@stylistic/ts/comma-dangle": ["error", "never"],
            "@renorari/no-unquoted-keys": "error"
        }
    }
];