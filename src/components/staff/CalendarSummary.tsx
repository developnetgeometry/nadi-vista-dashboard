import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Calendar, MapPin, Info } from "lucide-react"

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
            Hover over calendar dates to view detailed information
          </div>
        </div>
      </CardContent>
    </Card>
  )
}