"use client";

import QueryProvider from "./query-provider";
import NextThemeProvider from "./theme-provider";

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <QueryProvider>
      <NextThemeProvider>{children}</NextThemeProvider>
    </QueryProvider>
  );
}
