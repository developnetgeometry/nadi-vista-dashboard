import { AppSidebar } from "@/components/layout/TPSidebar"
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar"

interface TPDashboardLayoutProps {
  children: React.ReactNode
}

export function TPDashboardLayout({ children }: TPDashboardLayoutProps) {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <main className="flex-1 space-y-4 p-4 md:p-8 pt-6">
          {children}
        </main>
      </SidebarInset>
    </SidebarProvider>
  )
}