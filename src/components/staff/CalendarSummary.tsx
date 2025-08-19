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
    <Card className="shadow-md border-0 hover:shadow-lg transition-all duration-300">
      <CardHeader className="pb-6">
        <CardTitle className="flex items-center gap-3 text-xl">
          <div className="p-2 bg-blue-100 rounded-lg">
            <Calendar className="h-6 w-6 text-blue-600" />
          </div>
          Calendar Overview
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-8">
        {/* Calendar Header - Month Selector */}
        <div className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white p-6 rounded-xl shadow-lg">
          <div className="text-center space-y-4">
            <h3 className="text-2xl font-bold tracking-wide">CALENDAR {selectedMonthName}</h3>
            <div className="flex justify-center">
              <Select value={selectedMonth} onValueChange={setSelectedMonth}>
                <SelectTrigger className="w-56 bg-white/20 text-white border-white/30 backdrop-blur-sm hover:bg-white/30 transition-colors">
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
        <div className="p-6 bg-gradient-to-br from-primary/10 to-primary/5 rounded-xl border border-primary/20">
          <div className="grid grid-cols-2 gap-4">
            <div className="text-center p-4 bg-white/70 rounded-lg">
              <div className="text-sm text-muted-foreground mb-1">Public Holidays</div>
              <div className="text-3xl font-bold text-blue-600">{monthData.holidays}</div>
              <div className="text-xs text-blue-500">days</div>
            </div>
            <div className="text-center p-4 bg-white/70 rounded-lg">
              <div className="text-sm text-muted-foreground mb-1">Off Days</div>
              <div className="text-3xl font-bold text-indigo-600">{monthData.offDays}</div>
              <div className="text-xs text-indigo-500">days</div>
            </div>
          </div>
        </div>

        {/* Holiday Details for Selected Month */}
        {monthData.holidayDetails.length > 0 && (
          <div className="space-y-4">
            <h4 className="font-semibold text-lg text-foreground flex items-center gap-2">
              <div className="w-1 h-6 bg-blue-500 rounded-full"></div>
              {selectedMonthData?.label} {selectedMonthData?.year} Public Holidays
            </h4>
            <div className="grid gap-3">
              {monthData.holidayDetails.map(([dateStr, holiday]) => (
                <div key={dateStr} className="flex items-center justify-between p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl border border-blue-100 hover:shadow-sm transition-shadow">
                  <div className="space-y-1">
                    <div className="font-semibold text-foreground">{holiday.name}</div>
                    <div className="text-sm text-muted-foreground">{holiday.description}</div>
                  </div>
                  <div className="text-right">
                    <div className="text-lg font-bold text-blue-600">
                      {new Date(dateStr).toLocaleDateString('en-GB', { day: 'numeric' })}
                    </div>
                    <div className="text-xs text-blue-500">
                      {new Date(dateStr).toLocaleDateString('en-GB', { month: 'short' })}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Location Info */}
        <div className="p-4 bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl border">
          <div className="flex items-center gap-3 mb-2">
            <MapPin className="h-5 w-5 text-primary" />
            <h4 className="font-semibold text-foreground">Location Information</h4>
          </div>
          <div className="space-y-1">
            <div className="text-sm text-muted-foreground">Based on NADI Location</div>
            <div className="text-sm text-primary font-semibold">Malaysia Federal Territory</div>
            <div className="text-xs text-muted-foreground">Manager & Assistant Manager</div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}