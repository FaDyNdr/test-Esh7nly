import React, { useState, useEffect } from 'react'
import { supabase } from './lib/supabase'
import Auth from './components/Auth'
import LanguageToggle from './components/LanguageToggle'
import { LanguageProvider, useLanguage } from './contexts/LanguageContext'
import { User } from '@supabase/supabase-js'
import { LogOut } from 'lucide-react'

function AppContent() {
  const [user, setUser] = useState<User | null>(null)
  const { t, language } = useLanguage()

  useEffect(() => {
    const { data: authListener } = supabase.auth.onAuthStateChange(
      (event, session) => {
        setUser(session?.user ?? null)
      }
    )

    // Initial check
    const checkUser = async () => {
      const { data: { user } } = await supabase.auth.getUser()
      setUser(user)
    }

    checkUser()

    return () => {
      authListener.subscription.unsubscribe()
    }
  }, [])

  const handleSignOut = async () => {
    await supabase.auth.signOut()
  }

  if (!user) {
    return <Auth />
  }

  return (
    <div 
      className={`min-h-screen bg-gray-100 flex flex-col items-center justify-center ${
        language === 'ar' ? 'rtl' : 'ltr'
      }`}
    >
      <LanguageToggle />
      <div className="bg-white shadow-md rounded-lg p-8 max-w-md w-full">
        <h1 className="text-2xl font-bold mb-4 text-gray-800">
          {t('auth.welcome')}{user.email}
        </h1>
        <button 
          onClick={handleSignOut}
          className="w-full flex items-center justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
        >
          <LogOut className="mr-2" /> {t('auth.signOut')}
        </button>
      </div>
    </div>
  )
}

function App() {
  return (
    <LanguageProvider>
      <AppContent />
    </LanguageProvider>
  )
}

export default App
