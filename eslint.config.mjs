import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);

const compat = new FlatCompat({
  baseDirectory: import.meta.dirname,
});

const eslintConfig = [
  ...compat.config(
    {
      extends: [
        "next",
        "next/core-web-vitals",
        "next/typescript"
      ],
      rules: {
        '@typescript-eslint/no-unused-vars': 'off'
      }
    })
];

export default eslintConfig;
