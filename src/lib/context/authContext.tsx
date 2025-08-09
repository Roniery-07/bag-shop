'use client'

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  ReactNode,
} from 'react'

type User = {
  id: string
  name: string
  email: string
  role?: 'user' | 'admin'
  avatarUrl?: string
}

type AuthContextData = {
  user: User | null
  isAuthenticated: boolean
  isLoading: boolean
  setUser: React.Dispatch<React.SetStateAction<User | null>>
  refresh: () => Promise<void>
  signOut: () => Promise<void>
}

const AuthContext = createContext<AuthContextData | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  const refresh = useCallback(async () => {
    setIsLoading(true)
    try {
      const res = await fetch('/api/session', { credentials: 'include' })
      if (res.ok) {
        const data = (await res.json()) as User | null 
        setUser(data ?? null)
      } else {
        setUser(null)
      }
    } catch {
      setUser(null)
    } finally {
      setIsLoading(false)
    }
  }, [])

  const signOut = useCallback(async () => {
    try {
      await fetch('/api/logout', { method: 'POST', credentials: 'include' })
    } finally {
      setUser(null)
      // sincroniza entre abas
      try {
        localStorage.setItem('auth:changed', String(Date.now()))
      } catch {}
    }
  }, [])

  useEffect(() => {
    // primeira carga
    refresh()

    // revalidar ao focar a aba
    const onFocus = () => refresh()
    window.addEventListener('focus', onFocus)

    // sincronizar entre abas
    const onStorage = (e: StorageEvent) => {
      if (e.key === 'auth:changed') refresh()
    }
    window.addEventListener('storage', onStorage)

    return () => {
      window.removeEventListener('focus', onFocus)
      window.removeEventListener('storage', onStorage)
    }
  }, [refresh])

  const isAuthenticated = useMemo(() => !!user, [user])

  const value: AuthContextData = {
    user,
    isAuthenticated,
    isLoading,
    setUser,
    refresh,
    signOut,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export const useAuth = () => {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth deve ser usado dentro de <AuthProvider>')
  return ctx
}
