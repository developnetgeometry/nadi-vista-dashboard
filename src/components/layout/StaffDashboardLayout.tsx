import { ReactNode } from "react"
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { StaffSidebar } from "./StaffSidebar"
import { Button } from "@/components/ui/button"
import { Mail, Bell, LogOut, User } from "lucide-react"
import { useAuth } from "@/contexts/AuthContext"

interface StaffDashboardLayoutProps {
  children: ReactNode
}

export function StaffDashboardLayout({ children }: StaffDashboardLayoutProps) {
  const { logout } = useAuth()

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full">
        <StaffSidebar />
        <div className="flex-1">
          {/* Header */}
          <header className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <div className="flex h-14 items-center px-4">
              <SidebarTrigger />
              <div className="ml-auto flex items-center space-x-2">
                <Button variant="ghost" size="icon" className="h-8 w-8">
                  <Mail className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="icon" className="h-8 w-8">
                  <Bell className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="icon" className="h-8 w-8" onClick={logout}>
                  <LogOut className="h-4 w-4" />
                </Button>
                <div className="flex items-center space-x-2 border-l pl-2">
                  <User className="h-4 w-4" />
                  <span className="text-sm font-medium">NADI Staff</span>
                </div>
              </div>
            </div>
          </header>
          {/* Main Content */}
          <main className="flex-1 p-6">
            {children}
          </main>
        </div>
      </div>
    </SidebarProvider>
  )
}