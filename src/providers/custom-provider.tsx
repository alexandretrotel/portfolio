"use client";

import { ProgressProvider } from "@bprogress/next/app";
import { useTheme } from "next-themes";

export function CustomProviders({ children }: { children: React.ReactNode }) {
  const theme = useTheme();

  return (
    <ProgressProvider
      height="4px"
      color={theme.theme === "dark" ? "#fff" : "#000"}
      options={{ showSpinner: false }}
      shallowRouting
    >
      {children}
    </ProgressProvider>
  );
}
