export const translations = {
  en: {
    auth: {
      welcomeBack: 'Welcome Back',
      createAccount: 'Create Account',
      email: 'Email',
      password: 'Password',
      login: 'Log In',
      signup: 'Sign Up',
      needAccount: 'Need an account? Sign Up',
      haveAccount: 'Already have an account? Log In',
      welcome: 'Welcome, ',
      signOut: 'Sign Out'
    },
    errors: {
      authError: 'Authentication Error'
    }
  },
  ar: {
    auth: {
      welcomeBack: 'مرحبًا بعودتك',
      createAccount: 'إنشاء حساب',
      email: 'البريد الإلكتروني',
      password: 'كلمة المرور',
      login: 'تسجيل الدخول',
      signup: 'إنشاء حساب',
      needAccount: 'هل تحتاج إلى حساب؟ سجل الآن',
      haveAccount: 'هل لديك حساب بالفعل؟ تسجيل الدخول',
      welcome: 'مرحبًا، ',
      signOut: 'تسجيل الخروج'
    },
    errors: {
      authError: 'خطأ في المصادقة'
    }
  }
}

export type Language = keyof typeof translations
