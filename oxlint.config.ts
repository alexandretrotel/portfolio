import base from "@zap-studio/oxlint/base";
import { defineConfig } from "oxlint";

export default defineConfig({
  extends: [base],
  rules: {
    "sonarjs/no-implicit-dependencies": "off",
  },
  overrides: [
    {
      files: ["**/*.astro"],
      rules: {
        "sonarjs/unused-import": "off",
      },
    },
  ],
});
