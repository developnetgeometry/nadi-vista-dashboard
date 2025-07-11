import { useState } from "react"
import { NavLink, useLocation } from "react-router-dom"
import {
  BarChart3,
  Calendar,
  ChevronDown,
  Home,
  Users,
  PieChart
} from "lucide-react"

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"

const navigationItems = [
  {
    title: "SSO Dashboard",
    items: [
      { title: "Dashboard", url: "/sso", icon: BarChart3 },
      { title: "Event Overview", url: "/sso/events", icon: Calendar },
      { title: "Participant Stats", url: "/sso/participants", icon: Users },
      { title: "Event Breakdown", url: "/sso/breakdown", icon: PieChart },
      { title: "Takwim NADI", url: "/sso/takwim", icon: Calendar }
    ]
  }
]

export function SSOSidebar() {
  const { state } = useSidebar()
  const location = useLocation()
  const currentPath = location.pathname
  const [openGroups, setOpenGroups] = useState(["SSO Dashboard"])

  const isActive = (path: string) => currentPath === path

  const toggleGroup = (groupTitle: string) => {
    setOpenGroups(prev => 
      prev.includes(groupTitle) 
        ? prev.filter(g => g !== groupTitle)
        : [...prev, groupTitle]
    )
  }

  return (
    <Sidebar collapsible="icon">
      <SidebarContent className="bg-sidebar">
        {/* NADI Logo/Title */}
        <div className="p-4 border-b border-sidebar-border">
          <h1 className="text-2xl font-bold text-sidebar-foreground">
            {state === "collapsed" ? "SSO" : "NADI SSO"}
          </h1>
        </div>

        {navigationItems.map((group) => (
          <SidebarGroup key={group.title}>
            <Collapsible 
              open={openGroups.includes(group.title)}
              onOpenChange={() => toggleGroup(group.title)}
            >
              <CollapsibleTrigger asChild>
                <SidebarGroupLabel className="flex items-center justify-between cursor-pointer hover:bg-sidebar-accent/50 p-2 rounded-md mx-2">
                  <span className={state === "collapsed" ? "hidden" : ""}>{group.title}</span>
                  {state !== "collapsed" && group.items.length > 0 && (
                    <ChevronDown className={`h-4 w-4 transition-transform ${
                      openGroups.includes(group.title) ? "rotate-180" : ""
                    }`} />
                  )}
                </SidebarGroupLabel>
              </CollapsibleTrigger>
              
              {group.items.length > 0 && (
                <CollapsibleContent>
                  <SidebarGroupContent>
                    <SidebarMenu>
                      {group.items.map((item) => (
                        <SidebarMenuItem key={item.title}>
                          <SidebarMenuButton asChild isActive={isActive(item.url)}>
                            <NavLink to={item.url} end>
                              <item.icon className="h-4 w-4" />
                              <span>{item.title}</span>
                            </NavLink>
                          </SidebarMenuButton>
                        </SidebarMenuItem>
                      ))}
                    </SidebarMenu>
                  </SidebarGroupContent>
                </CollapsibleContent>
              )}
            </Collapsible>
          </SidebarGroup>
        ))}
      </SidebarContent>
    </Sidebar>
  )
}