"use client";

import { ProgressProvider } from "@bprogress/next/app";
import { useTheme } from "next-themes";

export function CustomProviders({ children }: { children: React.ReactNode }) {
  const theme = useTheme();

  return (
    <ProgressProvider
      color={theme.theme === "dark" ? "#fff" : "#000"}
      height="4px"
      options={{ showSpinner: false }}
      shallowRouting
    >
      {children}
    </ProgressProvider>
  );
}
