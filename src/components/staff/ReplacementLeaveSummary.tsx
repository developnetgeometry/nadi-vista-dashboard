import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { RefreshCw, Plus, List } from "lucide-react"

export function ReplacementLeaveSummary() {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
        <CardTitle className="text-lg font-semibold flex items-center gap-2">
          <RefreshCw className="h-5 w-5" />
          Replacement Leave Summary
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Balance */}
        <div className="space-y-2">
          <h4 className="font-medium text-sm text-muted-foreground">Current Replacement Leave</h4>
          <div className="text-sm">
            Balance Entitled: <strong className="text-blue-600">0.5</strong>
          </div>
        </div>

        {/* Request Status */}
        <div className="space-y-2">
          <h4 className="font-medium text-sm text-muted-foreground">Request Status (Per Request)</h4>
          <div className="flex gap-2">
            <Badge variant="secondary">Total Requests: 1</Badge>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="flex gap-2 pt-2">
          <Button variant="outline" size="sm" className="flex items-center gap-1">
            <Plus className="h-3 w-3" />
            Add Request
          </Button>
          <Button variant="outline" size="sm" className="flex items-center gap-1">
            <List className="h-3 w-3" />
            All Request
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}