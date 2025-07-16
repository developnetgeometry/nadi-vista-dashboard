import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Calendar } from "lucide-react"

export function CalendarSummary() {
  const currentMonth = new Date().toLocaleDateString('en-GB', { 
    month: 'long',
    year: 'numeric'
  })

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
        <CardTitle className="text-lg font-semibold flex items-center gap-2">
          <Calendar className="h-5 w-5" />
          Calendar
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Current Month */}
        <div className="space-y-2">
          <h4 className="font-medium text-sm text-muted-foreground">
            CALENDAR {currentMonth.toUpperCase()}
          </h4>
          <div className="space-y-1 text-sm">
            <div>Public Holiday: <strong className="text-red-600">2</strong></div>
            <div>Off Day: <strong className="text-blue-600">8</strong></div>
          </div>
        </div>

        {/* Calendar Info */}
        <div className="text-xs text-muted-foreground">
          Hover over dates to see details including date and description
        </div>
      </CardContent>
    </Card>
  )
}