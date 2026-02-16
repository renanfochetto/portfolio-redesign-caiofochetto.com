"use client";

import { I18nProvider } from "@/lib/i18n";
import { ThemeProvider } from "@/components/theme-provider";

export default function ProductionLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <I18nProvider locale="pt">
      <ThemeProvider>{children}</ThemeProvider>
    </I18nProvider>
  );
}
