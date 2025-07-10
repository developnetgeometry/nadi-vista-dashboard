import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Settings, Building2, Users, MapPin, UserCheck, AlertTriangle, Info, Download } from "lucide-react"
import { useState } from "react"

const operationStats = [
  { title: "Total NADI", count: "1,099", icon: Building2, color: "text-blue-600" },
  { title: "Open", count: "1,044", icon: Building2, color: "text-green-600" },
  { title: "Closed", count: "25", icon: Building2, color: "text-red-600" },
  { title: "Maintenance Open", count: "26", icon: AlertTriangle, color: "text-orange-600" }
]

const areaDistribution = [
  { area: "Urban", count: 440, percentage: 40, color: "bg-blue-500" },
  { area: "Suburban", count: 330, percentage: 30, color: "bg-green-500" },
  { area: "Rural", count: 220, percentage: 20, color: "bg-orange-500" },
  { area: "Remote", count: 109, percentage: 10, color: "bg-red-500" }
]

const maintenanceByState = [
  { state: "Selangor", count: 8 },
  { state: "Kuala Lumpur", count: 5 },
  { state: "Johor", count: 4 },
  { state: "Penang", count: 3 },
  { state: "Perak", count: 3 },
  { state: "Others", count: 3 }
]

const officerStats = [
  { role: "Manager", total: 550, occupied: 520, vacancy: 30 },
  { role: "Assistant Manager", total: 549, occupied: 489, vacancy: 60 }
]

const nadiDetails = [
  {
    name: "NADI Bukit Jalil",
    dusp: "TM",
    status: "Open",
    parliament: "Bandar Tun Razak",
    district: "Kuala Lumpur",
    phase: "Phase 2"
  },
  {
    name: "NADI Petaling Jaya",
    dusp: "MAXIS", 
    status: "Open",
    parliament: "Petaling Jaya",
    district: "Petaling",
    phase: "Phase 1"
  },
  {
    name: "NADI Johor Bahru",
    dusp: "CELCOMDIGI",
    status: "Maintenance",
    parliament: "Johor Bahru",
    district: "Johor Bahru",
    phase: "Phase 2"
  }
]

// Mock data for NADI closures
const nadiClosures = [
  {
    nadiName: "NADI Shah Alam",
    dusp: "TM",
    state: "Selangor",
    district: "Petaling",
    parliament: "Shah Alam",
    dun: "Kota Anggerik",
    reason: "Infrastructure maintenance"
  },
  {
    nadiName: "NADI Ipoh",
    dusp: "MAXIS",
    state: "Perak",
    district: "Kinta",
    parliament: "Ipoh Barat",
    dun: "Canning",
    reason: "Equipment upgrade"
  },
  {
    nadiName: "NADI Kota Kinabalu",
    dusp: "CELCOMDIGI",
    state: "Sabah",
    district: "Kota Kinabalu",
    parliament: "Kota Kinabalu",
    dun: "Api-Api",
    reason: "Building renovation"
  }
]

// Mock data for open dockets
const openDockets = [
  {
    state: "Selangor",
    totalNadi: 180,
    totalDocketOpen: 8
  },
  {
    state: "Kuala Lumpur",
    totalNadi: 85,
    totalDocketOpen: 5
  },
  {
    state: "Johor",
    totalNadi: 150,
    totalDocketOpen: 4
  },
  {
    state: "Penang",
    totalNadi: 75,
    totalDocketOpen: 3
  },
  {
    state: "Perak",
    totalNadi: 120,
    totalDocketOpen: 3
  }
]

