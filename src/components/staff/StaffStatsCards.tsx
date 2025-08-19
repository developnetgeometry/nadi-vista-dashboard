import { Card, CardContent } from "@/components/ui/card"
import { FileText, Clock, Target, DollarSign } from "lucide-react"

const stats = [
  {
    title: "Leave Balance",
    value: "18",
    unit: "days",
    icon: FileText,
    trend: "+2 from last month"
  },
  {
    title: "Attendance Rate",
    value: "98%",
    unit: "this month",
    icon: Target,
    trend: "On track"
  },
  {
    title: "Working Hours",
    value: "176",
    unit: "hours",
    icon: Clock,
    trend: "Standard week"
  },
  {
    title: "Monthly Salary",
    value: "RM 4,500",
    unit: "net pay",
    icon: DollarSign,
    trend: "Current month"
  }
]

export function StaffStatsCards() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {stats.map((stat, index) => (
        <Card key={index} className="hover:shadow-md transition-shadow">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="p-2 bg-primary/10 rounded-lg">
                <stat.icon className="h-5 w-5 text-primary" />
              </div>
            </div>
            <div className="space-y-1">
              <p className="text-sm font-medium text-muted-foreground">{stat.title}</p>
              <div className="flex items-baseline gap-2">
                <p className="text-2xl font-bold text-foreground">{stat.value}</p>
                <p className="text-xs text-muted-foreground">{stat.unit}</p>
              </div>
              <p className="text-xs text-muted-foreground">{stat.trend}</p>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}