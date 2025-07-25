import { ReactNode } from "react"
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { SSOSidebar } from "./SSOSidebar"
import { Bell, Mail, User, LogOut } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useAuth } from "@/contexts/AuthContext"

interface SSODashboardLayoutProps {
  children: ReactNode
}

export function SSODashboardLayout({ children }: SSODashboardLayoutProps) {
  const { logout } = useAuth()

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full">
        <SSOSidebar />
        
        <div className="flex-1 flex flex-col">
          {/* Header */}
          <header className="h-16 border-b border-border bg-card flex items-center justify-between px-6">
            <div className="flex items-center gap-4">
              <SidebarTrigger />
            </div>
            
            <div className="flex items-center gap-4">
              <Button variant="ghost" size="icon">
                <Mail className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="icon">
                <Bell className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="icon" onClick={logout} title="Logout">
                <LogOut className="h-4 w-4" />
              </Button>
              <div className="flex items-center gap-2 bg-primary/10 px-3 py-2 rounded-lg">
                <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                  <span className="text-primary-foreground text-sm font-medium">S</span>
                </div>
                <div className="text-sm">
                  <p className="font-medium">SSO User</p>
                  <p className="text-muted-foreground">Multi-Pillar Access</p>
                </div>
              </div>
            </div>
          </header>

          {/* Main Content */}
          <main className="flex-1 p-6 bg-background">
            {children}
          </main>
        </div>
      </div>
    </SidebarProvider>
  )
}