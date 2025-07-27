'use client'

import { GraphEmail } from '@/utils/graph/client'

interface EmailCardProps {
  email: GraphEmail
}

export default function EmailCard({ email }: EmailCardProps) {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    const now = new Date()
    const diffInHours = (now.getTime() - date.getTime()) / (1000 * 60 * 60)

    if (diffInHours < 24) {
      return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    } else if (diffInHours < 7 * 24) {
      return date.toLocaleDateString([], { weekday: 'short' })
    } else {
      return date.toLocaleDateString([], { month: 'short', day: 'numeric' })
    }
  }

  const getImportanceColor = (importance: string) => {
    switch (importance) {
      case 'high':
        return 'text-red-600'
      case 'low':
        return 'text-gray-400'
      default:
        return 'text-gray-600'
    }
  }

  return (
    <div className={`bg-white border rounded-lg p-4 hover:shadow-md transition-shadow cursor-pointer ${
      !email.isRead ? 'border-blue-200 bg-blue-50' : 'border-gray-200'
    }`}>
      <div className="flex items-start justify-between">
        <div className="flex-1 min-w-0">
          <div className="flex items-center space-x-2 mb-1">
            <p className={`text-sm font-medium truncate ${
              !email.isRead ? 'text-gray-900 font-semibold' : 'text-gray-700'
            }`}>
              {email.from.emailAddress.name || email.from.emailAddress.address}
            </p>
            {email.hasAttachments && (
              <svg className="h-4 w-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13" />
              </svg>
            )}
            {email.importance !== 'normal' && (
              <span className={`text-xs ${getImportanceColor(email.importance)}`}>
                {email.importance === 'high' ? '!' : '↓'}
              </span>
            )}
          </div>
          <h3 className={`text-sm mb-2 line-clamp-1 ${
            !email.isRead ? 'font-semibold text-gray-900' : 'text-gray-800'
          }`}>
            {email.subject || '(No Subject)'}
          </h3>
          <p className="text-sm text-gray-600 line-clamp-2">
            {email.bodyPreview}
          </p>
        </div>
        <div className="flex flex-col items-end ml-4">
          <span className="text-xs text-gray-500">
            {formatDate(email.receivedDateTime)}
          </span>
          {!email.isRead && (
            <div className="w-2 h-2 bg-blue-600 rounded-full mt-2"></div>
          )}
        </div>
      </div>
    </div>
  )
}