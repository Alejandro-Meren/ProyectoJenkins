import globals from "globals";
import pluginJs from "@eslint/js";
import tseslint from "typescript-eslint";
import pluginReact from "eslint-plugin-react";


/** @type {import('eslint').Linter.Config[]} */
export default [
  {files: ["**/*.{js,mjs,cjs,ts,jsx,tsx}"]},
  {languageOptions: { globals: globals.browser }},
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
  pluginReact.configs.flat.recommended,
  {rules: {
    // suppress errors for missing 'import React' in files
    "react/react-in-jsx-scope": 0,
    // allow jsx syntax in js files (for next.js project)
   "react/jsx-filename-extension": [1, { "extensions": [".js", ".jsx",".ts",".tsx"] }],
  }},
  
];



