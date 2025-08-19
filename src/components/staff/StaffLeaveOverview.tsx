import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Calendar, Plus, ArrowRight, Clock } from "lucide-react"

const leaveTypes = [
  { name: "Annual Leave", balance: 12, used: 8, total: 20, color: "blue" },
  { name: "Medical Leave", balance: 5, used: 2, total: 7, color: "green" },
  { name: "Compassionate Leave", balance: 3, used: 0, total: 3, color: "purple" },
  { name: "Marriage Leave", balance: 7, used: 0, total: 7, color: "pink" }
]

export function StaffLeaveOverview() {
  return (
    <Card className="shadow-md border-0 hover:shadow-lg transition-all duration-300">
      <CardHeader className="pb-6">
        <CardTitle className="flex items-center gap-3 text-xl">
          <div className="p-2 bg-blue-100 rounded-lg">
            <Calendar className="h-6 w-6 text-blue-600" />
          </div>
          Leave Overview
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {leaveTypes.map((leave, index) => (
            <div key={index} className="p-5 border rounded-xl space-y-4 hover:shadow-sm transition-shadow bg-gradient-to-br from-gray-50 to-white">
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-3">
                  <div className={`w-3 h-3 rounded-full bg-${leave.color}-500`}></div>
                  <h4 className="font-semibold text-foreground">{leave.name}</h4>
                </div>
                <div className="text-right">
                  <span className="text-sm text-muted-foreground">{leave.balance}/{leave.total}</span>
                </div>
              </div>
              <Progress 
                value={(leave.balance / leave.total) * 100} 
                className="h-3"
              />
              <div className="flex justify-between text-sm">
                <div className="flex items-center gap-1">
                  <Clock className="h-3 w-3 text-green-500" />
                  <span className="text-green-600 font-medium">Available: {leave.balance} days</span>
                </div>
                <span className="text-muted-foreground">Used: {leave.used} days</span>
              </div>
            </div>
          ))}
        </div>
        
        <div className="flex gap-4 pt-6 border-t">
          <Button className="flex-1 h-12 text-base font-semibold shadow-md hover:shadow-lg transition-all">
            <Plus className="h-5 w-5 mr-2" />
            Apply Leave
          </Button>
          <Button variant="outline" className="flex-1 h-12 text-base font-semibold border-2 hover:bg-muted/50">
            View History
            <ArrowRight className="h-5 w-5 ml-2" />
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}