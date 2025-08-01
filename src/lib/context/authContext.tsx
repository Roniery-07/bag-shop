'use client'

import { createContext, useContext, useEffect, useState, ReactNode } from 'react'

interface AuthContextData {
  signed: boolean
  setSigned: (value: boolean) => void
}

const AuthContext = createContext<AuthContextData | undefined>(undefined)

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [signed, setSigned] = useState(false)

  
  useEffect(() => {
    const checkSession = async () => {
      try {
        const res = await fetch('/api/session')
        if (res.ok) {
          const session = await res.json()
          setSigned(!!session)
        } else {
          setSigned(false)
        }
      } catch {
        setSigned(false)
      }
    }

    checkSession()
  }, [])

  return (
    <AuthContext.Provider value={{ signed, setSigned }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = (): AuthContextData => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth deve ser usado dentro de um <AuthProvider>')
  }
  return context
}
