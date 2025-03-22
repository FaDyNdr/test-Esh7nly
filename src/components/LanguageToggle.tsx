import React from 'react'
import { Globe } from 'lucide-react'
import { useLanguage } from '../contexts/LanguageContext'

const LanguageToggle: React.FC = () => {
  const { language, setLanguage } = useLanguage()

  const toggleLanguage = () => {
    setLanguage(language === 'en' ? 'ar' : 'en')
  }

  return (
    <button 
      onClick={toggleLanguage}
      className="fixed top-4 right-4 bg-white/20 hover:bg-white/30 p-2 rounded-full transition-all duration-300 flex items-center justify-center"
      aria-label="Toggle Language"
    >
      <Globe className="w-6 h-6 text-white" />
      <span className="ml-2 text-white font-medium">
        {language === 'en' ? 'AR' : 'EN'}
      </span>
    </button>
  )
}

export default LanguageToggle
