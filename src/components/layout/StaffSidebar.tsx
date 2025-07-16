import { Home, Calendar, Clock, FileText, GraduationCap, CreditCard, User } from "lucide-react"
import { NavLink } from "react-router-dom"
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"

const items = [
  {
    title: "Home",
    url: "/staff",
    icon: Home,
  },
  {
    title: "Leave Application",
    url: "/staff/leave",
    icon: FileText,
  },
  {
    title: "Attendance",
    url: "/staff/attendance",
    icon: Clock,
  },
  {
    title: "Calendar",
    url: "/staff/calendar",
    icon: Calendar,
  },
  {
    title: "Training",
    url: "/staff/training",
    icon: GraduationCap,
  },
  {
    title: "Payroll",
    url: "/staff/payroll",
    icon: CreditCard,
  },
]

export function StaffSidebar() {
  return (
    <Sidebar>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Staff Portal</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <NavLink 
                      to={item.url} 
                      end={item.url === "/staff"}
                      className={({ isActive }) =>
                        isActive ? "bg-accent text-accent-foreground" : ""
                      }
                    >
                      <item.icon />
                      <span>{item.title}</span>
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  )
}