import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { GraduationCap } from "lucide-react"

export function TrainingSummary() {
  const currentYear = new Date().getFullYear()

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
        <CardTitle className="text-lg font-semibold flex items-center gap-2">
          <GraduationCap className="h-5 w-5" />
          Training
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Training Summary */}
        <div className="space-y-2">
          <h4 className="font-medium text-sm text-muted-foreground">
            Training Summary ({currentYear})
          </h4>
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-sm">Initial Training:</span>
              <Badge variant="secondary">0</Badge>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm">Refresh Training:</span>
              <Badge variant="secondary">0</Badge>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium">Total Training:</span>
              <Badge variant="default">0</Badge>
            </div>
          </div>
        </div>

        {/* Year Note */}
        <div className="text-xs text-muted-foreground">
          Based on current year activities
        </div>
      </CardContent>
    </Card>
  )
}