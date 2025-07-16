import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Calendar, MapPin, Info } from "lucide-react"

export function CalendarSummary() {
  const currentMonth = new Date().toLocaleDateString('en-GB', { 
    month: 'long',
    year: 'numeric'
  })

  return (
    <Card className="group hover:shadow-lg transition-all duration-300 border-0 bg-gradient-to-br from-orange-50/50 to-red-50/50 hover:from-orange-50 hover:to-red-50">
      <CardHeader className="pb-3 space-y-2">
        <div className="flex items-center justify-between">
          <div className="p-2 bg-orange-100 rounded-lg group-hover:bg-orange-200 transition-colors">
            <Calendar className="h-5 w-5 text-orange-600" />
          </div>
          <MapPin className="h-4 w-4 text-orange-500" />
        </div>
        <CardTitle className="text-lg font-semibold text-orange-900">
          Calendar Overview
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Current Month */}
        <div className="space-y-3">
          <h4 className="font-medium text-sm text-orange-600 uppercase tracking-wide">
            {currentMonth}
          </h4>
          <div className="grid grid-cols-2 gap-3">
            <div className="text-center p-4 bg-white/60 rounded-lg border">
              <div className="text-xs text-muted-foreground">Public Holidays</div>
              <div className="text-2xl font-bold text-red-600">2</div>
              <div className="text-xs text-red-500">Days</div>
            </div>
            <div className="text-center p-4 bg-white/60 rounded-lg border">
              <div className="text-xs text-muted-foreground">Off Days</div>
              <div className="text-2xl font-bold text-blue-600">8</div>
              <div className="text-xs text-blue-500">Days</div>
            </div>
          </div>
        </div>

        {/* Location Info */}
        <div className="space-y-2">
          <h4 className="font-medium text-sm text-orange-600 uppercase tracking-wide">Location Details</h4>
          <div className="p-3 bg-white/60 rounded-lg border">
            <div className="text-sm text-muted-foreground">Based on NADI Location</div>
            <div className="text-xs text-orange-600 font-medium">Manager & Assistant Manager</div>
          </div>
        </div>

        {/* Interactive Info */}
        <div className="flex items-start gap-2 p-3 bg-white/60 rounded-lg border">
          <Info className="h-4 w-4 text-orange-500 mt-0.5 flex-shrink-0" />
          <div className="text-xs text-muted-foreground">
            Hover over calendar dates to view detailed information including date and description
          </div>
        </div>
      </CardContent>
    </Card>
  )
}