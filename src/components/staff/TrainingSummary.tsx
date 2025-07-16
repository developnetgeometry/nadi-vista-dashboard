import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { GraduationCap, BookOpen, Target } from "lucide-react"

export function TrainingSummary() {
  const currentYear = new Date().getFullYear()

  return (
    <Card className="group hover:shadow-lg transition-all duration-300 border-0 bg-gradient-to-br from-indigo-50/50 to-blue-50/50 hover:from-indigo-50 hover:to-blue-50">
      <CardHeader className="pb-3 space-y-2">
        <div className="flex items-center justify-between">
          <div className="p-2 bg-indigo-100 rounded-lg group-hover:bg-indigo-200 transition-colors">
            <GraduationCap className="h-5 w-5 text-indigo-600" />
          </div>
          <Target className="h-4 w-4 text-indigo-500" />
        </div>
        <CardTitle className="text-lg font-semibold text-indigo-900">
          Training Progress
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Training Summary */}
        <div className="space-y-3">
          <h4 className="font-medium text-sm text-indigo-600 uppercase tracking-wide">
            {currentYear} Training Status
          </h4>
          <div className="space-y-3">
            <div className="flex justify-between items-center p-3 bg-white/60 rounded-lg border">
              <div className="flex items-center gap-2">
                <BookOpen className="h-4 w-4 text-blue-500" />
                <span className="text-sm font-medium">Initial Training</span>
              </div>
              <Badge variant="secondary" className="bg-blue-100 text-blue-700 border-blue-200">0</Badge>
            </div>
            <div className="flex justify-between items-center p-3 bg-white/60 rounded-lg border">
              <div className="flex items-center gap-2">
                <Target className="h-4 w-4 text-green-500" />
                <span className="text-sm font-medium">Refresh Training</span>
              </div>
              <Badge variant="secondary" className="bg-green-100 text-green-700 border-green-200">0</Badge>
            </div>
          </div>
        </div>

        {/* Total Progress */}
        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <h4 className="font-medium text-sm text-indigo-600 uppercase tracking-wide">Total Completed</h4>
            <Badge variant="default" className="bg-indigo-600">0</Badge>
          </div>
          <div className="space-y-2">
            <Progress value={0} className="h-2" />
            <div className="text-xs text-muted-foreground text-center">
              Training completion rate: 0%
            </div>
          </div>
        </div>

        {/* Year Note */}
        <div className="p-3 bg-white/60 rounded-lg border">
          <div className="text-xs text-muted-foreground text-center">
            Based on current year activities and training requirements
          </div>
        </div>
      </CardContent>
    </Card>
  )
}