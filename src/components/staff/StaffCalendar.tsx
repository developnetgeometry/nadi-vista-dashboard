import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Calendar } from "@/components/ui/calendar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { format, isSameMonth } from "date-fns"
import { CalendarIcon, MapPin, Info, Eye } from "lucide-react"
import { cn } from "@/lib/utils"

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

export function StaffCalendar() {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date())
  const [viewMode, setViewMode] = useState<"month" | "year">("month")
  const currentDate = new Date()
  const currentMonth = currentDate.toLocaleDateString('en-GB', { 
    month: 'long',
    year: 'numeric'
  })
  const currentMonthName = currentDate.toLocaleDateString('en-GB', { 
    month: 'long'
  }).toUpperCase()

  const getDateInfo = (date: Date) => {
    const dateKey = format(date, "yyyy-MM-dd")
    return holidaysAndEvents[dateKey as keyof typeof holidaysAndEvents]
  }

  // Get current month holidays and off days
  const getCurrentMonthData = () => {
    const holidays = Object.entries(holidaysAndEvents).filter(([dateStr]) => 
      isSameMonth(new Date(dateStr), currentDate)
    )
    
    // Calculate weekends in current month
    const year = currentDate.getFullYear()
    const month = currentDate.getMonth()
    const daysInMonth = new Date(year, month + 1, 0).getDate()
    let weekendDays = 0
    
    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(year, month, day)
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

  const monthData = getCurrentMonthData()

  const modifiers = {
    holiday: Object.keys(holidaysAndEvents).map(dateStr => new Date(dateStr)),
    weekend: (date: Date) => date.getDay() === 0 || date.getDay() === 6,
  }

  const modifiersStyles = {
    holiday: {
      backgroundColor: "hsl(var(--destructive))",
      color: "hsl(var(--destructive-foreground))",
      borderRadius: "6px",
      fontWeight: "bold"
    },
    weekend: {
      backgroundColor: "hsl(var(--muted))",
      color: "hsl(var(--muted-foreground))",
      borderRadius: "4px"
    }
  }

  const selectedDateInfo = selectedDate ? getDateInfo(selectedDate) : null
  const isToday = selectedDate && format(selectedDate, "yyyy-MM-dd") === format(new Date(), "yyyy-MM-dd")

  return (
    <Card>
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <CalendarIcon className="h-5 w-5 text-primary" />
            Staff Calendar
          </CardTitle>
          <div className="flex gap-2">
            <Button
              variant={viewMode === "month" ? "default" : "outline"}
              size="sm"
              onClick={() => setViewMode("month")}
            >
              Month
            </Button>
            <Button
              variant={viewMode === "year" ? "default" : "outline"}
              size="sm"
              onClick={() => setViewMode("year")}
            >
              Year
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Calendar Header - Current Month Display */}
        <div className="bg-destructive text-destructive-foreground p-4 rounded-lg">
          <div className="text-center">
            <h3 className="text-lg font-bold">CALENDAR {currentMonthName}</h3>
            <div className="text-sm mt-1">
              Display current month for total public holidays and list off days by NADI Location (Manager & Assistant Manager)
            </div>
          </div>
        </div>

        {/* Current Month Summary */}
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

        {/* Calendar */}
        <div className="space-y-4">
          <div className="flex flex-col lg:flex-row gap-6">
            <div className="flex-1">
              <TooltipProvider>
                <Calendar
                  mode="single"
                  selected={selectedDate}
                  onSelect={setSelectedDate}
                  modifiers={modifiers}
                  modifiersStyles={modifiersStyles}
                  className={cn("pointer-events-auto border rounded-lg p-4")}
                  showOutsideDays={true}
                />
              </TooltipProvider>
            </div>
            
            {/* Date Details Panel */}
            <div className="lg:w-80 space-y-4">
              <div className="p-4 bg-muted/50 rounded-lg">
                <h4 className="font-medium mb-3 flex items-center gap-2">
                  <Eye className="h-4 w-4" />
                  Date Details
                </h4>
                {selectedDate ? (
                  <div className="space-y-3">
                    <div>
                      <div className="text-sm text-muted-foreground">Selected Date</div>
                      <div className="font-semibold">
                        {format(selectedDate, "EEEE, MMMM d, yyyy")}
                      </div>
                      {isToday && (
                        <Badge variant="default" className="mt-1">Today</Badge>
                      )}
                    </div>
                    
                    {selectedDateInfo ? (
                      <div className="space-y-2">
                        <div>
                          <div className="text-sm text-muted-foreground">Event Type</div>
                          <Badge variant="destructive">{selectedDateInfo.type === "holiday" ? "Public Holiday" : "Event"}</Badge>
                        </div>
                        <div>
                          <div className="text-sm text-muted-foreground">Event Name</div>
                          <div className="font-medium">{selectedDateInfo.name}</div>
                        </div>
                        <div>
                          <div className="text-sm text-muted-foreground">Description</div>
                          <div className="text-sm">{selectedDateInfo.description}</div>
                        </div>
                      </div>
                    ) : (
                      <div className="text-sm text-muted-foreground">
                        {selectedDate.getDay() === 0 || selectedDate.getDay() === 6 
                          ? "Weekend day - Regular off day" 
                          : "Regular working day"}
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="text-sm text-muted-foreground">
                    Click on a date to view details
                  </div>
                )}
              </div>

              {/* Legend */}
              <div className="p-4 bg-muted/50 rounded-lg">
                <h4 className="font-medium mb-3">Legend</h4>
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 rounded bg-destructive"></div>
                    <span className="text-sm">Public Holiday</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 rounded bg-muted"></div>
                    <span className="text-sm">Weekend</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 rounded border-2 border-primary"></div>
                    <span className="text-sm">Today</span>
                  </div>
                </div>
              </div>

              {/* Location Info */}
              <div className="p-4 bg-muted/50 rounded-lg">
                <h4 className="font-medium mb-2 flex items-center gap-2">
                  <MapPin className="h-4 w-4" />
                  Location Info
                </h4>
                <div className="text-sm text-muted-foreground">
                  <div>Based on NADI Location</div>
                  <div className="text-primary font-medium">Malaysia Federal Territory</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Info */}
        <div className="flex items-start gap-2 p-3 bg-muted/50 rounded-lg">
          <Info className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
          <div className="text-xs text-muted-foreground">
            Click on any date to view detailed information. Hover over highlighted dates to see event details.
            Public holidays are marked in red, weekends in gray. Holiday dates may vary based on official announcements.
          </div>
        </div>
      </CardContent>
    </Card>
  )
}