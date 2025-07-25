import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { FileText, TrendingUp, Filter, BarChart3 } from "lucide-react"
import { useState } from "react"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from "recharts"

const claimStats = [
  { status: "Pending Claims", count: 12, bgColor: "bg-orange-50", textColor: "text-orange-600", borderColor: "border-orange-200" },
  { status: "Submitted Claims", count: 8, bgColor: "bg-blue-50", textColor: "text-blue-600", borderColor: "border-blue-200" },
  { status: "Processing Claims", count: 5, bgColor: "bg-yellow-50", textColor: "text-yellow-600", borderColor: "border-yellow-200" },
  { status: "Completed Claims", count: 15, bgColor: "bg-green-50", textColor: "text-green-600", borderColor: "border-green-200" }
]

const technologyPartnerData = [
  { tp: "TP1", pending: 5, submitted: 3, processing: 2, completed: 8, total: 18 },
  { tp: "TP2", pending: 4, submitted: 2, processing: 1, completed: 4, total: 11 },
  { tp: "TP3", pending: 3, submitted: 3, processing: 2, completed: 3, total: 11 }
]

const summaryByTPData = [
  { tp: "TP1", q1: "5/18", q2: "5/18", q3: "5/18", q4: "5/18" },
  { tp: "TP2", q1: "5/18", q2: "5/18", q3: "5/18", q4: "5/18" },
  { tp: "TP3", q1: "5/18", q2: "5/18", q3: "5/18", q4: "5/18" }
]

const chartConfig = {
  pending: {
    label: "Pending",
    color: "hsl(var(--chart-1))",
  },
  submitted: {
    label: "Submitted", 
    color: "hsl(var(--chart-2))",
  },
  processing: {
    label: "Processing",
    color: "hsl(var(--chart-3))",
  },
  completed: {
    label: "Completed",
    color: "hsl(var(--chart-4))",
  },
}

export default function Claim() {
  const [selectedYear, setSelectedYear] = useState("2024")
  const [selectedClaim, setSelectedClaim] = useState("All")
  const [selectedPhase, setSelectedPhase] = useState("All")

  const totalClaims = claimStats.reduce((sum, stat) => sum + stat.count, 0)

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Summary Claim</h1>
          <p className="text-muted-foreground">Monitor and manage claim submissions and approvals</p>
        </div>
        <Button><FileText className="h-4 w-4 mr-2" />New Claim</Button>
      </div>

      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="summary-by-tp">Summary by TP</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          {/* Total Claims Section */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <h2 className="text-xl font-semibold">Total Claims</h2>
              <Badge variant="outline">{totalClaims} Total</Badge>
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

          {/* Based on TPs Section */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold">Based on TPs</h2>
                <div className="flex items-center gap-2">
                  <Filter className="h-4 w-4" />
                  <span className="text-sm text-muted-foreground">Filters:</span>
                  <Select value={selectedYear} onValueChange={setSelectedYear}>
                    <SelectTrigger className="w-24">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="2024">2024</SelectItem>
                      <SelectItem value="2023">2023</SelectItem>
                    </SelectContent>
                  </Select>
                  <Select value={selectedClaim} onValueChange={setSelectedClaim}>
                    <SelectTrigger className="w-32">
                      <SelectValue placeholder="Claim" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="All">All Claims</SelectItem>
                      <SelectItem value="Pending">Pending</SelectItem>
                      <SelectItem value="Submitted">Submitted</SelectItem>
                    </SelectContent>
                  </Select>
                  <Select value={selectedPhase} onValueChange={setSelectedPhase}>
                    <SelectTrigger className="w-28">
                      <SelectValue placeholder="Phase" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="All">All</SelectItem>
                      <SelectItem value="Phase1">Phase 1</SelectItem>
                      <SelectItem value="Phase2">Phase 2</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <BarChart3 className="h-5 w-5" />
                    Visual Representation
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="text-sm text-muted-foreground">KPI cards showing the count for each status:</div>
                  <div className="grid grid-cols-2 gap-4">
                    {claimStats.map((stat, index) => (
                      <div key={stat.status} className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>{stat.status}</span>
                          <span className="font-medium">{stat.count}/{totalClaims}</span>
                        </div>
                        <Progress value={(stat.count / totalClaims) * 100} className="h-2" />
                      </div>
                    ))}
                  </div>
                  <div className="text-sm text-muted-foreground mt-4">
                    Progress bar or pie chart for status distribution
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Claims by Technology Partner Table and Chart */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Claims by Technology Partner (TP)</h3>
              
              {/* Stacked Bar Chart */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-sm">Claims Distribution by TP</CardTitle>
                </CardHeader>
                <CardContent>
                  <ChartContainer config={chartConfig} className="h-[300px]">
                    <BarChart data={technologyPartnerData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis 
                        dataKey="tp" 
                        tickLine={false}
                        axisLine={false}
                        className="text-xs"
                      />
                      <YAxis 
                        tickLine={false}
                        axisLine={false}
                        className="text-xs"
                      />
                      <ChartTooltip content={<ChartTooltipContent />} />
                      <Bar dataKey="pending" stackId="a" fill="var(--color-pending)" />
                      <Bar dataKey="submitted" stackId="a" fill="var(--color-submitted)" />
                      <Bar dataKey="processing" stackId="a" fill="var(--color-processing)" />
                      <Bar dataKey="completed" stackId="a" fill="var(--color-completed)" />
                    </BarChart>
                  </ChartContainer>
                </CardContent>
              </Card>

              {/* Data Table */}
              <Card>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Technology Partner</TableHead>
                      <TableHead className="text-center">Pending</TableHead>
                      <TableHead className="text-center">Submitted</TableHead>
                      <TableHead className="text-center">Processing</TableHead>
                      <TableHead className="text-center">Completed</TableHead>
                      <TableHead className="text-center">Total Claims</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {technologyPartnerData.map((tp) => (
                      <TableRow key={tp.tp}>
                        <TableCell className="font-medium">{tp.tp}</TableCell>
                        <TableCell className="text-center">{tp.pending}</TableCell>
                        <TableCell className="text-center">{tp.submitted}</TableCell>
                        <TableCell className="text-center">{tp.processing}</TableCell>
                        <TableCell className="text-center">{tp.completed}</TableCell>
                        <TableCell className="text-center font-semibold">{tp.total}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </Card>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="summary-by-tp" className="space-y-6">
          {/* Summary Claim by TP */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Summary Claim by TP</CardTitle>
                <div className="flex items-center gap-2">
                  <span className="text-sm text-muted-foreground">Filters: By Year and</span>
                  <Select defaultValue="quarter">
                    <SelectTrigger className="w-40">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="quarter">Claim by Quarter</SelectItem>
                      <SelectItem value="month">Claim by Month</SelectItem>
                    </SelectContent>
                  </Select>
                  <span className="text-sm text-muted-foreground">and Phase</span>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>No</TableHead>
                    <TableHead>TP</TableHead>
                    <TableHead className="text-center">Q1</TableHead>
                    <TableHead className="text-center">Q2</TableHead>
                    <TableHead className="text-center">Q3</TableHead>
                    <TableHead className="text-center">Q4</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {summaryByTPData.map((item, index) => (
                    <TableRow key={item.tp}>
                      <TableCell>{index + 1}</TableCell>
                      <TableCell className="font-medium">{item.tp}</TableCell>
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