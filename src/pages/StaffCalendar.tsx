import { StaffCalendar } from "@/components/staff/StaffCalendar"

const StaffCalendarPage = () => {
  return (
    <div className="space-y-6 animate-fade-in">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold text-foreground">Staff Calendar</h1>
        <p className="text-muted-foreground">
          View public holidays, off days, and manage your schedule
        </p>
      </div>
      
      <StaffCalendar />
    </div>
  )
}

export default StaffCalendarPage