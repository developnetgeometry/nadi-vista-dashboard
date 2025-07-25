import { useState } from "react"
import { NavLink, useLocation } from "react-router-dom"
import {
  Home,
  Users,
  Cpu,
  Settings,
  Calendar,
  FileText,
  CreditCard,
  DollarSign,
  Building2,
  ChevronDown,
  BarChart3,
  HelpCircle,
  UserX,
  Share2,
  ClipboardList
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
  SidebarTrigger,
  useSidebar,
} from "@/components/ui/sidebar"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"

const navigationItems = [
  {
    title: "Admin Console",
    items: [
      { title: "Home", url: "/home", icon: Home },
      { title: "Membership", url: "/membership", icon: Users },
      { title: "Smart Services", url: "/smart-services", icon: Cpu },
      { title: "Operation", url: "/operation", icon: Settings },
      { title: "Takwim", url: "/takwim", icon: Calendar },
      { title: "Claim", url: "/claim", icon: FileText }
    ]
  },
  {
    title: "Site Management",
    items: [
      { title: "Finance Management", url: "/finance", icon: DollarSign }
    ]
  },
  {
    title: "Member Management",
    items: []
  },
  {
    title: "Asset Management", 
    items: []
  },
  {
    title: "Finance Management",
    items: []
  },
  {
    title: "Programmes Management",
    items: []
  },
  {
    title: "Claim Management",
    items: []
  },
  {
    title: "Compliance",
    items: []
  },
  {
    title: "Announcements",
    items: []
  },
  {
    title: "Vendor Management",
    items: []
  }
]

export function AppSidebar() {
  const { state } = useSidebar()
  const location = useLocation()
  const currentPath = location.pathname
  const [openGroups, setOpenGroups] = useState(["Admin Console"])

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
            {state === "collapsed" ? "N" : "NADI"}
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