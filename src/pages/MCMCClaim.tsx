import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { FileText, TrendingUp, Filter, BarChart3, PieChart } from "lucide-react"
import { useState } from "react"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer, PieChart as RechartsPieChart, Cell } from "recharts"
import { DateRangePicker } from "@/components/DateRangePicker"
import { DateRange } from "@/components/DateRangePicker"

const claimStats = [
  { status: "Total Claims", count: 40, bgColor: "bg-gray-50", textColor: "text-gray-600", borderColor: "border-gray-200" },
  { status: "Claims by Status", count: 40, bgColor: "bg-blue-50", textColor: "text-blue-600", borderColor: "border-blue-200" },
  { status: "Claims by Service Provider", count: 40, bgColor: "bg-green-50", textColor: "text-green-600", borderColor: "border-green-200" },
  { status: "Claims by Category", count: 40, bgColor: "bg-purple-50", textColor: "text-purple-600", borderColor: "border-purple-200" }
]

const serviceProviderData = [
  { provider: "TM Tech", pending: 5, submitted: 3, processing: 2, completed: 8, total: 18 },
  { provider: "Maxis", pending: 4, submitted: 2, processing: 1, completed: 4, total: 11 },
  { provider: "CelcomDigi", pending: 3, submitted: 3, processing: 2, completed: 3, total: 11 },
  { provider: "Redtone", pending: 6, submitted: 4, processing: 3, completed: 7, total: 20 }
]

const chartConfig = {
  pending: {
    label: "Pending",
    color: "#ff7c43",
  },
  submitted: {
    label: "Submitted", 
    color: "#3b82f6",
  },
  processing: {
    label: "Processing",
    color: "#f59e0b",
  },
  completed: {
    label: "Completed",
    color: "#10b981",
  },
}

const pieChartData = [
  { name: "TM Tech", value: 18, color: "#3b82f6" },
  { name: "Maxis", value: 11, color: "#10b981" },
  { name: "CelcomDigi", value: 11, color: "#f59e0b" },
  { name: "Redtone", value: 20, color: "#ef4444" }
]

const summaryByTPData = [
  { tp: "TM Tech", q1: "5/18", q2: "5/18", q3: "5/18", q4: "5/18" },
  { tp: "Maxis", q1: "4/11", q2: "4/11", q3: "4/11", q4: "4/11" },
  { tp: "CelcomDigi", q1: "3/11", q2: "3/11", q3: "3/11", q4: "3/11" },
  { tp: "Redtone", q1: "6/20", q2: "6/20", q3: "6/20", q4: "6/20" }
]

