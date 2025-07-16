import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { RefreshCw, Plus, List, Clock } from "lucide-react"

export function ReplacementLeaveSummary() {
  return (
    <Card className="group hover:shadow-lg transition-all duration-300 border-0 bg-gradient-to-br from-emerald-50/50 to-teal-50/50 hover:from-emerald-50 hover:to-teal-50">
      <CardHeader className="pb-3 space-y-2">
        <div className="flex items-center justify-between">
          <div className="p-2 bg-emerald-100 rounded-lg group-hover:bg-emerald-200 transition-colors">
            <RefreshCw className="h-5 w-5 text-emerald-600" />
          </div>
          <Clock className="h-4 w-4 text-emerald-500" />
        </div>
        <CardTitle className="text-lg font-semibold text-emerald-900">
          Replacement Leave Summary
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Balance */}
        <div className="space-y-3">
          <h4 className="font-medium text-sm text-emerald-600 uppercase tracking-wide">Current Balance</h4>
          <div className="text-center p-4 bg-white/60 rounded-lg border">
            <div className="text-sm text-muted-foreground">Balance Entitled</div>
            <div className="text-3xl font-bold text-emerald-600">0.5</div>
            <div className="text-xs text-emerald-500">Days</div>
          </div>
        </div>

        {/* Request Status */}
        <div className="space-y-3">
          <h4 className="font-medium text-sm text-emerald-600 uppercase tracking-wide">Request Status</h4>
          <div className="flex justify-center">
            <Badge variant="secondary" className="bg-emerald-100 text-emerald-700 border-emerald-200 px-4 py-2">
              Total Requests: 1
            </Badge>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="space-y-3">
          <h4 className="font-medium text-sm text-emerald-600 uppercase tracking-wide">Quick Actions</h4>
          <div className="grid grid-cols-1 gap-2">
            <Button size="sm" className="justify-start bg-emerald-600 hover:bg-emerald-700">
              <Plus className="h-3 w-3 mr-2" />
              Add New Request
            </Button>
            <Button variant="outline" size="sm" className="justify-start hover:bg-emerald-50 hover:border-emerald-200">
              <List className="h-3 w-3 mr-2" />
              View All Requests
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}