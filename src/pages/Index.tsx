import { useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { useAuth } from "@/contexts/AuthContext"

const Index = () => {
  const { userType, isAuthenticated } = useAuth()
  const navigate = useNavigate()

  useEffect(() => {
    if (isAuthenticated && userType) {
      // Redirect to appropriate dashboard based on user type
      if (userType === 'dusp') {
        navigate('/operation')
      } else if (userType === 'sso') {
        navigate('/sso')
      }
    } else {
      // Redirect to login if not authenticated
      navigate('/login')
    }
  }, [isAuthenticated, userType, navigate])

  return (
    <div className="min-h-screen bg-background flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-primary mb-4">NADI</h1>
        <p className="text-muted-foreground">Redirecting...</p>
      </div>
    </div>
  )
}

export default Index
