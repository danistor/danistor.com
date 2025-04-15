'use client'

import type React from "react";
import { Suspense } from "react";
import { ThemeProvider } from "@/components/theme-provider";
import { I18nProvider, LocaleKey } from "@/components/i18n-provider";
import { Analytics } from "@/components/analytics";
import { SonnerProvider } from "@/components/ui/sonner-provider";

interface LocaleLayoutClientWrapperProps {
  children: React.ReactNode;
  locale: LocaleKey; // Receive validated/extracted locale as prop
}

export function LocaleLayoutClientWrapper({ children, locale }: LocaleLayoutClientWrapperProps) {

  // Use the passed locale directly
  const validLocale = locale; // Assuming validation happened in server component if needed

  return (
    <div lang={validLocale}>
      <ThemeProvider attribute="class" defaultTheme="light">
        <I18nProvider locale={validLocale}>
          {children}
          <Suspense fallback={null}>
            <Analytics />
          </Suspense>
          <SonnerProvider />
        </I18nProvider>
      </ThemeProvider>
    </div>
  );
} 