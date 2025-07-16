import { LeaveApplicationSummary } from "@/components/staff/LeaveApplicationSummary"
import { ReplacementLeaveSummary } from "@/components/staff/ReplacementLeaveSummary"
import { AttendanceSummary } from "@/components/staff/AttendanceSummary"
import { CalendarSummary } from "@/components/staff/CalendarSummary"
import { TrainingSummary } from "@/components/staff/TrainingSummary"
import { PayrollSummary } from "@/components/staff/PayrollSummary"
import { Badge } from "@/components/ui/badge"

const StaffHome = () => {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Home</h1>
          <p className="text-muted-foreground">
            Dashboard for Manager and Assistant Manager
          </p>
        </div>
        <Badge variant="outline" className="text-sm">
          NADI Staff (Manager and Assistant Manager)
        </Badge>
      </div>

      {/* Dashboard Grid */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <LeaveApplicationSummary />
        <ReplacementLeaveSummary />
        <AttendanceSummary />
        <CalendarSummary />
        <TrainingSummary />
        <PayrollSummary />
      </div>
    </div>
  )
}

export default StaffHome