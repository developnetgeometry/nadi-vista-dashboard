import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { NavLink } from "react-router-dom"
import { 
  FileText, 
  Clock, 
  Calendar, 
  GraduationCap, 
  CreditCard, 
  RefreshCw,
  ArrowRight 
} from "lucide-react"

const quickActions = [
  {
    title: "Leave Application",
    description: "Apply for leave and manage requests",
    icon: FileText,
    url: "/staff/leave"
  },
  {
    title: "Attendance",
    description: "View attendance records and history",
    icon: Clock,
    url: "/staff/attendance"
  },
  {
    title: "Calendar",
    description: "Manage schedules and events",
    icon: Calendar,
    url: "/staff/calendar"
  },
  {
    title: "Training",
    description: "Access training programs",
    icon: GraduationCap,
    url: "/staff/training"
  },
  {
    title: "Payroll",
    description: "View salary and payment details",
    icon: CreditCard,
    url: "/staff/payroll"
  },
  {
    title: "Replacement Leave",
    description: "Track replacement leave balance",
    icon: RefreshCw,
    url: "/staff/replacement"
  }
]

export function StaffQuickActions() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Quick Actions</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {quickActions.map((item, index) => (
            <NavLink
              key={index}
              to={item.url}
              className="group p-4 border rounded-lg hover:shadow-md hover:border-primary/20 transition-all"
            >
              <div className="flex items-start gap-3">
                <div className="p-2 bg-primary/10 rounded-lg group-hover:bg-primary/20 transition-colors">
                  <item.icon className="h-5 w-5 text-primary" />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-medium text-sm text-foreground group-hover:text-primary transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-xs text-muted-foreground mt-1 line-clamp-2">
                    {item.description}
                  </p>
                </div>
                <ArrowRight className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors opacity-0 group-hover:opacity-100" />
              </div>
            </NavLink>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}