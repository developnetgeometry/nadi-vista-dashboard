import { StaffWelcomeHeader } from "@/components/staff/StaffWelcomeHeader"
import { StaffStatsCards } from "@/components/staff/StaffStatsCards"
import { StaffLeaveOverview } from "@/components/staff/StaffLeaveOverview"
import { StaffQuickActions } from "@/components/staff/StaffQuickActions"
import { TrainingSummary } from "@/components/staff/TrainingSummary"
import { ReplacementLeaveSummary } from "@/components/staff/ReplacementLeaveSummary"
import { CalendarSummary } from "@/components/staff/CalendarSummary"
import { PayrollSummary } from "@/components/staff/PayrollSummary"

const StaffHome = () => {
  return (
    <div className="space-y-6 animate-fade-in">
      {/* Welcome Header */}
      <StaffWelcomeHeader />

      {/* Stats Cards */}
      <StaffStatsCards />

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Leave Overview */}
        <StaffLeaveOverview />
        
        {/* Replacement Leave */}
        <ReplacementLeaveSummary />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Payroll Summary */}
        <PayrollSummary />
        
        {/* Calendar Summary */}
        <CalendarSummary />
      </div>

      {/* Training Summary */}
      <TrainingSummary />

      {/* Quick Actions */}
      <StaffQuickActions />
    </div>
  )
}

export default StaffHome