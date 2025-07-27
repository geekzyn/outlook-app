'use client'

import { useState, useEffect } from 'react'
import { createClient } from '@/utils/supabase/client'
import { GraphClient, GraphEmail } from '@/utils/graph/client'

export function useEmails() {
  const [emails, setEmails] = useState<GraphEmail[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const supabase = createClient()

  const fetchEmails = async () => {
    try {
      setLoading(true)
      setError(null)

      // Get the current session
      const { data: { session }, error: sessionError } = await supabase.auth.getSession()
      
      if (sessionError) {
        throw new Error(`Session error: ${sessionError.message}`)
      }

      if (!session?.provider_token) {
        throw new Error('No access token available')
      }

      // Create Graph client and fetch emails
      const graphClient = new GraphClient(session.provider_token)
      const emailData = await graphClient.getEmails(20)
      setEmails(emailData)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch emails')
      console.error('Error fetching emails:', err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchEmails()
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  return {
    emails,
    loading,
    error,
    refetch: fetchEmails
  }
}