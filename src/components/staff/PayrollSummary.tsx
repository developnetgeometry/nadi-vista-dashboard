import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { CreditCard, FileText, DollarSign, Download } from "lucide-react"

export function PayrollSummary() {
  const currentMonth = new Date().toLocaleDateString('en-GB', { month: 'long' })

  return (
    <Card className="hover:shadow-md transition-shadow">
      <CardHeader className="pb-4">
        <CardTitle className="flex items-center gap-2">
          <CreditCard className="h-5 w-5 text-primary" />
          Payroll Information
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Current Salary */}
        <div className="grid grid-cols-2 gap-4">
          <div className="p-4 bg-muted/50 rounded-lg text-center">
            <div className="text-sm text-muted-foreground">Monthly Salary</div>
            <div className="text-xl font-bold text-foreground">RM 4,500</div>
          </div>
          <div className="p-4 bg-muted/50 rounded-lg text-center">
            <div className="text-sm text-muted-foreground">Allowances</div>
            <div className="text-xl font-bold text-foreground">RM 800</div>
          </div>
        </div>

        {/* Status */}
        <div className="p-4 bg-muted/50 rounded-lg text-center">
          <div className="text-sm text-muted-foreground">{currentMonth} Payroll</div>
          <div className="text-lg font-semibold text-foreground mt-1">Ready for Review</div>
        </div>

        {/* Quick Actions */}
        <div className="space-y-2">
          <Button size="sm" className="w-full justify-start">
            <FileText className="h-4 w-4 mr-2" />
            View Payroll Details
          </Button>
          <Button variant="outline" size="sm" className="w-full justify-start">
            <Download className="h-4 w-4 mr-2" />
            Download Pay Slip
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}