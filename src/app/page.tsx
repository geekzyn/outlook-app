import { createClient } from '@/utils/supabase/server'
import LoginButton from '@/components/auth/LoginButton'
import LogoutButton from '@/components/auth/LogoutButton'

export default async function Home() {
  const supabase = await createClient()
  
  const {
    data: { user },
  } = await supabase.auth.getUser()

  return (
    <div className="font-sans grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20">
      <main className="flex flex-col gap-[32px] row-start-2 items-center">
        {user ? (
          <div className="text-center space-y-6">
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white">
              Welcome!
            </h1>
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 max-w-md">
              <p className="text-lg text-gray-700 dark:text-gray-300 mb-2">
                You are signed in as:
              </p>
              <p className="text-xl font-semibold text-blue-600 dark:text-blue-400 break-all">
                {user.email}
              </p>
            </div>
            <LogoutButton />
          </div>
        ) : (
          <div className="text-center space-y-6">
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white">
              Welcome to Outlook App
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-400">
              Please sign in with your Microsoft account to continue
            </p>
            <LoginButton />
          </div>
        )}
      </main>
    </div>
  );
}
