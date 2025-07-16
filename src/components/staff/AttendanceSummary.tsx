import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Clock, Calendar } from "lucide-react"

export function AttendanceSummary() {
  const today = new Date().toLocaleDateString('en-GB', { 
    day: 'numeric', 
    month: 'long', 
    year: 'numeric' 
  })

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
        <CardTitle className="text-lg font-semibold flex items-center gap-2">
          <Clock className="h-5 w-5" />
          Attendance
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Today's Attendance */}
        <div className="space-y-2">
          <h4 className="font-medium text-sm text-muted-foreground">
            ATTENDANCE {today.toUpperCase()}
          </h4>
          <div className="space-y-1 text-sm">
            <div>Today: In <span className="text-muted-foreground">Empty</span> Out <span className="text-muted-foreground">Empty</span></div>
            <div>Yesterday: In <span className="text-muted-foreground">Empty</span> Out <span className="text-muted-foreground">Empty</span></div>
          </div>
        </div>

        {/* Time Summary */}
        <div className="space-y-2">
          <div className="text-sm space-y-1">
            <div>Total MCMC: <strong>0:0:0</strong></div>
            <div>Total All: <strong>0:0:0</strong></div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="pt-2">
          <Button variant="outline" size="sm" className="flex items-center gap-1">
            <Calendar className="h-3 w-3" />
            Daily Attendance
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}