"use client";

import GTMProvider from "./gtm-provider";
import QueryProvider from "./query-provider";
import NextThemeProvider from "./theme-provider";

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <QueryProvider>
      <GTMProvider>
        <NextThemeProvider>{children}</NextThemeProvider>
      </GTMProvider>
    </QueryProvider>
  );
}
