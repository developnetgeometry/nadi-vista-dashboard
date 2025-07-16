import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Calendar, FileText, Plus, List, Clock, TrendingUp } from "lucide-react"

export function LeaveApplicationSummary() {
  return (
    <Card className="group hover:shadow-lg transition-all duration-300 border-0 bg-gradient-to-br from-blue-50/50 to-indigo-50/50 hover:from-blue-50 hover:to-indigo-50">
      <CardHeader className="pb-3 space-y-2">
        <div className="flex items-center justify-between">
          <div className="p-2 bg-blue-100 rounded-lg group-hover:bg-blue-200 transition-colors">
            <FileText className="h-5 w-5 text-blue-600" />
          </div>
          <TrendingUp className="h-4 w-4 text-green-500" />
        </div>
        <CardTitle className="text-lg font-semibold text-blue-900">
          Leave Application Summary
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Annual Leave Balance */}
        <div className="space-y-3">
          <h4 className="font-medium text-sm text-blue-600 uppercase tracking-wide">Annual Leave Balance</h4>
          <div className="grid grid-cols-3 gap-2">
            <div className="text-center p-3 bg-white/60 rounded-lg border">
              <div className="text-xs text-muted-foreground">Entitled</div>
              <div className="text-lg font-bold text-blue-600">12</div>
            </div>
            <div className="text-center p-3 bg-white/60 rounded-lg border">
              <div className="text-xs text-muted-foreground">Taken</div>
              <div className="text-lg font-bold text-orange-600">0</div>
            </div>
            <div className="text-center p-3 bg-white/60 rounded-lg border">
              <div className="text-xs text-muted-foreground">Balance</div>
              <div className="text-lg font-bold text-green-600">12</div>
            </div>
          </div>
        </div>

        {/* Leave Status */}
        <div className="space-y-3">
          <h4 className="font-medium text-sm text-blue-600 uppercase tracking-wide">Leave Status</h4>
          <div className="flex gap-2 flex-wrap">
            <Badge variant="secondary" className="bg-yellow-100 text-yellow-700 border-yellow-200">
              Pending: 0
            </Badge>
            <Badge variant="secondary" className="bg-green-100 text-green-700 border-green-200">
              Approved: 0
            </Badge>
            <Badge variant="secondary" className="bg-red-100 text-red-700 border-red-200">
              Rejected: 0
            </Badge>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="space-y-3">
          <h4 className="font-medium text-sm text-blue-600 uppercase tracking-wide">Quick Actions</h4>
          <div className="grid grid-cols-1 gap-2">
            <Button variant="outline" size="sm" className="justify-start hover:bg-blue-50 hover:border-blue-200">
              <List className="h-3 w-3 mr-2" />
              View Summary
            </Button>
            <Button variant="outline" size="sm" className="justify-start hover:bg-blue-50 hover:border-blue-200">
              <FileText className="h-3 w-3 mr-2" />
              All Leave Records
            </Button>
            <Button size="sm" className="justify-start bg-blue-600 hover:bg-blue-700">
              <Plus className="h-3 w-3 mr-2" />
              Apply for Leave
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}