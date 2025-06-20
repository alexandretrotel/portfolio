"use client";

import { CustomProviders } from "@/providers/custom-provider";
import { ThemeProvider } from "@/providers/theme-provider";

export function Providers({ children }: { children: React.ReactNode }) {
	return (
		<ThemeProvider
			attribute="class"
			defaultTheme="system"
			enableSystem
			disableTransitionOnChange
		>
			<CustomProviders>{children}</CustomProviders>
		</ThemeProvider>
	);
}
