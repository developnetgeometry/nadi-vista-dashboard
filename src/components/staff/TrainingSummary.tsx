import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { GraduationCap, BookOpen, Target } from "lucide-react"

export function TrainingSummary() {
  const currentYear = new Date().getFullYear()

  return (
    <Card className="hover:shadow-md transition-shadow">
      <CardHeader className="pb-4">
        <CardTitle className="flex items-center gap-2">
          <GraduationCap className="h-5 w-5 text-primary" />
          Training Progress
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Training Summary */}
        <div className="space-y-3">
          <h4 className="font-medium text-sm text-muted-foreground uppercase tracking-wide">
            {currentYear} Training Status
          </h4>
          <div className="space-y-3">
            <div className="flex justify-between items-center p-3 bg-muted/50 rounded-lg">
              <div className="flex items-center gap-2">
                <BookOpen className="h-4 w-4 text-primary" />
                <span className="text-sm font-medium">Initial Training</span>
              </div>
              <Badge variant="secondary">0</Badge>
            </div>
            <div className="flex justify-between items-center p-3 bg-muted/50 rounded-lg">
              <div className="flex items-center gap-2">
                <Target className="h-4 w-4 text-primary" />
                <span className="text-sm font-medium">Refresh Training</span>
              </div>
              <Badge variant="secondary">0</Badge>
            </div>
          </div>
        </div>

        {/* Total Progress */}
        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <h4 className="font-medium text-sm text-muted-foreground uppercase tracking-wide">Total Completed</h4>
            <Badge>0</Badge>
          </div>
          <div className="space-y-2">
            <Progress value={0} className="h-2" />
            <div className="text-xs text-muted-foreground text-center">
              Training completion rate: 0%
            </div>
          </div>
        </div>

        {/* Year Note */}
        <div className="p-3 bg-muted/50 rounded-lg">
          <div className="text-xs text-muted-foreground text-center">
            Based on current year activities and training requirements
          </div>
        </div>
      </CardContent>
    </Card>
  )
}