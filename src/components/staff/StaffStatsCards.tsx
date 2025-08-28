import { Card, CardContent } from "@/components/ui/card"
import { FileText, Clock, Target, DollarSign, TrendingUp } from "lucide-react"

const stats = [
  {
    title: "Leave Balance",
    value: "18",
    unit: "days",
    icon: FileText,
    trend: "+2 from last month",
    color: "blue"
  },
  {
    title: "Attendance Rate",
    value: "98%",
    unit: "this month",
    icon: Target,
    trend: "On track",
    color: "green"
  },
  {
    title: "Working Hours",
    value: "176",
    unit: "hours",
    icon: Clock,
    trend: "Standard week",
    color: "purple"
  },
  {
    title: "Monthly Salary",
    value: "RM 4,500",
    unit: "net pay",
    icon: DollarSign,
    trend: "Current month",
    color: "orange"
  }
]

export function StaffStatsCards() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {stats.map((stat, index) => (
        <Card key={index} data-component="stats-card" className="hover:shadow-lg transition-all duration-300 border-0 shadow-md group">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div className={`p-3 rounded-xl bg-${stat.color}-100 group-hover:bg-${stat.color}-200 transition-colors`}>
                <stat.icon className={`h-6 w-6 text-${stat.color}-600`} />
              </div>
              <TrendingUp className="h-4 w-4 text-green-500" />
            </div>
            <div className="space-y-2">
              <p className="text-sm font-medium text-muted-foreground">{stat.title}</p>
              <div className="flex items-baseline gap-2">
                <p className="text-3xl font-bold text-foreground">{stat.value}</p>
                <p className="text-xs text-muted-foreground font-medium">{stat.unit}</p>
              </div>
              <p className="text-xs text-green-600 font-medium bg-green-50 px-2 py-1 rounded-full inline-block">
                {stat.trend}
              </p>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}