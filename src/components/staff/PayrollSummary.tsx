import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { CreditCard, FileText, DollarSign, Download } from "lucide-react"

export function PayrollSummary() {
  const currentMonth = new Date().toLocaleDateString('en-GB', { month: 'long' })

  return (
    <Card className="group hover:shadow-lg transition-all duration-300 border-0 bg-gradient-to-br from-green-50/50 to-emerald-50/50 hover:from-green-50 hover:to-emerald-50">
      <CardHeader className="pb-3 space-y-2">
        <div className="flex items-center justify-between">
          <div className="p-2 bg-green-100 rounded-lg group-hover:bg-green-200 transition-colors">
            <CreditCard className="h-5 w-5 text-green-600" />
          </div>
          <DollarSign className="h-4 w-4 text-green-500" />
        </div>
        <CardTitle className="text-lg font-semibold text-green-900">
          Payroll Information
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Payroll Status */}
        <div className="space-y-3">
          <h4 className="font-medium text-sm text-green-600 uppercase tracking-wide">
            {currentMonth} Payroll
          </h4>
          <div className="p-4 bg-white/60 rounded-lg border text-center">
            <div className="text-sm text-muted-foreground">Salary Information</div>
            <div className="text-lg font-semibold text-green-700 mt-1">Ready for Review</div>
          </div>
        </div>

        {/* Quick Info */}
        <div className="space-y-2">
          <h4 className="font-medium text-sm text-green-600 uppercase tracking-wide">Access</h4>
          <div className="p-3 bg-white/60 rounded-lg border">
            <div className="text-sm text-muted-foreground">
              View your salary details, deductions, and payment history
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="space-y-3">
          <h4 className="font-medium text-sm text-green-600 uppercase tracking-wide">Quick Actions</h4>
          <div className="grid grid-cols-1 gap-2">
            <Button size="sm" className="justify-start bg-green-600 hover:bg-green-700">
              <FileText className="h-3 w-3 mr-2" />
              View Payroll Details
            </Button>
            <Button variant="outline" size="sm" className="justify-start hover:bg-green-50 hover:border-green-200">
              <Download className="h-3 w-3 mr-2" />
              Download Pay Slip
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}