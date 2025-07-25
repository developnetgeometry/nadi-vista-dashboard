import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { NADIInteractiveMap } from "@/components/NADIInteractiveMap"
import { NADIDistributionMap } from "@/components/NADIDistributionMap"
import { Settings, Building2, Users, MapPin, UserCheck, AlertTriangle, Info, Download, Filter, Search } from "lucide-react"
import { useState, useMemo } from "react"

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

// Changed from "Total NADI by TP" to "Total NADI by Region"
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

const officerStats = [
  { role: "Manager", total: 550, occupied: 520, vacancy: 30 },
  { role: "Assistant Manager", total: 549, occupied: 489, vacancy: 60 }
]

const nadiDetails = [
  {
    name: "NADI Bukit Jalil",
    region: "Central Region",
    status: "Open",
    parliament: "Bandar Tun Razak",
    district: "Kuala Lumpur",
    phase: "Phase 2"
  },
  {
    name: "NADI Petaling Jaya",
    region: "Central Region", 
    status: "Open",
    parliament: "Petaling Jaya",
    district: "Petaling",
    phase: "Phase 1"
  },
  {
    name: "NADI Johor Bahru",
    region: "Southern Region",
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
    region: "Central Region",
    state: "Selangor",
    district: "Petaling",
    parliament: "Shah Alam",
    dun: "Kota Anggerik",
    reason: "Infrastructure maintenance"
  },
  {
    nadiName: "NADI Ipoh",
    region: "Northern Region",
    state: "Perak",
    district: "Kinta",
    parliament: "Ipoh Barat",
    dun: "Canning",
    reason: "Equipment upgrade"
  },
  {
    nadiName: "NADI Kota Kinabalu",
    region: "East Malaysia",
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

export default function TPOperation() {
  const [closedDialogOpen, setClosedDialogOpen] = useState(false)
  const [maintenanceDialogOpen, setMaintenanceDialogOpen] = useState(false)
  const [regionDialogOpen, setRegionDialogOpen] = useState(false)
  const [selectedRegion, setSelectedRegion] = useState<string>("")
  
  // Filter states - unified filter
  const [nadiAreaMonth, setNadiAreaMonth] = useState<string>("all")
  const [nadiAreaYear, setNadiAreaYear] = useState<string>("all")
  const [officerFilterMonth, setOfficerFilterMonth] = useState<string>("all")
  const [officerFilterYear, setOfficerFilterYear] = useState<string>("all")
  
  // Search states
  const [genderSearch, setGenderSearch] = useState<string>("")
  const [raceSearch, setRaceSearch] = useState<string>("")
  const [stateSearch, setStateSearch] = useState<string>("")

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

  const FilterComponent = ({ 
    month, 
    setMonth, 
    year, 
    setYear, 
    title 
  }: { 
    month: string; 
    setMonth: (value: string) => void; 
    year: string; 
    setYear: (value: string) => void; 
    title: string;
  }) => (
    <div className="flex items-center gap-2 mb-4">
      <Filter className="h-4 w-4" />
      <span className="text-sm font-medium">{title}:</span>
      <Select value={month} onValueChange={setMonth}>
        <SelectTrigger className="w-32">
          <SelectValue placeholder="Month" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All Months</SelectItem>
          <SelectItem value="01">January</SelectItem>
          <SelectItem value="02">February</SelectItem>
          <SelectItem value="03">March</SelectItem>
          <SelectItem value="04">April</SelectItem>
          <SelectItem value="05">May</SelectItem>
          <SelectItem value="06">June</SelectItem>
          <SelectItem value="07">July</SelectItem>
          <SelectItem value="08">August</SelectItem>
          <SelectItem value="09">September</SelectItem>
          <SelectItem value="10">October</SelectItem>
          <SelectItem value="11">November</SelectItem>
          <SelectItem value="12">December</SelectItem>
        </SelectContent>
      </Select>
      <Select value={year} onValueChange={setYear}>
        <SelectTrigger className="w-24">
          <SelectValue placeholder="Year" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All Years</SelectItem>
          <SelectItem value="2024">2024</SelectItem>
          <SelectItem value="2023">2023</SelectItem>
          <SelectItem value="2022">2022</SelectItem>
        </SelectContent>
      </Select>
    </div>
  )

  const SearchComponent = ({ 
    search, 
    setSearch, 
    placeholder 
  }: { 
    search: string; 
    setSearch: (value: string) => void; 
    placeholder: string;
  }) => (
    <div className="relative mb-4">
      <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
      <Input
        placeholder={placeholder}
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="pl-8"
      />
    </div>
  )

  // Filter data based on search
  const filteredGenderData = useMemo(() => {
    const data = [
      { gender: "Male", count: 585, percentage: 58 },
      { gender: "Female", count: 424, percentage: 42 }
    ]
    return data.filter(item => 
      item.gender.toLowerCase().includes(genderSearch.toLowerCase())
    )
  }, [genderSearch])

  const filteredRaceData = useMemo(() => {
    const data = [
      { race: "Malay", count: 656, percentage: 65 },
      { race: "Chinese", count: 182, percentage: 18 },
      { race: "Indian", count: 121, percentage: 12 },
      { race: "Others", count: 50, percentage: 5 }
    ]
    return data.filter(item => 
      item.race.toLowerCase().includes(raceSearch.toLowerCase())
    )
  }, [raceSearch])

  const filteredStateData = useMemo(() => {
    const data = [
      { state: "Selangor", count: 180 },
      { state: "Kuala Lumpur", count: 85 },
      { state: "Johor", count: 150 },
      { state: "Penang", count: 75 },
      { state: "Perak", count: 120 }
    ]
    return data.filter(item => 
      item.state.toLowerCase().includes(stateSearch.toLowerCase())
    )
  }, [stateSearch])

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

      <Tabs defaultValue="operation" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="operation">Operation</TabsTrigger>
          <TabsTrigger value="officer">NADI Officer</TabsTrigger>
          <TabsTrigger value="maps">Interactive Maps</TabsTrigger>
        </TabsList>

        <TabsContent value="operation" className="space-y-6 mt-6">
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
                                  <TableHead>Region</TableHead>
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
                                    <TableCell>{closure.region}</TableCell>
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

          {/* NADI by Area */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MapPin className="h-5 w-5" />
                NADI by Area
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <FilterComponent
                month={nadiAreaMonth}
                setMonth={setNadiAreaMonth}
                year={nadiAreaYear}
                setYear={setNadiAreaYear}
                title="Filter"
              />
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

          {/* Total NADI by Region (Changed from "by TP") */}
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            {nadiByRegion.map((item) => (
              <Card 
                key={item.region}
                className="cursor-pointer hover:shadow-md transition-shadow"
                onClick={() => {
                  setSelectedRegion(item.region)
                  setRegionDialogOpen(true)
                }}
              >
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="p-2 bg-muted rounded-lg">
                        <Building2 className={`h-6 w-6 ${item.color}`} />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-muted-foreground">{item.region}</p>
                        <p className="text-2xl font-bold">{item.count}</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="officer" className="space-y-6 mt-6">
          {/* Officer Management Section */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <UserCheck className="h-5 w-5" />
                Officer Placement Status
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <FilterComponent
                month={officerFilterMonth}
                setMonth={setOfficerFilterMonth}
                year={officerFilterYear}
                setYear={setOfficerFilterYear}
                title="Filter"
              />
              {officerStats.map((officer) => (
                <div key={officer.role} className="space-y-3 p-4 border rounded-lg">
                  <div className="flex justify-between items-center">
                    <h3 className="font-semibold">{officer.role}</h3>
                    <Badge variant="outline">{officer.total} Total Positions</Badge>
                  </div>
                  <div className="grid grid-cols-3 gap-4 text-sm">
                    <div>
                      <span className="text-muted-foreground">Occupied:</span>
                      <span className="ml-2 font-medium text-green-600">{officer.occupied}</span>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Vacancy:</span>
                      <span className="ml-2 font-medium text-red-600">{officer.vacancy}</span>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Fill Rate:</span>
                      <span className="ml-2 font-medium">{((officer.occupied / officer.total) * 100).toFixed(1)}%</span>
                    </div>
                  </div>
                  <Progress value={(officer.occupied / officer.total) * 100} className="h-2" />
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Gender Distribution */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="h-5 w-5" />
                Officer Demographics - Gender
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <SearchComponent
                search={genderSearch}
                setSearch={setGenderSearch}
                placeholder="Search gender..."
              />
              {filteredGenderData.map((item) => (
                <div key={item.gender} className="flex justify-between items-center p-3 border rounded-lg">
                  <div className="flex items-center gap-2">
                    <Badge variant="outline">{item.gender}</Badge>
                    <span className="text-sm text-muted-foreground">
                      {item.count} officers
                    </span>
                  </div>
                  <div className="text-sm font-medium">{item.percentage}%</div>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Race Distribution */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="h-5 w-5" />
                Officer Demographics - Race
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <SearchComponent
                search={raceSearch}
                setSearch={setRaceSearch}
                placeholder="Search race..."
              />
              {filteredRaceData.map((item) => (
                <div key={item.race} className="flex justify-between items-center p-3 border rounded-lg">
                  <div className="flex items-center gap-2">
                    <Badge variant="outline">{item.race}</Badge>
                    <span className="text-sm text-muted-foreground">
                      {item.count} officers
                    </span>
                  </div>
                  <div className="text-sm font-medium">{item.percentage}%</div>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* State Distribution */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MapPin className="h-5 w-5" />
                Officer Distribution by State
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <SearchComponent
                search={stateSearch}
                setSearch={setStateSearch}
                placeholder="Search state..."
              />
              {filteredStateData.map((item) => (
                <div key={item.state} className="flex justify-between items-center p-3 border rounded-lg">
                  <div className="flex items-center gap-2">
                    <Badge variant="outline">{item.state}</Badge>
                    <span className="text-sm text-muted-foreground">
                      {item.count} officers
                    </span>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="maps" className="space-y-6">
          <div className="grid gap-6">
            <NADIInteractiveMap />
            <NADIDistributionMap />
          </div>
        </TabsContent>
      </Tabs>

      {/* Region Dialog - Move outside tabs */}
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