export default function Operation() {
  const [closedDialogOpen, setClosedDialogOpen] = useState(false)
  const [maintenanceDialogOpen, setMaintenanceDialogOpen] = useState(false)

  const downloadCSV = (data: any[], filename: string) => {
    const headers = Object.keys(data[0])
    const csvContent = [
      headers.join(','),
      ...data.map(row => headers.map(header => `"${row[header]}"`).join(','))
    ].join('\n')

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' })
    const link = document.createElement('a')
    const url = URL.createObjectURL(blob)
    link.setAttribute('href', url)
    link.setAttribute('download', filename)
    link.style.visibility = 'hidden'
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Operation Dashboard</h1>
          <p className="text-muted-foreground">
            Monitor NADI operations, maintenance status, and workforce management
          </p>
        </div>
      </div>

      {/* Operation Statistics */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {operationStats.map((stat) => (
          <Card key={stat.title}>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-muted rounded-lg">
                    <stat.icon className={`h-6 w-6 ${stat.color}`} />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">{stat.title}</p>
                    <p className="text-2xl font-bold">{stat.count}</p>
                  </div>
                </div>
                {stat.title === "Closed" && (
                  <Dialog open={closedDialogOpen} onOpenChange={setClosedDialogOpen}>
                    <DialogTrigger asChild>
                      <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                        <Info className="h-4 w-4" />
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-4xl">
                      <DialogHeader>
                        <DialogTitle>NADI Closures</DialogTitle>
                      </DialogHeader>
                      <div className="space-y-4">
                        <Table>
                          <TableHeader>
                            <TableRow>
                              <TableHead>NADI Name</TableHead>
                              <TableHead>DUSP</TableHead>
                              <TableHead>State</TableHead>
                              <TableHead>District</TableHead>
                              <TableHead>Parliament</TableHead>
                              <TableHead>DUN</TableHead>
                              <TableHead>Reason</TableHead>
                            </TableRow>
                          </TableHeader>
                          <TableBody>
                            {nadiClosures.map((closure, index) => (
                              <TableRow key={index}>
                                <TableCell className="font-medium">{closure.nadiName}</TableCell>
                                <TableCell>{closure.dusp}</TableCell>
                                <TableCell>{closure.state}</TableCell>
                                <TableCell>{closure.district}</TableCell>
                                <TableCell>{closure.parliament}</TableCell>
                                <TableCell>{closure.dun}</TableCell>
                                <TableCell>{closure.reason}</TableCell>
                              </TableRow>
                            ))}
                          </TableBody>
                        </Table>
                        <div className="flex justify-end">
                          <Button onClick={() => downloadCSV(nadiClosures, 'nadi-closures.csv')}>
                            <Download className="h-4 w-4 mr-2" />
                            Download
                          </Button>
                        </div>
                      </div>
                    </DialogContent>
                  </Dialog>
                )}
                {stat.title === "Maintenance Open" && (
                  <Dialog open={maintenanceDialogOpen} onOpenChange={setMaintenanceDialogOpen}>
                    <DialogTrigger asChild>
                      <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                        <Info className="h-4 w-4" />
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-2xl">
                      <DialogHeader>
                        <DialogTitle>Open Dockets</DialogTitle>
                      </DialogHeader>
                      <div className="space-y-4">
                        <Table>
                          <TableHeader>
                            <TableRow>
                              <TableHead>State</TableHead>
                              <TableHead>Total NADI</TableHead>
                              <TableHead>Total Docket Open</TableHead>
                            </TableRow>
                          </TableHeader>
                          <TableBody>
                            {openDockets.map((docket, index) => (
                              <TableRow key={index}>
                                <TableCell className="font-medium">{docket.state}</TableCell>
                                <TableCell>{docket.totalNadi}</TableCell>
                                <TableCell>{docket.totalDocketOpen}</TableCell>
                              </TableRow>
                            ))}
                          </TableBody>
                        </Table>
                        <div className="flex justify-end">
                          <Button onClick={() => downloadCSV(openDockets, 'open-dockets.csv')}>
                            <Download className="h-4 w-4 mr-2" />
                            Download
                          </Button>
                        </div>
                      </div>
                    </DialogContent>
                  </Dialog>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* NADI Details and Area Distribution */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Info className="h-5 w-5" />
              NADI Center Details
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {nadiDetails.map((nadi) => (
              <div key={nadi.name} className="border rounded-lg p-4 space-y-2">
                <div className="flex justify-between items-start">
                  <h4 className="font-semibold">{nadi.name}</h4>
                  <Badge 
                    variant={nadi.status === 'Open' ? 'default' : nadi.status === 'Maintenance' ? 'destructive' : 'secondary'}
                  >
                    {nadi.status}
                  </Badge>
                </div>
                <div className="grid grid-cols-2 gap-2 text-sm text-muted-foreground">
                  <div>DUSP: <span className="font-medium">{nadi.dusp}</span></div>
                  <div>Phase: <span className="font-medium">{nadi.phase}</span></div>
                  <div>Parliament: <span className="font-medium">{nadi.parliament}</span></div>
                  <div>District: <span className="font-medium">{nadi.district}</span></div>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MapPin className="h-5 w-5" />
              NADI by Area
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {areaDistribution.map((area) => (
              <div key={area.area} className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="font-medium">{area.area}</span>
                  <span className="text-muted-foreground">
                    {area.count} centers ({area.percentage}%)
                  </span>
                </div>
                <Progress value={area.percentage} className="h-2" />
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* Maintenance and Officer Management */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <AlertTriangle className="h-5 w-5" />
              Maintenance Breakdown by State
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {maintenanceByState.map((item) => (
              <div key={item.state} className="flex justify-between items-center">
                <span className="font-medium">{item.state}</span>
                <Badge variant="outline" className="bg-orange-50 text-orange-600">
                  {item.count} open dockets
                </Badge>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <UserCheck className="h-5 w-5" />
              NADI Officer Breakdown
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {officerStats.map((officer) => (
              <div key={officer.role} className="space-y-2">
                <div className="flex justify-between">
                  <span className="font-medium">{officer.role}</span>
                  <span className="text-sm text-muted-foreground">
                    {officer.occupied}/{officer.total}
                  </span>
                </div>
                <Progress value={(officer.occupied / officer.total) * 100} className="h-2" />
                <div className="flex justify-between text-sm">
                  <span className="text-green-600">Occupied: {officer.occupied}</span>
                  <span className="text-red-600">Vacancies: {officer.vacancy}</span>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* Officer Demographics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Officers by Gender</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex justify-between items-center">
              <span>Male</span>
              <div className="flex items-center gap-2">
                <Progress value={58} className="w-24 h-2" />
                <span className="text-sm font-medium">58%</span>
              </div>
            </div>
            <div className="flex justify-between items-center">
              <span>Female</span>
              <div className="flex items-center gap-2">
                <Progress value={42} className="w-24 h-2" />
                <span className="text-sm font-medium">42%</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Officers by Race</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {[
              { race: "Malay", percentage: 65 },
              { race: "Chinese", percentage: 18 },
              { race: "Indian", percentage: 12 },
              { race: "Others", percentage: 5 }
            ].map((item) => (
              <div key={item.race} className="flex justify-between items-center">
                <span>{item.race}</span>
                <div className="flex items-center gap-2">
                  <Progress value={item.percentage} className="w-16 h-2" />
                  <span className="text-sm font-medium">{item.percentage}%</span>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Top States by Officers</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {[
              { state: "Selangor", count: 185 },
              { state: "Kuala Lumpur", count: 142 },
              { state: "Johor", count: 128 },
              { state: "Penang", count: 98 },
              { state: "Perak", count: 87 }
            ].map((item) => (
              <div key={item.state} className="flex justify-between items-center">
                <span>{item.state}</span>
                <Badge variant="secondary">{item.count}</Badge>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}