import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { CreditCard, FileText } from "lucide-react"

export function PayrollSummary() {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
        <CardTitle className="text-lg font-semibold flex items-center gap-2">
          <CreditCard className="h-5 w-5" />
          Payroll
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Payroll Info */}
        <div className="space-y-2">
          <h4 className="font-medium text-sm text-muted-foreground">Payroll Information</h4>
          <div className="text-sm text-muted-foreground">
            Access your payroll information and salary details
          </div>
        </div>

        {/* Quick Actions */}
        <div className="pt-2">
          <Button variant="outline" size="sm" className="flex items-center gap-1">
            <FileText className="h-3 w-3" />
            View Payroll
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}