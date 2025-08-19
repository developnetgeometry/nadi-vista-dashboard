import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Calendar, Plus, ArrowRight } from "lucide-react"

const leaveTypes = [
  { name: "Annual Leave", balance: 12, used: 8, total: 20 },
  { name: "Medical Leave", balance: 5, used: 2, total: 7 },
  { name: "Compassionate Leave", balance: 3, used: 0, total: 3 },
  { name: "Marriage Leave", balance: 7, used: 0, total: 7 }
]

export function StaffLeaveOverview() {
  return (
    <Card>
      <CardHeader className="pb-4">
        <CardTitle className="flex items-center gap-2">
          <Calendar className="h-5 w-5 text-primary" />
          Leave Overview
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {leaveTypes.map((leave, index) => (
            <div key={index} className="p-4 border rounded-lg space-y-3">
              <div className="flex justify-between items-center">
                <h4 className="font-medium text-sm">{leave.name}</h4>
                <span className="text-xs text-muted-foreground">{leave.balance}/{leave.total}</span>
              </div>
              <Progress 
                value={(leave.balance / leave.total) * 100} 
                className="h-2"
              />
              <div className="flex justify-between text-xs text-muted-foreground">
                <span>Available: {leave.balance} days</span>
                <span>Used: {leave.used} days</span>
              </div>
            </div>
          ))}
        </div>
        
        <div className="flex gap-3 pt-4 border-t">
          <Button className="flex-1">
            <Plus className="h-4 w-4 mr-2" />
            Apply Leave
          </Button>
          <Button variant="outline" className="flex-1">
            View History
            <ArrowRight className="h-4 w-4 ml-2" />
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}