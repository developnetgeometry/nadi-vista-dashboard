import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { NADIInteractiveMap } from "@/components/NADIInteractiveMap"
import { NADIDistributionMap } from "@/components/NADIDistributionMap"
import { Settings, TrendingUp, Filter, Download, MapPin, Network, Activity } from "lucide-react"
import { useState } from "react"

const operationStats = [
  { status: "Total NADI Centers", count: 2156, bgColor: "bg-blue-50", textColor: "text-blue-600", borderColor: "border-blue-200" },
  { status: "Active Centers", count: 2089, bgColor: "bg-green-50", textColor: "text-green-600", borderColor: "border-green-200" },
  { status: "Maintenance", count: 45, bgColor: "bg-orange-50", textColor: "text-orange-600", borderColor: "border-orange-200" },
  { status: "Offline", count: 22, bgColor: "bg-red-50", textColor: "text-red-600", borderColor: "border-red-200" }
]

const nadiByRegion = [
  { region: "Northern Region", count: 430, color: "text-blue-600" },
  { region: "Central Region", count: 650, color: "text-green-600" },
  { region: "Southern Region", count: 520, color: "text-purple-600" },
  { region: "East Coast", count: 340, color: "text-orange-600" },
  { region: "East Malaysia", count: 216, color: "text-red-600" }
]

const nadiByTPForRegion = {
  "Northern Region": [
    { tp: "TP1", count: 85 },
    { tp: "TP2", count: 72 },
    { tp: "TP3", count: 68 },
    { tp: "TP4", count: 95 },
    { tp: "TP5", count: 110 }
  ],
  "Central Region": [
    { tp: "TP1", count: 120 },
    { tp: "TP2", count: 135 },
    { tp: "TP3", count: 110 },
    { tp: "TP4", count: 140 },
    { tp: "TP5", count: 145 }
  ],
  "Southern Region": [
    { tp: "TP1", count: 95 },
    { tp: "TP2", count: 105 },
    { tp: "TP3", count: 98 },
    { tp: "TP4", count: 112 },
    { tp: "TP5", count: 110 }
  ],
  "East Coast": [
    { tp: "TP1", count: 65 },
    { tp: "TP2", count: 70 },
    { tp: "TP3", count: 62 },
    { tp: "TP4", count: 75 },
    { tp: "TP5", count: 68 }
  ],
  "East Malaysia": [
    { tp: "TP1", count: 40 },
    { tp: "TP2", count: 45 },
    { tp: "TP3", count: 38 },
    { tp: "TP4", count: 48 },
    { tp: "TP5", count: 45 }
  ]
}

const siteClosure = [
  { id: "SC001", location: "Kuala Lumpur", reason: "Maintenance", duration: "2 hours", region: "Central Region", startTime: "09:00", endTime: "11:00" },
  { id: "SC002", location: "Penang", reason: "Network Issue", duration: "30 mins", region: "Northern Region", startTime: "14:30", endTime: "15:00" },
  { id: "SC003", location: "Johor Bahru", reason: "Power Outage", duration: "1 hour", region: "Southern Region", startTime: "16:00", endTime: "17:00" }
]

