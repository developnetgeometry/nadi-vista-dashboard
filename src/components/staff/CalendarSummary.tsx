import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Calendar, MapPin, Info, Eye } from "lucide-react"
import { NavLink } from "react-router-dom"

export function CalendarSummary() {
  const currentMonth = new Date().toLocaleDateString('en-GB', { 
    month: 'long',
    year: 'numeric'
  })

  return (
    <Card className="hover:shadow-md transition-shadow">
      <CardHeader className="pb-4">
        <CardTitle className="flex items-center gap-2">
          <Calendar className="h-5 w-5 text-primary" />
          Calendar Overview
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Current Month */}
        <div className="space-y-3">
          <h4 className="font-medium text-sm text-muted-foreground uppercase tracking-wide">
            {currentMonth}
          </h4>
          <div className="grid grid-cols-2 gap-3">
            <div className="text-center p-4 bg-muted/50 rounded-lg">
              <div className="text-xs text-muted-foreground">Public Holidays</div>
              <div className="text-2xl font-bold text-foreground">2</div>
              <div className="text-xs text-muted-foreground">Days</div>
            </div>
            <div className="text-center p-4 bg-muted/50 rounded-lg">
              <div className="text-xs text-muted-foreground">Off Days</div>
              <div className="text-2xl font-bold text-foreground">8</div>
              <div className="text-xs text-muted-foreground">Days</div>
            </div>
          </div>
        </div>

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