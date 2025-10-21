// src/hooks/useLanguage.ts
import { useState, useEffect } from 'react'
import { Language, getTranslations, Translations } from '@/lib/i18n'

export const useLanguage = () => {
  const [language, setLanguage] = useState<Language>('pt')
  const [translations, setTranslations] = useState<Translations>(getTranslations('pt'))

  useEffect(() => {
    // Load language from localStorage or default to 'pt'
    const savedLanguage = localStorage.getItem('language') as Language
    if (savedLanguage && (savedLanguage === 'pt' || savedLanguage === 'en')) {
      setLanguage(savedLanguage)
      setTranslations(getTranslations(savedLanguage))
    }
  }, [])

  const changeLanguage = (newLanguage: Language) => {
    setLanguage(newLanguage)
    setTranslations(getTranslations(newLanguage))
    localStorage.setItem('language', newLanguage)
  }

  const toggleLanguage = () => {
    const newLanguage = language === 'pt' ? 'en' : 'pt'
    changeLanguage(newLanguage)
  }

  return {
    language,
    translations,
    changeLanguage,
    toggleLanguage
  }
}
