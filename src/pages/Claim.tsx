import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { FileText, TrendingUp } from "lucide-react"

const claimStats = [
  { status: "Drafted", count: 12, bgColor: "bg-gray-100", textColor: "text-gray-600" },
  { status: "Submitted", count: 8, bgColor: "bg-status-submitted", textColor: "text-status-submitted-foreground" },
  { status: "Processing", count: 5, bgColor: "bg-blue-100", textColor: "text-blue-600" },
  { status: "Completed", count: 15, bgColor: "bg-status-verified", textColor: "text-status-verified-foreground" }
]

export default function Claim() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Claims Management</h1>
          <p className="text-muted-foreground">Monitor and manage claim submissions and approvals</p>
        </div>
        <Button><FileText className="h-4 w-4 mr-2" />New Claim</Button>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {claimStats.map((stat) => (
          <Card key={stat.status} className={`${stat.bgColor} border-0`}>
            <CardContent className="p-6 text-center">
              <div className={`text-3xl font-bold ${stat.textColor}`}>{stat.count}</div>
              <p className={`text-sm font-medium ${stat.textColor} mt-2`}>{stat.status}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card>
        <CardHeader><CardTitle className="flex items-center gap-2"><TrendingUp className="h-5 w-5" />Claims Overview</CardTitle></CardHeader>
        <CardContent>
          <div className="h-64 bg-muted rounded-lg flex items-center justify-center">
            <p className="text-muted-foreground">Claims data visualization and filters coming soon</p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}