export default function MCMCClaim() {
  const [selectedYear, setSelectedYear] = useState("2024")
  const [selectedServiceProvider, setSelectedServiceProvider] = useState("All")
  const [selectedCategory, setSelectedCategory] = useState("All")
  const [selectedClaimStatus, setSelectedClaimStatus] = useState("All")
  const [chartType, setChartType] = useState("bar")
  const [dateRange, setDateRange] = useState<DateRange | undefined>()

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">MCMC Claims Dashboard</h1>
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
          {/* Main Metrics Section */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <h2 className="text-xl font-semibold">Main Metrics</h2>
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

          {/* Filters Section */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Filter className="h-5 w-5" />
                Filters
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Date Range</label>
                  <DateRangePicker
                    value={dateRange}
                    onChange={setDateRange}
                    placeholder="Select date range"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Service Provider</label>
                  <Select value={selectedServiceProvider} onValueChange={setSelectedServiceProvider}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="All">All Providers</SelectItem>
                      <SelectItem value="TM Tech">TM Tech</SelectItem>
                      <SelectItem value="Maxis">Maxis</SelectItem>
                      <SelectItem value="CelcomDigi">CelcomDigi</SelectItem>
                      <SelectItem value="Redtone">Redtone</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Category</label>
                  <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="All">All Categories</SelectItem>
                      <SelectItem value="Salary & HR">Salary & HR</SelectItem>
                      <SelectItem value="Site Management">Site Management</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Claim Status</label>
                  <Select value={selectedClaimStatus} onValueChange={setSelectedClaimStatus}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="All">All Status</SelectItem>
                      <SelectItem value="Pending">Pending</SelectItem>
                      <SelectItem value="Submitted">Submitted</SelectItem>
                      <SelectItem value="Processing">Processing</SelectItem>
                      <SelectItem value="Completed">Completed</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">By Year</label>
                  <Select value={selectedYear} onValueChange={setSelectedYear}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="2024">2024</SelectItem>
                      <SelectItem value="2023">2023</SelectItem>
                      <SelectItem value="2022">2022</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Claims by Service Provider Section */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center gap-2">
                  <BarChart3 className="h-5 w-5" />
                  Claims by Service Provider (Bar Chart/Pie Chart)
                </CardTitle>
                <div className="flex items-center gap-2">
                  <Button
                    variant={chartType === "bar" ? "default" : "outline"}
                    size="sm"
                    onClick={() => setChartType("bar")}
                  >
                    <BarChart3 className="h-4 w-4 mr-1" />
                    Bar Chart
                  </Button>
                  <Button
                    variant={chartType === "pie" ? "default" : "outline"}
                    size="sm"
                    onClick={() => setChartType("pie")}
                  >
                    <PieChart className="h-4 w-4 mr-1" />
                    Pie Chart
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              {chartType === "bar" ? (
                <div className="space-y-4">
                  <div className="text-sm text-muted-foreground">
                    • Visual Representation:
                  </div>
                  <div className="text-sm text-muted-foreground">
                    • Bar Chart: Claims count for each service provider grouped by status.
                  </div>
                  <ChartContainer config={chartConfig} className="h-[400px] w-full">
                    <BarChart data={serviceProviderData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis 
                        dataKey="provider" 
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
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="text-sm text-muted-foreground">
                    • Visual Representation:
                  </div>
                  <div className="text-sm text-muted-foreground">
                    • Pie Chart: Claims distribution across service providers.
                  </div>
                  <div className="h-[400px] w-full flex justify-center">
                    <ResponsiveContainer width="100%" height="100%">
                      <RechartsPieChart>
                        <RechartsPieChart data={pieChartData} cx="50%" cy="50%" outerRadius={120} innerRadius={40}>
                          {pieChartData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                          ))}
                        </RechartsPieChart>
                        <ChartTooltip 
                          content={({ active, payload }) => {
                            if (active && payload && payload.length) {
                              const data = payload[0].payload;
                              return (
                                <div className="bg-white p-2 border rounded shadow">
                                  <p className="font-semibold">{data.name}</p>
                                  <p>Claims: {data.value}</p>
                                </div>
                              );
                            }
                            return null;
                          }} 
                        />
                      </RechartsPieChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              )}
              
              {/* Data Table */}
              <div className="mt-6">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Service Provider</TableHead>
                      <TableHead className="text-center">Pending</TableHead>
                      <TableHead className="text-center">Submitted</TableHead>
                      <TableHead className="text-center">Processing</TableHead>
                      <TableHead className="text-center">Completed</TableHead>
                      <TableHead className="text-center font-semibold">Total Claims</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {serviceProviderData.map((provider) => (
                      <TableRow key={provider.provider} className="hover:bg-muted/50">
                        <TableCell className="font-medium">{provider.provider}</TableCell>
                        <TableCell className="text-center">
                          <Badge variant="secondary" className="bg-orange-50 text-orange-600 border-orange-200">
                            {provider.pending}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-center">
                          <Badge variant="secondary" className="bg-blue-50 text-blue-600 border-blue-200">
                            {provider.submitted}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-center">
                          <Badge variant="secondary" className="bg-yellow-50 text-yellow-600 border-yellow-200">
                            {provider.processing}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-center">
                          <Badge variant="secondary" className="bg-green-50 text-green-600 border-green-200">
                            {provider.completed}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-center">
                          <Badge variant="outline" className="font-semibold">
                            {provider.total}
                          </Badge>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
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