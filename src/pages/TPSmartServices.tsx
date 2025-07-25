import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { Cpu, TrendingUp, Filter, Plus, Activity, Zap, Shield, Globe } from "lucide-react"
import { useState } from "react"
import { PieChart, Pie, Cell, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid } from "recharts"

const serviceStats = [
  { status: "Active Services", count: 45, bgColor: "bg-green-50", textColor: "text-green-600", borderColor: "border-green-200" },
  { status: "Inactive Services", count: 8, bgColor: "bg-red-50", textColor: "text-red-600", borderColor: "border-red-200" },
  { status: "Pending Approval", count: 3, bgColor: "bg-orange-50", textColor: "text-orange-600", borderColor: "border-orange-200" },
  { status: "Total Participants", count: 12840, bgColor: "bg-blue-50", textColor: "text-blue-600", borderColor: "border-blue-200" }
]

const serviceData = [
  { name: "Digital Identity", participants: 4500, status: "Active", growth: "+12%", category: "Security" },
  { name: "IoT Connectivity", participants: 3200, status: "Active", growth: "+8%", category: "Network" },
  { name: "Cloud Storage", participants: 2800, status: "Active", growth: "+15%", category: "Storage" },
  { name: "Data Analytics", participants: 1840, status: "Active", growth: "+22%", category: "Analytics" },
  { name: "Mobile Payment", participants: 500, status: "Inactive", growth: "-5%", category: "Payment" }
]

const regionData = [
  { region: "Northern Region", count: 3200, color: "#8884d8" },
  { region: "Central Region", count: 4500, color: "#82ca9d" },
  { region: "Southern Region", count: 2800, color: "#ffc658" },
  { region: "East Coast", count: 1840, color: "#ff7300" },
  { region: "East Malaysia", count: 500, color: "#00ff88" }
]

const chartConfig = {
  participants: {
    label: "Participants",
    color: "hsl(var(--chart-1))",
  }
}

export default function TPSmartServices() {
  const [selectedYear, setSelectedYear] = useState("2024")
  const [selectedService, setSelectedService] = useState("All")
  const [selectedRegion, setSelectedRegion] = useState("All")

  const totalServices = serviceStats[0].count + serviceStats[1].count + serviceStats[2].count

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Smart Services</h1>
          <p className="text-muted-foreground">Monitor and manage smart services for TP participants</p>
        </div>
        <Button><Plus className="h-4 w-4 mr-2" />New Service</Button>
      </div>

      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="by-region">Participation by Region</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          {/* Service Statistics */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <h2 className="text-xl font-semibold">Service Statistics</h2>
              <Badge variant="outline">{totalServices} Total Services</Badge>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {serviceStats.map((stat) => (
                <Card key={stat.status} className={`${stat.bgColor} ${stat.borderColor} border`}>
                  <CardContent className="p-6 text-center">
                    <div className={`text-3xl font-bold ${stat.textColor}`}>{stat.count.toLocaleString()}</div>
                    <p className={`text-sm font-medium ${stat.textColor} mt-2`}>{stat.status}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Service Performance */}
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold">Service Performance</h2>
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
                <Select value={selectedService} onValueChange={setSelectedService}>
                  <SelectTrigger className="w-32">
                    <SelectValue placeholder="Service" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="All">All Services</SelectItem>
                    <SelectItem value="Digital">Digital Identity</SelectItem>
                    <SelectItem value="IoT">IoT Connectivity</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Service Distribution Chart */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Activity className="h-5 w-5" />
                    Participant Distribution
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ChartContainer config={chartConfig} className="h-[300px]">
                    <PieChart>
                      <Pie
                        data={serviceData.filter(d => d.status === "Active")}
                        dataKey="participants"
                        nameKey="name"
                        cx="50%"
                        cy="50%"
                        outerRadius={80}
                        label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                      >
                        {serviceData.filter(d => d.status === "Active").map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={`hsl(var(--chart-${index + 1}))`} />
                        ))}
                      </Pie>
                      <ChartTooltip content={<ChartTooltipContent />} />
                    </PieChart>
                  </ChartContainer>
                </CardContent>
              </Card>

              {/* Service Growth Chart */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <TrendingUp className="h-5 w-5" />
                    Service Growth
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ChartContainer config={chartConfig} className="h-[300px]">
                    <BarChart data={serviceData.filter(d => d.status === "Active")}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" angle={-45} textAnchor="end" height={80} />
                      <YAxis />
                      <ChartTooltip content={<ChartTooltipContent />} />
                      <Bar dataKey="participants" fill="var(--color-participants)" />
                    </BarChart>
                  </ChartContainer>
                </CardContent>
              </Card>
            </div>

            {/* Service Details Table */}
            <Card>
              <CardHeader>
                <CardTitle>Service Details</CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="px-6">Service Name</TableHead>
                      <TableHead>Category</TableHead>
                      <TableHead className="text-center">Participants</TableHead>
                      <TableHead className="text-center">Growth</TableHead>
                      <TableHead className="text-center">Status</TableHead>
                      <TableHead className="text-center">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {serviceData.map((service) => (
                      <TableRow key={service.name} className="hover:bg-muted/50">
                        <TableCell className="font-medium px-6">{service.name}</TableCell>
                        <TableCell>
                          <Badge variant="outline">{service.category}</Badge>
                        </TableCell>
                        <TableCell className="text-center font-medium">
                          {service.participants.toLocaleString()}
                        </TableCell>
                        <TableCell className="text-center">
                          <span className={service.growth.startsWith('+') ? 'text-green-600' : 'text-red-600'}>
                            {service.growth}
                          </span>
                        </TableCell>
                        <TableCell className="text-center">
                          <Badge 
                            variant="secondary" 
                            className={
                              service.status === "Active" 
                                ? "bg-green-50 text-green-600 border-green-200" 
                                : "bg-red-50 text-red-600 border-red-200"
                            }
                          >
                            {service.status}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-center">
                          <Button variant="outline" size="sm">Manage</Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="by-region" className="space-y-6">
          {/* Regional Participation */}
          <Card>
            <CardHeader>
              <CardTitle>Participation by Region</CardTitle>
              <p className="text-sm text-muted-foreground">Smart service participation across different regions</p>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                {regionData.map((region) => (
                  <Card key={region.region} className="text-center">
                    <CardContent className="p-4">
                      <div className="text-2xl font-bold text-primary">{region.count.toLocaleString()}</div>
                      <p className="text-sm font-medium mt-1">{region.region}</p>
                      <div className="mt-2">
                        <Progress value={(region.count / 12840) * 100} className="h-2" />
                      </div>
                      <p className="text-xs text-muted-foreground mt-1">
                        {((region.count / 12840) * 100).toFixed(1)}%
                      </p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}