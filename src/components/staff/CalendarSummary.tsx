import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { Calendar, MapPin, Info, Eye } from "lucide-react"
import { NavLink } from "react-router-dom"
import { isSameMonth } from "date-fns"

// Sample data for holidays and off days
const holidaysAndEvents = {
  "2024-12-25": { type: "holiday", name: "Christmas Day", description: "Public Holiday" },
  "2024-12-31": { type: "holiday", name: "New Year's Eve", description: "Public Holiday" },
  "2025-01-01": { type: "holiday", name: "New Year's Day", description: "Public Holiday" },
  "2025-01-28": { type: "holiday", name: "Chinese New Year", description: "Public Holiday" },
  "2025-01-29": { type: "holiday", name: "Chinese New Year", description: "Public Holiday" },
  "2025-02-01": { type: "holiday", name: "Federal Territory Day", description: "Public Holiday (KL, Putrajaya, Labuan)" },
  "2025-03-31": { type: "holiday", name: "Hari Raya", description: "Public Holiday (Estimated)" },
  "2025-05-01": { type: "holiday", name: "Labour Day", description: "Public Holiday" },
  "2025-05-12": { type: "holiday", name: "Wesak Day", description: "Public Holiday (Estimated)" },
  "2025-06-07": { type: "holiday", name: "Hari Raya Haji", description: "Public Holiday (Estimated)" },
  "2025-08-31": { type: "holiday", name: "National Day", description: "Public Holiday" },
  "2025-09-16": { type: "holiday", name: "Malaysia Day", description: "Public Holiday" },
  "2025-10-20": { type: "holiday", name: "Deepavali", description: "Public Holiday (Estimated)" }
}

const months = [
  { value: "0", label: "January", year: 2025 },
  { value: "1", label: "February", year: 2025 },
  { value: "2", label: "March", year: 2025 },
  { value: "3", label: "April", year: 2025 },
  { value: "4", label: "May", year: 2025 },
  { value: "5", label: "June", year: 2025 },
  { value: "6", label: "July", year: 2025 },
  { value: "7", label: "August", year: 2025 },
  { value: "8", label: "September", year: 2025 },
  { value: "9", label: "October", year: 2025 },
  { value: "10", label: "November", year: 2025 },
  { value: "11", label: "December", year: 2025 }
]

export function CalendarSummary() {
  const [selectedMonth, setSelectedMonth] = useState<string>(new Date().getMonth().toString())
  
  const currentDate = new Date()
  const selectedMonthData = months.find(m => m.value === selectedMonth)
  const selectedMonthName = selectedMonthData?.label.toUpperCase() || currentDate.toLocaleDateString('en-GB', { month: 'long' }).toUpperCase()

  // Get selected month holidays and off days
  const getMonthData = (monthIndex: number, year: number) => {
    const holidays = Object.entries(holidaysAndEvents).filter(([dateStr]) => {
      const date = new Date(dateStr)
      return date.getMonth() === monthIndex && date.getFullYear() === year
    })
    
    // Calculate weekends in selected month
    const daysInMonth = new Date(year, monthIndex + 1, 0).getDate()
    let weekendDays = 0
    
    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(year, monthIndex, day)
      if (date.getDay() === 0 || date.getDay() === 6) {
        weekendDays++
      }
    }
    
    return {
      holidays: holidays.length,
      offDays: weekendDays,
      holidayDetails: holidays
    }
  }

  const monthData = getMonthData(parseInt(selectedMonth), selectedMonthData?.year || 2025)

  return (
    <Card className="hover:shadow-md transition-shadow">
      <CardHeader className="pb-4">
        <CardTitle className="flex items-center gap-2">
          <Calendar className="h-5 w-5 text-primary" />
          Calendar Overview
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Calendar Header - Month Selector */}
        <div className="bg-destructive text-destructive-foreground p-4 rounded-lg">
          <div className="text-center space-y-3">
            <h3 className="text-lg font-bold">CALENDAR {selectedMonthName}</h3>
            <div className="text-sm">
              Display current month for total public holidays and list off days by NADI Location (Manager & Assistant Manager)
            </div>
            <div className="flex justify-center">
              <Select value={selectedMonth} onValueChange={setSelectedMonth}>
                <SelectTrigger className="w-48 bg-destructive-foreground text-destructive border-destructive-foreground">
                  <SelectValue placeholder="Select month" />
                </SelectTrigger>
                <SelectContent>
                  {months.map((month) => (
                    <SelectItem key={month.value} value={month.value}>
                      {month.label} {month.year}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        {/* Selected Month Summary */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-3">
            <div className="text-sm font-medium text-muted-foreground">When mouse-over, display as detail below:</div>
            <div className="space-y-2">
              <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                <span className="text-sm">- Date and Description</span>
              </div>
            </div>
          </div>
          <div className="space-y-3">
            <div className="p-4 bg-primary/10 rounded-lg">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Public Holiday:</span>
                  <span className="font-bold text-primary">{monthData.holidays}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Off Day:</span>
                  <span className="font-bold text-primary">{monthData.offDays}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Holiday Details for Selected Month */}
        {monthData.holidayDetails.length > 0 && (
          <div className="space-y-3">
            <h4 className="font-medium text-sm text-muted-foreground uppercase tracking-wide">
              {selectedMonthData?.label} {selectedMonthData?.year} Public Holidays
            </h4>
            <div className="space-y-2">
              {monthData.holidayDetails.map(([dateStr, holiday]) => (
                <div key={dateStr} className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                  <div>
                    <div className="font-medium text-sm">{holiday.name}</div>
                    <div className="text-xs text-muted-foreground">{holiday.description}</div>
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {new Date(dateStr).toLocaleDateString('en-GB', { day: 'numeric', month: 'short' })}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Location Info */}
        <div className="p-3 bg-muted/50 rounded-lg">
          <div className="text-sm text-muted-foreground">Based on NADI Location</div>
          <div className="text-xs text-primary font-medium">Manager & Assistant Manager</div>
        </div>

        {/* Interactive Info */}
        <div className="flex items-start gap-2 p-3 bg-muted/50 rounded-lg">
          <Info className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
          <div className="text-xs text-muted-foreground">
            View detailed calendar with public holidays and off days
          </div>
        </div>

        {/* View Full Calendar Button */}
        <div className="pt-2">
          <NavLink to="/staff/calendar">
            <Button size="sm" className="w-full justify-start">
              <Eye className="h-4 w-4 mr-2" />
              View Full Calendar
            </Button>
          </NavLink>
        </div>
      </CardContent>
    </Card>
  )
}