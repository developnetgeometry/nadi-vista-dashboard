import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Calendar, FileText, Plus, List, Clock } from "lucide-react"

export function LeaveApplicationSummary() {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
        <CardTitle className="text-lg font-semibold flex items-center gap-2">
          <FileText className="h-5 w-5" />
          Leave Application Summary
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Annual Leave Balance */}
        <div className="space-y-2">
          <h4 className="font-medium text-sm text-muted-foreground">Annual Leave (Based on current contract)</h4>
          <div className="flex gap-4 text-sm">
            <span>Entitled: <strong>12</strong></span>
            <span>Taken: <strong>0</strong></span>
            <span>Balance: <strong className="text-green-600">12</strong></span>
          </div>
        </div>

        {/* Leave Status */}
        <div className="space-y-2">
          <h4 className="font-medium text-sm text-muted-foreground">All Leave Status (Per Leave)</h4>
          <div className="flex gap-2">
            <Badge variant="secondary">Pending: 0</Badge>
            <Badge variant="secondary">Approved: 0</Badge>
            <Badge variant="secondary">Rejected: 0</Badge>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="flex gap-2 pt-2">
          <Button variant="outline" size="sm" className="flex items-center gap-1">
            <List className="h-3 w-3" />
            Summary
          </Button>
          <Button variant="outline" size="sm" className="flex items-center gap-1">
            <FileText className="h-3 w-3" />
            All Leave
          </Button>
          <Button variant="outline" size="sm" className="flex items-center gap-1">
            <Plus className="h-3 w-3" />
            Apply Leave
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}