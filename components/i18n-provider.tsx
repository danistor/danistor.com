'use client'

import { createContext, useCallback, useMemo } from 'react'
import type { ReactNode } from 'react'
import { en, de, fr, it } from '@/locales'

// Make Translations type more flexible
type Translations = Partial<typeof en>
export type LocaleKey = 'en' | 'de' | 'fr' | 'it'

const translations: Record<LocaleKey, Translations> = { en, de, fr, it }

interface I18nContextType {
  locale: LocaleKey
  t: (key: string) => string
}

// Default context might need adjustment if consumers rely on setLocale
export const I18nContext = createContext<I18nContextType>({
  locale: 'en', // Default locale
  t: (key: string) => {
    // Provide a basic default translation lookup for context consumers
    // outside the provider, or just return the key
    const keys = key.split('.')
    let value: unknown = translations.en;
    for (const k of keys) {
      if (typeof value !== 'object' || value === null) return key; // Check if value is an object
      value = (value as Record<string, unknown>)?.[k]; // Type assertion is okay here after check
      if (value === undefined) return key; // Return key if not found
    }
    return String(value);
  },
})

interface I18nProviderProps {
  children: ReactNode
  locale: LocaleKey // Locale is now required and comes from layout/page params
}

export function I18nProvider({ children, locale }: I18nProviderProps) {
  // The t function now depends directly on the locale prop
  const t = useCallback(
    (key: string): string => {
      const keys = key.split('.')
      // Use the locale passed via props, fallback to 'en'
      const currentTranslations = translations[locale] ?? translations.en
      let value: unknown = currentTranslations

      for (const k of keys) {
        value = (value as Record<string, unknown>)?.[k]
        if (value === undefined) {
          // console.warn(`Translation missing for key: ${key} in locale ${locale}`)
          // Fallback to English if key not found in current locale?
          let fallbackValue: unknown = translations.en;
          for (const fk of keys) {
            fallbackValue = (fallbackValue as Record<string, unknown>)?.[fk];
            if (fallbackValue === undefined) return key; // Return key if not in fallback either
          }
          return String(fallbackValue);
        }
      }
      return String(value)
    },
    [locale] // Dependency array now only includes locale
  )

  // Memoize the context value to prevent unnecessary re-renders
  const contextValue = useMemo(() => ({
    locale,
    t,
  }), [locale, t]);

  return (
    <I18nContext.Provider value={contextValue}>
      {children}
    </I18nContext.Provider>
  )
}
