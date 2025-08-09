'use client'
import { useMsal } from '@azure/msal-react'
import { useState } from 'react'

export default function Home() {
  const { instance, accounts } = useMsal()
  const [apiResponse, setApiResponse] = useState('')

  const handleLogin = () => {
    instance.loginRedirect()
  }

  const handleLogout = () => {
    instance.logoutRedirect()
  }

  const callApi = async () => {
    try {
      const response = await fetch('/api/hello')
      const data = await response.json()
      setApiResponse(data.message)
    } catch (error) {
      setApiResponse('Error calling API')
    }
  }

  return (
    <main className="p-8">
      <h1 className="text-2xl font-bold mb-4">Personal Assistant</h1>
      
      {accounts.length > 0 ? (
        <div>
          <p>Welcome, {accounts[0].name}!</p>
          <p>Email: {accounts[0].username}</p>
          <p>Account ID: {accounts[0].localAccountId}</p>
          <button 
            onClick={handleLogout}
            className="bg-red-500 text-white px-4 py-2 rounded mt-4"
          >
            Logout
          </button>
        </div>
      ) : (
        <button 
          onClick={handleLogin}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Login with Microsoft
        </button>
      )}

      {accounts.length > 0 && (
        <div className="mt-8">
          <button 
            onClick={callApi}
            className="bg-green-500 text-white px-4 py-2 rounded"
          >
            Call API
          </button>
          {apiResponse && <p className="mt-4">API Response: {apiResponse}</p>}
        </div>
      )}
    </main>
  )
}
