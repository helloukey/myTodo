import globals from "globals";
import pluginJs from "@eslint/js";
import pluginReactConfig from "eslint-plugin-react/configs/recommended.js";
import eslintConfigPrettier from "eslint-config-prettier";

// mimic CommonJS variables -- not needed if using CommonJS
import { FlatCompat } from "@eslint/eslintrc";
import path from "path";
import { fileURLToPath } from "url";

// mimic CommonJS variables -- not needed if using CommonJS
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const config = [
  {
    settings: {
      react: {
        version: "detect",
      },
    },
  },
  { languageOptions: { globals: globals.browser } },
  pluginJs.configs.recommended,
  pluginReactConfig,
  ...compat.extends("prettier"),
  {
    rules: {
      "no-unused-vars": "error",
      "no-undef": "error",
      "react/jsx-uses-react": "off",
      "react/react-in-jsx-scope": "off",
      "react/prop-types": "off",
    },
  },
  {
    ignores: [
      "build",
      "node_modules",
      "public",
      "src/assets",
      ".gitignore",
      ".prettierrc",
      ".prettierignore",
      "firebase.json",
      "firebase.indexes.json",
      "firestore.rules",
      "src/**/*.test.js",
    ],
  },
  eslintConfigPrettier,
];

export default config;
