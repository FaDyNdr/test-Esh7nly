import React, { createContext, useState, useContext, ReactNode, useEffect } from 'react'
import { Language, translations } from '../lib/translations'

type LanguageContextType = {
  language: Language
  setLanguage: (lang: Language) => void
  t: (key: string) => string
}

const LanguageContext = createContext<LanguageContextType>({
  language: 'en',
  setLanguage: () => {},
  t: () => ''
})

const safeLocalStorage = {
  getItem: (key: string): string | null => {
    try {
      return localStorage.getItem(key)
    } catch (error) {
      console.error('LocalStorage access error:', error)
      return null
    }
  },
  setItem: (key: string, value: string): void => {
    try {
      localStorage.setItem(key, value)
    } catch (error) {
      console.error('LocalStorage access error:', error)
    }
  }
}

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [language, setLanguageState] = useState<Language>('en')

  useEffect(() => {
    const savedLanguage = safeLocalStorage.getItem('language') as Language | null
    if (savedLanguage && translations[savedLanguage]) {
      setLanguageState(savedLanguage)
    }
  }, [])

  const setLanguage = (lang: Language) => {
    if (translations[lang]) {
      setLanguageState(lang)
      safeLocalStorage.setItem('language', lang)
    } else {
      console.error(`Invalid language code: ${lang}`)
    }
  }

  const t = (key: string) => {
    const keys = key.split('.')
    return keys.reduce((obj, k) => obj?.[k], translations[language]) || key
  }

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider')
  }
  return context
}
