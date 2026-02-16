"use client";

import { I18nProvider } from "@/lib/i18n";
import { ThemeProvider } from "@/components/theme-provider";
import { useParams } from "next/navigation";

export default function ProductionLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const params = useParams();
  const locale = (params.locale as string) || "pt";

  return (
    <I18nProvider locale={locale as "pt" | "en"}>
      <ThemeProvider>{children}</ThemeProvider>
    </I18nProvider>
  );
}
