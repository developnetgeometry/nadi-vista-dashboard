import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { FileText, TrendingUp, Filter } from "lucide-react"
import { useState } from "react"

const claimStats = [
  { status: "Pending Claims", count: 12, bgColor: "bg-orange-50", textColor: "text-orange-600", borderColor: "border-orange-200" },
  { status: "Submitted Claims", count: 8, bgColor: "bg-blue-50", textColor: "text-blue-600", borderColor: "border-blue-200" },
  { status: "Processing Claims", count: 5, bgColor: "bg-yellow-50", textColor: "text-yellow-600", borderColor: "border-yellow-200" },
  { status: "Completed Claims", count: 15, bgColor: "bg-green-50", textColor: "text-green-600", borderColor: "border-green-200" }
]

const summaryByPhaseData = [
  { no: 1, phaseName: "Pilot", q1: "5/18", q2: "5/18", q3: "5/18", q4: "5/18" },
  { no: 2, phaseName: "NADI 2024", q1: "5/18", q2: "5/18", q3: "5/18", q4: "5/18" },
  { no: 3, phaseName: "CUWBACK 2026", q1: "5/18", q2: "5/18", q3: "5/18", q4: "5/18" }
]

export default function TPClaim() {
  const [selectedYear, setSelectedYear] = useState("2024")
  const [selectedFilter, setSelectedFilter] = useState("quarter")

  const totalClaims = claimStats.reduce((sum, stat) => sum + stat.count, 0)

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Summary Claim</h1>
          <p className="text-muted-foreground">Monitor and manage claim submissions and approvals for TP</p>
        </div>
        <Button><FileText className="h-4 w-4 mr-2" />New Claim</Button>
      </div>

      <Tabs defaultValue="summary-claim" className="space-y-6">
        <TabsList>
          <TabsTrigger value="summary-claim">Summary Claim</TabsTrigger>
          <TabsTrigger value="summary-by-phase">Summary Claim by Phase</TabsTrigger>
        </TabsList>

        <TabsContent value="summary-claim" className="space-y-6">
          {/* Total Claims Section */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <h2 className="text-xl font-semibold">Total Claims</h2>
                <Badge variant="outline">{totalClaims} Total</Badge>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-sm text-muted-foreground">Filters: By Year</span>
                <Select value={selectedYear} onValueChange={setSelectedYear}>
                  <SelectTrigger className="w-24">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="2024">2024</SelectItem>
                    <SelectItem value="2023">2023</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {claimStats.map((stat) => (
                <Card key={stat.status} className={`${stat.bgColor} ${stat.borderColor} border`}>
                  <CardContent className="p-6 text-center">
                    <div className={`text-3xl font-bold ${stat.textColor}`}>{stat.count}</div>
                    <p className={`text-sm font-medium ${stat.textColor} mt-2`}>{stat.status}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </TabsContent>

        <TabsContent value="summary-by-phase" className="space-y-6">
          {/* Summary Claim by Phase */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Summary Claim by Phase</CardTitle>
                <div className="flex items-center gap-2">
                  <span className="text-sm text-muted-foreground">Filters: By Year and</span>
                  <Select value={selectedFilter} onValueChange={setSelectedFilter}>
                    <SelectTrigger className="w-40">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="quarter">Claim by Quarter and Phase</SelectItem>
                      <SelectItem value="month">Claim by Month and Phase</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <span>5/18 = no of items / total items</span>
              </div>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>No</TableHead>
                    <TableHead>Phase Name</TableHead>
                    <TableHead className="text-center">Q1</TableHead>
                    <TableHead className="text-center">Q2</TableHead>
                    <TableHead className="text-center">Q3</TableHead>
                    <TableHead className="text-center">Q4</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {summaryByPhaseData.map((item) => (
                    <TableRow key={item.no}>
                      <TableCell>{item.no}</TableCell>
                      <TableCell className="font-medium">{item.phaseName}</TableCell>
                      <TableCell className="text-center">{item.q1}</TableCell>
                      <TableCell className="text-center">{item.q2}</TableCell>
                      <TableCell className="text-center">{item.q3}</TableCell>
                      <TableCell className="text-center">{item.q4}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}