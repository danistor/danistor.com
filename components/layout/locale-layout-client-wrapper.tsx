'use client'

import type React from "react";
import { Suspense } from "react";
import { ThemeProvider } from "@/components/theme-provider";
import { I18nProvider, LocaleKey } from "@/components/i18n-provider";
import { Analytics } from "@/components/analytics";
import { SonnerProvider } from "@/components/ui/sonner-provider";

/**
 * Props for the LocaleLayoutClientWrapper component
 */
interface LocaleLayoutClientWrapperProps {
  children: React.ReactNode;
  locale: LocaleKey;
}

/**
 * Client component wrapper that provides theme, internationalization, 
 * analytics, and notification contexts to the application.
 * 
 * This component bridges server components with client-only providers.
 */
export function LocaleLayoutClientWrapper({ children, locale }: LocaleLayoutClientWrapperProps) {
  return (
    <div lang={locale}>
      <ThemeProvider attribute="class" defaultTheme="light">
        <I18nProvider locale={locale}>
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