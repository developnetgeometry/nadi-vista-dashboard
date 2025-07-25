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
  { tp: "TP3", pending: 3, submitted: 3, processing: 2, completed: 3, total: 11 },
  { tp: "TP4", pending: 6, submitted: 4, processing: 3, completed: 7, total: 20 },
  { tp: "TP5", pending: 2, submitted: 1, processing: 1, completed: 5, total: 9 },
  { tp: "TP6", pending: 7, submitted: 5, processing: 2, completed: 6, total: 20 },
  { tp: "TP7", pending: 3, submitted: 2, processing: 4, completed: 9, total: 18 }
]

const summaryByTPData = [
  { tp: "TP1", q1: "5/18", q2: "5/18", q3: "5/18", q4: "5/18" },
  { tp: "TP2", q1: "5/18", q2: "5/18", q3: "5/18", q4: "5/18" },
  { tp: "TP3", q1: "5/18", q2: "5/18", q3: "5/18", q4: "5/18" },
  { tp: "TP4", q1: "6/20", q2: "6/20", q3: "6/20", q4: "6/20" },
  { tp: "TP5", q1: "2/9", q2: "2/9", q3: "2/9", q4: "2/9" },
  { tp: "TP6", q1: "7/20", q2: "7/20", q3: "7/20", q4: "7/20" },
  { tp: "TP7", q1: "3/18", q2: "3/18", q3: "3/18", q4: "3/18" }
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
          <div className="space-y-6">
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

            {/* Claims by Technology Partner Section */}
            <div className="space-y-6">
              <h3 className="text-xl font-semibold">Claims by Technology Partner (TP)</h3>
              
              {/* Stacked Bar Chart - Full Width */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg flex items-center gap-2">
                    <BarChart3 className="h-5 w-5" />
                    Claims Distribution by TP
                  </CardTitle>
                  <p className="text-sm text-muted-foreground">Visual breakdown of claim statuses across all 7 technology partners</p>
                </CardHeader>
                <CardContent>
                  <ChartContainer config={chartConfig} className="h-[400px] w-full">
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
                      <Bar dataKey="pending" stackId="a" fill="var(--color-pending)" radius={[0, 0, 4, 4]} />
                      <Bar dataKey="submitted" stackId="a" fill="var(--color-submitted)" />
                      <Bar dataKey="processing" stackId="a" fill="var(--color-processing)" />
                      <Bar dataKey="completed" stackId="a" fill="var(--color-completed)" radius={[4, 4, 0, 0]} />
                    </BarChart>
                  </ChartContainer>
                </CardContent>
              </Card>

              {/* Data Table - Full Width */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Detailed Breakdown</CardTitle>
                  <p className="text-sm text-muted-foreground">Complete statistics for each technology partner with color-coded status indicators</p>
                </CardHeader>
                <CardContent className="p-0">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="px-6 w-32">Technology Partner</TableHead>
                        <TableHead className="text-center w-32">Pending</TableHead>
                        <TableHead className="text-center w-32">Submitted</TableHead>
                        <TableHead className="text-center w-32">Processing</TableHead>
                        <TableHead className="text-center w-32">Completed</TableHead>
                        <TableHead className="text-center w-32 font-semibold">Total Claims</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {technologyPartnerData.map((tp) => (
                        <TableRow key={tp.tp} className="hover:bg-muted/50">
                          <TableCell className="font-medium px-6">{tp.tp}</TableCell>
                          <TableCell className="text-center">
                            <Badge variant="secondary" className="bg-orange-50 text-orange-600 border-orange-200 min-w-[40px]">
                              {tp.pending}
                            </Badge>
                          </TableCell>
                          <TableCell className="text-center">
                            <Badge variant="secondary" className="bg-blue-50 text-blue-600 border-blue-200 min-w-[40px]">
                              {tp.submitted}
                            </Badge>
                          </TableCell>
                          <TableCell className="text-center">
                            <Badge variant="secondary" className="bg-yellow-50 text-yellow-600 border-yellow-200 min-w-[40px]">
                              {tp.processing}
                            </Badge>
                          </TableCell>
                          <TableCell className="text-center">
                            <Badge variant="secondary" className="bg-green-50 text-green-600 border-green-200 min-w-[40px]">
                              {tp.completed}
                            </Badge>
                          </TableCell>
                          <TableCell className="text-center">
                            <Badge variant="outline" className="font-semibold min-w-[40px]">
                              {tp.total}
                            </Badge>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
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