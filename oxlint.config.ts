import { defineConfig } from "oxlint";
import astro from "ultracite/oxlint/astro";
import core from "ultracite/oxlint/core";

export default defineConfig({
  ...(core.env && { env: core.env }),
  extends: [core, astro],
  ...(core.ignorePatterns && { ignorePatterns: core.ignorePatterns }),
  rules: { "sort-keys": "off" },
  overrides: [
    { files: ["**/*.astro"], rules: { "unicorn/filename-case": "off" } },
  ],
});
