import base from "@zap-studio/oxlint/base";
import { defineConfig } from "oxlint";

export default defineConfig({
  extends: [base],
  rules: {
    // astro:content and other Astro virtual module specifiers aren't real
    // package.json dependencies, so this rule false-positives on every import.
    "sonarjs/no-implicit-dependencies": "off",
  },
  overrides: [
    {
      files: ["**/*.astro"],
      rules: {
        // oxlint only parses the frontmatter script of .astro files, so it
        // can't see usage inside the template below the fence.
        "sonarjs/unused-import": "off",
      },
    },
  ],
});
