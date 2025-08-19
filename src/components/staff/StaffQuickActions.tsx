import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { NavLink } from "react-router-dom"
import { 
  FileText, 
  Clock, 
  Calendar, 
  GraduationCap, 
  CreditCard, 
  RefreshCw,
  ArrowRight,
  Sparkles
} from "lucide-react"

const quickActions = [
  {
    title: "Leave Application",
    description: "Apply for leave and manage requests",
    icon: FileText,
    url: "/staff/leave",
    color: "blue"
  },
  {
    title: "Attendance",
    description: "View attendance records and history",
    icon: Clock,
    url: "/staff/attendance",
    color: "green"
  },
  {
    title: "Calendar",
    description: "Manage schedules and events",
    icon: Calendar,
    url: "/staff/calendar",
    color: "purple"
  },
  {
    title: "Training",
    description: "Access training programs",
    icon: GraduationCap,
    url: "/staff/training",
    color: "indigo"
  },
  {
    title: "Payroll",
    description: "View salary and payment details",
    icon: CreditCard,
    url: "/staff/payroll",
    color: "orange"
  }
]

export function StaffQuickActions() {
  return (
    <Card className="shadow-md border-0 hover:shadow-lg transition-all duration-300">
      <CardHeader className="pb-6">
        <CardTitle className="flex items-center gap-3 text-xl">
          <div className="p-2 bg-gradient-to-br from-primary/20 to-primary/10 rounded-lg">
            <Sparkles className="h-6 w-6 text-primary" />
          </div>
          Quick Actions
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {quickActions.map((item, index) => (
            <NavLink
              key={index}
              to={item.url}
              className="group p-5 border rounded-xl hover:shadow-md hover:border-primary/30 transition-all duration-300 bg-gradient-to-br from-gray-50 to-white hover:from-primary/5 hover:to-primary/10"
            >
              <div className="flex items-start gap-4">
                <div className={`p-3 bg-${item.color}-100 rounded-xl group-hover:bg-${item.color}-200 transition-colors shadow-sm`}>
                  <item.icon className={`h-6 w-6 text-${item.color}-600`} />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors mb-1">
                    {item.title}
                  </h3>
                  <p className="text-sm text-muted-foreground line-clamp-2 leading-relaxed">
                    {item.description}
                  </p>
                </div>
                <ArrowRight className="h-5 w-5 text-muted-foreground group-hover:text-primary transition-colors opacity-0 group-hover:opacity-100 transform translate-x-1 group-hover:translate-x-0" />
              </div>
            </NavLink>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}