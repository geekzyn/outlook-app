'use client'

import { createClient } from '@/utils/supabase/client'

export default function LoginButton() {
  const supabase = createClient()

  const handleLogin = async () => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'azure',
      options: {
        redirectTo: `${window.location.origin}/auth/callback`,
        scopes: 'email',
      },
    })

    if (error) {
      console.error('Error logging in:', error.message)
    }
  }

  return (
    <button
      onClick={handleLogin}
      className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200"
    >
      Sign in with Microsoft
    </button>
  )
}