export default function TPOperation() {
  const [selectedYear, setSelectedYear] = useState("2024")
  const [selectedMonth, setSelectedMonth] = useState("All")
  const [regionDialogOpen, setRegionDialogOpen] = useState(false)
  const [selectedRegion, setSelectedRegion] = useState<string>("")

  const downloadCSV = (data: any[], filename: string) => {
    const csvContent = [
      Object.keys(data[0]).join(','),
      ...data.map(row => Object.values(row).join(','))
    ].join('\n')
    
    const blob = new Blob([csvContent], { type: 'text/csv' })
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = filename
    a.click()
    window.URL.revokeObjectURL(url)
  }

  const totalCenters = operationStats.reduce((sum, stat) => sum + stat.count, 0)

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Operation Management</h1>
          <p className="text-muted-foreground">Monitor and manage NADI center operations for TP</p>
        </div>
        <Button><Download className="h-4 w-4 mr-2" />Export Report</Button>
      </div>

      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="maps">Interactive Maps</TabsTrigger>
          <TabsTrigger value="closure">Site Closure</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          {/* Operation Statistics */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <h2 className="text-xl font-semibold">Operation Statistics</h2>
              <Badge variant="outline">{totalCenters.toLocaleString()} Total Centers</Badge>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {operationStats.map((stat) => (
                <Card key={stat.status} className={`${stat.bgColor} ${stat.borderColor} border`}>
                  <CardContent className="p-6 text-center">
                    <div className={`text-3xl font-bold ${stat.textColor}`}>{stat.count.toLocaleString()}</div>
                    <p className={`text-sm font-medium ${stat.textColor} mt-2`}>{stat.status}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* NADI Distribution by Region */}
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold">NADI Distribution</h2>
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
                <Select value={selectedMonth} onValueChange={setSelectedMonth}>
                  <SelectTrigger className="w-32">
                    <SelectValue placeholder="Month" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="All">All Months</SelectItem>
                    <SelectItem value="Jan">January</SelectItem>
                    <SelectItem value="Feb">February</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Total NADI by Region */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MapPin className="h-5 w-5" />
                  Total NADI by Region
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                  {nadiByRegion.map((item) => (
                    <Card 
                      key={item.region}
                      className="cursor-pointer hover:bg-muted/50 transition-colors"
                      onClick={() => {
                        setSelectedRegion(item.region)
                        setRegionDialogOpen(true)
                      }}
                    >
                      <CardContent className="p-4 text-center">
                        <div className={`text-2xl font-bold ${item.color}`}>{item.count}</div>
                        <p className="text-sm font-medium text-muted-foreground">{item.region}</p>
                        <div className="mt-2">
                          <Progress value={(item.count / 2156) * 100} className="h-2" />
                        </div>
                        <p className="text-xs text-muted-foreground mt-1">
                          {((item.count / 2156) * 100).toFixed(1)}%
                        </p>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Performance Metrics */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Activity className="h-5 w-5" />
                    System Performance
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between text-sm">
                        <span>Uptime</span>
                        <span>99.8%</span>
                      </div>
                      <Progress value={99.8} className="mt-2" />
                    </div>
                    <div>
                      <div className="flex justify-between text-sm">
                        <span>Network Quality</span>
                        <span>95.2%</span>
                      </div>
                      <Progress value={95.2} className="mt-2" />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Network className="h-5 w-5" />
                    Connectivity
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between text-sm">
                        <span>4G Coverage</span>
                        <span>98.5%</span>
                      </div>
                      <Progress value={98.5} className="mt-2" />
                    </div>
                    <div>
                      <div className="flex justify-between text-sm">
                        <span>5G Coverage</span>
                        <span>87.3%</span>
                      </div>
                      <Progress value={87.3} className="mt-2" />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <TrendingUp className="h-5 w-5" />
                    Monthly Growth
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between text-sm">
                        <span>New Centers</span>
                        <span className="text-green-600">+24</span>
                      </div>
                      <Progress value={75} className="mt-2" />
                    </div>
                    <div>
                      <div className="flex justify-between text-sm">
                        <span>Upgrades</span>
                        <span className="text-blue-600">+16</span>
                      </div>
                      <Progress value={60} className="mt-2" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="maps" className="space-y-6">
          <div className="grid gap-6">
            <NADIInteractiveMap />
            <NADIDistributionMap />
          </div>
        </TabsContent>

        <TabsContent value="closure" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Site Closure Management</CardTitle>
              <p className="text-sm text-muted-foreground">Track and manage planned and unplanned site closures</p>
            </CardHeader>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="px-6">Closure ID</TableHead>
                    <TableHead>Location</TableHead>
                    <TableHead>Region</TableHead>
                    <TableHead>Reason</TableHead>
                    <TableHead>Duration</TableHead>
                    <TableHead>Start Time</TableHead>
                    <TableHead>End Time</TableHead>
                    <TableHead className="text-center">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {siteClosure.map((closure) => (
                    <TableRow key={closure.id} className="hover:bg-muted/50">
                      <TableCell className="font-medium px-6">{closure.id}</TableCell>
                      <TableCell>{closure.location}</TableCell>
                      <TableCell>{closure.region}</TableCell>
                      <TableCell>
                        <Badge 
                          variant="secondary" 
                          className={
                            closure.reason === "Maintenance" ? "bg-blue-50 text-blue-600 border-blue-200" :
                            closure.reason === "Network Issue" ? "bg-orange-50 text-orange-600 border-orange-200" :
                            "bg-red-50 text-red-600 border-red-200"
                          }
                        >
                          {closure.reason}
                        </Badge>
                      </TableCell>
                      <TableCell>{closure.duration}</TableCell>
                      <TableCell>{closure.startTime}</TableCell>
                      <TableCell>{closure.endTime}</TableCell>
                      <TableCell className="text-center">
                        <Button variant="outline" size="sm">View Details</Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Region Dialog */}
      <Dialog open={regionDialogOpen} onOpenChange={setRegionDialogOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Total NADI by TP - {selectedRegion}</DialogTitle>
            <DialogDescription>
              Breakdown of NADI centers by Technology Partner in {selectedRegion}
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            {nadiByTPForRegion[selectedRegion]?.map((tp, index) => (
              <div key={tp.tp} className="flex justify-between items-center p-3 bg-muted rounded-lg">
                <span className="font-medium">{tp.tp}</span>
                <Badge variant="outline">{tp.count} Centers</Badge>
              </div>
            ))}
            <Button onClick={() => downloadCSV(nadiByTPForRegion[selectedRegion] || [], `nadi-tp-${selectedRegion.toLowerCase().replace(' ', '-')}.csv`)}>
              <Download className="h-4 w-4 mr-2" />
              Download CSV
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}