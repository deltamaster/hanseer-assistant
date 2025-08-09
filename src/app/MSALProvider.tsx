'use client'
import { MsalProvider } from '@azure/msal-react'
import { PublicClientApplication, EventType } from '@azure/msal-browser'
import { msalConfig } from '@/authConfig'
import { logUserInfo } from '@/utils/logger'

const pca = new PublicClientApplication(msalConfig)

// Add event callback for login
pca.addEventCallback((event) => {
  if (event.eventType === EventType.LOGIN_SUCCESS && event.payload && 'account' in event.payload) {
    logUserInfo(event.payload.account)
  }
})

export default function MSALProvider({ children }: { children: React.ReactNode }) {
  return <MsalProvider instance={pca}>{children}</MsalProvider>
}
