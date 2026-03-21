import { defineConfig } from "vite-plus";

export default defineConfig({
  fmt: {
    sortImports: {},
    sortPackageJson: true,
    sortTailwindcss: {
      functions: ["cn", "clsx", "cva", "tw"],
      stylesheet: "./src/styles/globals.css",
    },
  },
  lint: {
    plugins: [
      "eslint",
      "typescript",
      "unicorn",
      "oxc",
      "import",
      "jsdoc",
      "jsx-a11y",
      "node",
      "promise",
    ],
    options: {
      typeAware: true,
      typeCheck: true,
    },
    ignorePatterns: ["dist/**", ".astro/**", ".vercel/**"],
  },
});
