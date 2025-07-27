import { createClient } from '@/utils/supabase/server'
import LoginButton from '@/components/auth/LoginButton'
import LogoutButton from '@/components/auth/LogoutButton'
import EmailList from '@/components/emails/EmailList'

export default async function Home() {
  const supabase = await createClient()
  
  const {
    data: { user },
  } = await supabase.auth.getUser()

  return (
    <div className="min-h-screen bg-gray-50">
      {user ? (
        <div className="max-w-4xl mx-auto py-8 px-4">
          <header className="bg-white rounded-lg shadow-sm p-6 mb-6">
            <div className="flex justify-between items-center">
              <div>
                <h1 className="text-2xl font-bold text-gray-900">
                  Outlook Dashboard
                </h1>
                <p className="text-gray-600 mt-1">
                  Welcome back, {user.email}
                </p>
              </div>
              <LogoutButton />
            </div>
          </header>
          
          <main className="bg-white rounded-lg shadow-sm p-6">
            <EmailList />
          </main>
        </div>
      ) : (
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center space-y-6">
            <h1 className="text-4xl font-bold text-gray-900">
              Outlook App
            </h1>
            <p className="text-lg text-gray-600">
              Sign in with your Microsoft account to view your emails
            </p>
            <LoginButton />
          </div>
        </div>
      )}
    </div>
  );
}
