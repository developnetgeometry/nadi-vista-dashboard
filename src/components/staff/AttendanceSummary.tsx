import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Clock, Calendar, CheckCircle, AlertCircle } from "lucide-react"

export function AttendanceSummary() {
  const today = new Date().toLocaleDateString('en-GB', { 
    day: 'numeric', 
    month: 'long', 
    year: 'numeric' 
  })

  return (
    <Card className="group hover:shadow-lg transition-all duration-300 border-0 bg-gradient-to-br from-purple-50/50 to-violet-50/50 hover:from-purple-50 hover:to-violet-50">
      <CardHeader className="pb-3 space-y-2">
        <div className="flex items-center justify-between">
          <div className="p-2 bg-purple-100 rounded-lg group-hover:bg-purple-200 transition-colors">
            <Clock className="h-5 w-5 text-purple-600" />
          </div>
          <CheckCircle className="h-4 w-4 text-green-500" />
        </div>
        <CardTitle className="text-lg font-semibold text-purple-900">
          Attendance
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Today's Attendance */}
        <div className="space-y-3">
          <h4 className="font-medium text-sm text-purple-600 uppercase tracking-wide">
            Today - {today}
          </h4>
          <div className="space-y-2">
            <div className="flex justify-between items-center p-3 bg-white/60 rounded-lg border">
              <span className="text-sm font-medium">Check In</span>
              <span className="text-sm text-muted-foreground flex items-center gap-1">
                <AlertCircle className="h-3 w-3" />
                Not recorded
              </span>
            </div>
            <div className="flex justify-between items-center p-3 bg-white/60 rounded-lg border">
              <span className="text-sm font-medium">Check Out</span>
              <span className="text-sm text-muted-foreground flex items-center gap-1">
                <AlertCircle className="h-3 w-3" />
                Not recorded
              </span>
            </div>
          </div>
        </div>

        {/* Yesterday Summary */}
        <div className="space-y-3">
          <h4 className="font-medium text-sm text-purple-600 uppercase tracking-wide">Yesterday</h4>
          <div className="p-3 bg-white/60 rounded-lg border text-center">
            <div className="text-xs text-muted-foreground">No attendance recorded</div>
          </div>
        </div>

        {/* Time Summary */}
        <div className="space-y-3">
          <h4 className="font-medium text-sm text-purple-600 uppercase tracking-wide">Time Summary</h4>
          <div className="grid grid-cols-2 gap-2">
            <div className="text-center p-3 bg-white/60 rounded-lg border">
              <div className="text-xs text-muted-foreground">MCMC Time</div>
              <div className="font-mono font-bold text-purple-600">0:0:0</div>
            </div>
            <div className="text-center p-3 bg-white/60 rounded-lg border">
              <div className="text-xs text-muted-foreground">Total Time</div>
              <div className="font-mono font-bold text-purple-600">0:0:0</div>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <Button variant="outline" size="sm" className="w-full justify-start hover:bg-purple-50 hover:border-purple-200">
          <Calendar className="h-3 w-3 mr-2" />
          View Daily Attendance
        </Button>
      </CardContent>
    </Card>
  )
}