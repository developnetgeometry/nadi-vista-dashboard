import { createContext, useContext, useState, useEffect, ReactNode } from 'react'

export type UserType = 'dusp' | 'sso' | null

interface AuthContextType {
  userType: UserType
  login: (type: UserType) => void
  logout: () => void
  isAuthenticated: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [userType, setUserType] = useState<UserType>(null)

  useEffect(() => {
    // Check if user is already logged in
    const savedUserType = localStorage.getItem('userType') as UserType
    if (savedUserType) {
      setUserType(savedUserType)
    }
  }, [])

  const login = (type: UserType) => {
    setUserType(type)
    if (type) {
      localStorage.setItem('userType', type)
    }
  }

  const logout = () => {
    setUserType(null)
    localStorage.removeItem('userType')
  }

  const isAuthenticated = userType !== null

  return (
    <AuthContext.Provider value={{ userType, login, logout, isAuthenticated }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}