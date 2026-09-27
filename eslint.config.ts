import pluginReact from "eslint-plugin-react";
import globals from "globals";
import tseslint from "typescript-eslint";

import pluginJs from "@eslint/js";
import stylistic from "@stylistic/eslint-plugin";

import pluginRenorari from "./eslint/index.js";

/** @type {import('eslint').Linter.Config[]} */
export default [
    { "ignores": ["dist/**", "src/pages.gen.ts"] },
    { "files": ["**/*.{js,mjs,cjs,ts,jsx,tsx}"] },
    { "languageOptions": { "globals": globals.browser } },
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
            "@stylistic": stylistic,
            "@renorari": pluginRenorari
        },
        "rules": {
            // "func-style": [
            //     "error",
            //     "declaration",
            //     {
            //         "allowArrowFunctions": false
            //     }
            // ],
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
            "@stylistic/indent": ["error", 4, { "SwitchCase": 1 }],
            "@stylistic/quotes": ["error", "double"],
            "@stylistic/semi": ["error", "always"],
            "@stylistic/comma-dangle": ["error", "never"],
            "@renorari/no-unquoted-keys": "error"
        }
    }
];