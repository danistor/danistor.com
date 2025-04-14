'use client'

import { createContext, useState, useEffect, useCallback } from 'react'
import type { ReactNode } from 'react'
import { en, de, fr, it } from '@/locales'

// Make Translations type more flexible by making all properties optional
type Translations = Partial<typeof en>
export type LocaleKey = 'en' | 'de' | 'fr' | 'it'

const translations: Record<LocaleKey, Translations> = { en, de, fr, it }

interface I18nContextType {
  locale: LocaleKey
  setLocale: (locale: LocaleKey) => void
  t: (key: string) => string
}

export const I18nContext = createContext<I18nContextType>({
  locale: 'en',
  setLocale: () => {},
  t: key => key,
})

interface I18nProviderProps {
  children: ReactNode
  locale?: LocaleKey
}

export function I18nProvider({ children, locale = 'en' }: I18nProviderProps) {
  const [currentLocale, setCurrentLocale] = useState<LocaleKey>(locale)
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
    const savedLocale = window.localStorage.getItem('locale') as LocaleKey | null
    if (savedLocale && savedLocale in translations) {
      setCurrentLocale(savedLocale)
    }
  }, [])

  useEffect(() => {
    if (isClient) {
      window.localStorage.setItem('locale', currentLocale)
    }
  }, [currentLocale, isClient])

  const t = useCallback(
    (key: string): string => {
      const keys = key.split('.')
      const currentTranslations = translations[currentLocale] ?? translations.en
      let value: unknown = currentTranslations

      for (const k of keys) {
        value = (value as Record<string, unknown>)?.[k]
        if (value === undefined) {
          console.warn(`Translation missing for key: ${key}`)
          return key
        }
      }

      return String(value)
    },
    [currentLocale]
  )

  return (
    <I18nContext.Provider
      value={{
        locale: currentLocale,
        setLocale: setCurrentLocale as (locale: LocaleKey) => void,
        t,
      }}
    >
      {children}
    </I18nContext.Provider>
  )
}
