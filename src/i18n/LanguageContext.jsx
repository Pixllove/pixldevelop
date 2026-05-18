import { createContext, useContext, useEffect, useMemo, useState } from 'react'

const LanguageContext = createContext(null)

const SUPPORTED_LANGUAGES = ['en', 'de']
const STORAGE_KEY = 'pixl-language'

function getBrowserLocales() {
  if (typeof navigator === 'undefined') return []
  return Array.isArray(navigator.languages) && navigator.languages.length
    ? navigator.languages
    : [navigator.language].filter(Boolean)
}

function shouldDefaultToGerman() {
  const locales = getBrowserLocales().map((locale) => locale.toLowerCase())
  const hasGermanLocale = locales.some((locale) => locale === 'de' || locale.startsWith('de-'))
  const hasGermanyRegion = locales.some((locale) => /[-_]de\b/.test(locale))
  const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone

  return hasGermanLocale || hasGermanyRegion || timeZone === 'Europe/Berlin'
}

function getInitialLanguage() {
  if (typeof window === 'undefined') return 'en'
  const stored = window.localStorage.getItem(STORAGE_KEY)
  if (SUPPORTED_LANGUAGES.includes(stored)) return stored
  return shouldDefaultToGerman() ? 'de' : 'en'
}

export function LanguageProvider({ children }) {
  const [language, setLanguage] = useState(getInitialLanguage)

  useEffect(() => {
    if (typeof window === 'undefined') return
    window.localStorage.setItem(STORAGE_KEY, language)
    document.documentElement.lang = language
  }, [language])

  const value = useMemo(() => ({ language, setLanguage }), [language])

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (!context) throw new Error('useLanguage must be used inside LanguageProvider')
  return context
}

export function useI18n() {
  const { language } = useLanguage()
  const isGerman = language === 'de'
  const t = (english, german) => (isGerman ? german : english)
  return { language, isGerman, t }
}
