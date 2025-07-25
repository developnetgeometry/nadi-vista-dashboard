import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { useAuth } from "@/contexts/AuthContext"
import { Building2, Users, UserCheck, Lock, ArrowRight } from "lucide-react"

export default function Login() {
  const [selectedLoginType, setSelectedLoginType] = useState<'dusp' | 'sso' | 'staff' | 'tp' | null>(null)
  const { login } = useAuth()
  const navigate = useNavigate()

  const handleLogin = () => {
    if (selectedLoginType) {
      login(selectedLoginType)
      // Navigate to appropriate dashboard
      if (selectedLoginType === 'dusp') {
        navigate('/operation') // DUSP dashboard
      } else if (selectedLoginType === 'sso') {
        navigate('/sso') // SSO dashboard  
      } else if (selectedLoginType === 'staff') {
        navigate('/staff') // Staff dashboard
      } else if (selectedLoginType === 'tp') {
        navigate('/tp') // TP dashboard
      }
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 to-secondary/5 flex items-center justify-center p-4">
      <div className="w-full max-w-md space-y-6">
        {/* Header */}
        <div className="text-center space-y-2">
          <h1 className="text-4xl font-bold text-primary">NADI</h1>
          <p className="text-muted-foreground">Please select your login type to continue</p>
        </div>

        {/* Login Options */}
        <div className="space-y-4">
          {/* DUSP Login */}
          <Card 
            className={`cursor-pointer transition-all duration-200 hover:shadow-lg ${
              selectedLoginType === 'dusp' 
                ? 'ring-2 ring-primary bg-primary/5' 
                : 'hover:bg-muted/50'
            }`}
            onClick={() => setSelectedLoginType('dusp')}
          >
            <CardContent className="p-6">
              <div className="flex items-center space-x-4">
                <div className="p-3 bg-blue-100 rounded-lg">
                  <Building2 className="h-6 w-6 text-blue-600" />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-lg">DUSP Login</h3>
                  <p className="text-sm text-muted-foreground">
                    Access DUSP dashboard with full administrative controls
                  </p>
                  <div className="flex gap-2 mt-2">
                    <Badge variant="secondary" className="text-xs">Admin Console</Badge>
                    <Badge variant="secondary" className="text-xs">Full Access</Badge>
                  </div>
                </div>
                {selectedLoginType === 'dusp' && (
                  <div className="p-2 bg-primary rounded-full">
                    <ArrowRight className="h-4 w-4 text-primary-foreground" />
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* SSO Login */}
          <Card 
            className={`cursor-pointer transition-all duration-200 hover:shadow-lg ${
              selectedLoginType === 'sso' 
                ? 'ring-2 ring-primary bg-primary/5' 
                : 'hover:bg-muted/50'
            }`}
            onClick={() => setSelectedLoginType('sso')}
          >
            <CardContent className="p-6">
              <div className="flex items-center space-x-4">
                <div className="p-3 bg-green-100 rounded-lg">
                  <Users className="h-6 w-6 text-green-600" />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-lg">SSO Login</h3>
                  <p className="text-sm text-muted-foreground">
                    Access pillar-specific dashboard with multi-pillar selection
                  </p>
                  <div className="flex gap-2 mt-2">
                    <Badge variant="secondary" className="text-xs">Multi-Pillar</Badge>
                    <Badge variant="secondary" className="text-xs">Filtered Data</Badge>
                  </div>
                </div>
                {selectedLoginType === 'sso' && (
                  <div className="p-2 bg-primary rounded-full">
                    <ArrowRight className="h-4 w-4 text-primary-foreground" />
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Staff Login */}
          <Card 
            className={`cursor-pointer transition-all duration-200 hover:shadow-lg ${
              selectedLoginType === 'staff' 
                ? 'ring-2 ring-primary bg-primary/5' 
                : 'hover:bg-muted/50'
            }`}
            onClick={() => setSelectedLoginType('staff')}
          >
            <CardContent className="p-6">
              <div className="flex items-center space-x-4">
                <div className="p-3 bg-purple-100 rounded-lg">
                  <UserCheck className="h-6 w-6 text-purple-600" />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-lg">Staff Login</h3>
                  <p className="text-sm text-muted-foreground">
                    Access staff dashboard for Manager and Assistant Manager
                  </p>
                  <div className="flex gap-2 mt-2">
                    <Badge variant="secondary" className="text-xs">HR Module</Badge>
                    <Badge variant="secondary" className="text-xs">Staff Portal</Badge>
                  </div>
                </div>
                {selectedLoginType === 'staff' && (
                  <div className="p-2 bg-primary rounded-full">
                    <ArrowRight className="h-4 w-4 text-primary-foreground" />
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Login Button */}
        <Button 
          onClick={handleLogin} 
          disabled={!selectedLoginType}
          className="w-full py-6 text-lg"
          size="lg"
        >
          <Lock className="h-5 w-5 mr-2" />
          {selectedLoginType 
            ? `Login as ${selectedLoginType.toUpperCase()}`
            : 'Select Login Type'
          }
        </Button>

        {/* Info */}
        <div className="text-center text-sm text-muted-foreground">
          <p>Choose your access level to view the appropriate dashboard</p>
        </div>
      </div>
    </div>
  )
}