export interface GraphEmail {
  id: string
  subject: string
  bodyPreview: string
  from: {
    emailAddress: {
      name: string
      address: string
    }
  }
  receivedDateTime: string
  isRead: boolean
  importance: string
  hasAttachments: boolean
}

export class GraphClient {
  private accessToken: string

  constructor(accessToken: string) {
    this.accessToken = accessToken
  }

  private async makeRequest(endpoint: string) {
    const response = await fetch(`https://graph.microsoft.com/v1.0${endpoint}`, {
      headers: {
        'Authorization': `Bearer ${this.accessToken}`,
        'Content-Type': 'application/json',
      },
    })

    if (!response.ok) {
      throw new Error(`Graph API error: ${response.status} ${response.statusText}`)
    }

    return response.json()
  }

  async getEmails(top: number = 10): Promise<GraphEmail[]> {
    const data = await this.makeRequest(`/me/messages?$top=${top}&$orderby=receivedDateTime desc`)
    return data.value
  }

  async getEmail(id: string): Promise<GraphEmail> {
    return this.makeRequest(`/me/messages/${id}`)
  }

  async markAsRead(id: string): Promise<void> {
    await fetch(`https://graph.microsoft.com/v1.0/me/messages/${id}`, {
      method: 'PATCH',
      headers: {
        'Authorization': `Bearer ${this.accessToken}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        isRead: true
      })
    })
  }
}