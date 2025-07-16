import { LeaveApplicationSummary } from "@/components/staff/LeaveApplicationSummary"
import { ReplacementLeaveSummary } from "@/components/staff/ReplacementLeaveSummary"
import { AttendanceSummary } from "@/components/staff/AttendanceSummary"
import { CalendarSummary } from "@/components/staff/CalendarSummary"
import { TrainingSummary } from "@/components/staff/TrainingSummary"
import { PayrollSummary } from "@/components/staff/PayrollSummary"
import { Badge } from "@/components/ui/badge"
import { User, Briefcase } from "lucide-react"

const StaffHome = () => {
  const currentTime = new Date().toLocaleTimeString('en-GB', { 
    hour: '2-digit', 
    minute: '2-digit',
    hour12: true 
  })
  
  const currentDate = new Date().toLocaleDateString('en-GB', { 
    weekday: 'long',
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  })

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Enhanced Header */}
      <div className="relative">
        <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-secondary/5 rounded-2xl" />
        <div className="relative p-8 space-y-4">
          <div className="flex items-center justify-between">
            <div className="space-y-2">
              <div className="flex items-center gap-3">
                <div className="p-3 bg-primary/10 rounded-xl">
                  <Briefcase className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h1 className="text-4xl font-bold tracking-tight bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
                    Welcome Back
                  </h1>
                  <p className="text-lg text-muted-foreground">{currentDate}</p>
                </div>
              </div>
              <p className="text-muted-foreground ml-15">
                Your comprehensive staff dashboard for efficient workflow management
              </p>
            </div>
            <div className="text-right space-y-2">
              <Badge variant="outline" className="px-4 py-2 text-sm font-medium">
                <User className="h-4 w-4 mr-2" />
                Manager & Assistant Manager
              </Badge>
              <div className="text-2xl font-mono font-bold text-primary">{currentTime}</div>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Stats Bar */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-gradient-to-r from-blue-500/10 to-blue-600/10 p-4 rounded-xl border border-blue-200/20">
          <div className="text-sm text-blue-600 font-medium">Annual Leave</div>
          <div className="text-2xl font-bold text-blue-700">12 Days</div>
          <div className="text-xs text-muted-foreground">Available</div>
        </div>
        <div className="bg-gradient-to-r from-green-500/10 to-green-600/10 p-4 rounded-xl border border-green-200/20">
          <div className="text-sm text-green-600 font-medium">Attendance</div>
          <div className="text-2xl font-bold text-green-700">98%</div>
          <div className="text-xs text-muted-foreground">This Month</div>
        </div>
        <div className="bg-gradient-to-r from-purple-500/10 to-purple-600/10 p-4 rounded-xl border border-purple-200/20">
          <div className="text-sm text-purple-600 font-medium">Training</div>
          <div className="text-2xl font-bold text-purple-700">2</div>
          <div className="text-xs text-muted-foreground">Completed</div>
        </div>
        <div className="bg-gradient-to-r from-orange-500/10 to-orange-600/10 p-4 rounded-xl border border-orange-200/20">
          <div className="text-sm text-orange-600 font-medium">Tasks</div>
          <div className="text-2xl font-bold text-orange-700">5</div>
          <div className="text-xs text-muted-foreground">Pending</div>
        </div>
      </div>

      {/* Main Modules Grid */}
      <div className="space-y-6">
        <h2 className="text-2xl font-semibold text-foreground flex items-center gap-2">
          <div className="w-1 h-6 bg-primary rounded-full" />
          Dashboard Modules
        </h2>
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          <LeaveApplicationSummary />
          <ReplacementLeaveSummary />
          <AttendanceSummary />
          <CalendarSummary />
          <TrainingSummary />
          <PayrollSummary />
        </div>
      </div>
    </div>
  )
}

export default StaffHome