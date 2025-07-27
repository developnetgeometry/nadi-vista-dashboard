import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer } from "recharts"
import { Users, TrendingUp, MapPin, Building2, User, UserCheck, Calendar, Filter, Search } from "lucide-react"
import { useState } from "react"
import { DateRangePicker } from "@/components/DateRangePicker"
import { PDFDownloadButton } from "@/components/PDFDownloadButton"
import { DateRange } from "@/components/DateRangePicker"

const membershipStats = [
  { title: "Total NADI Membership", count: "2,150,217", icon: Users }
]

const demographicsData = [
  { category: "Gender", data: [
    { label: "Male", count: 1200000, percentage: 56 },
    { label: "Female", count: 950217, percentage: 44 }
  ]},
  { category: "Age Group", data: [
    { label: "18-25", count: 450000, percentage: 21 },
    { label: "26-35", count: 680000, percentage: 32 },
    { label: "36-45", count: 520000, percentage: 24 },
    { label: "46-60", count: 380000, percentage: 18 },
    { label: "60+", count: 120217, percentage: 5 }
  ]},
  { category: "Race", data: [
    { label: "Malay", count: 1290000, percentage: 60 },
    { label: "Chinese", count: 430000, percentage: 20 },
    { label: "Indian", count: 430217, percentage: 20 }
  ]}
]

const areaData = [
  { area: "Urban", count: 860000, percentage: 40, color: "bg-blue-500", tpData: [
    { name: "Nera", count: 344000, percentage: 40 },
    { name: "MSD", count: 516000, percentage: 60 }
  ]},
  { area: "Suburban", count: 650000, percentage: 30, color: "bg-green-500", tpData: [
    { name: "Nera", count: 260000, percentage: 40 },
    { name: "MSD", count: 390000, percentage: 60 }
  ]},
  { area: "Rural", count: 430000, percentage: 20, color: "bg-orange-500", tpData: [
    { name: "Nera", count: 172000, percentage: 40 },
    { name: "MSD", count: 258000, percentage: 60 }
  ]},
  { area: "Remote", count: 210217, percentage: 10, color: "bg-red-500", tpData: [
    { name: "Nera", count: 84087, percentage: 40 },
    { name: "MSD", count: 126130, percentage: 60 }
  ]}
]

const duspData = [
  { name: "TM", count: 540000, logo: "🟦" },
  { name: "MAXIS", count: 96634, logo: "🟩" },
  { name: "CELCOMDIGI", count: 390000, logo: "🟨" },
  { name: "REDTONE", count: 340217, logo: "🟥" }
]

const tpData = [
  { name: "Citaglobal", count: 18200, logo: "🟡", sites: 120 },
  { name: "Nera", count: 15420, logo: "🔵", sites: 85 },
  { name: "Samudera", count: 14600, logo: "🟣", sites: 95 },
  { name: "ETDmakmur", count: 13400, logo: "🔶", sites: 75 },
  { name: "Afintra", count: 12350, logo: "🟢", sites: 68 },
  { name: "Sprimtz design", count: 11250, logo: "🟠", sites: 60 },
  { name: "Perwira", count: 9800, logo: "🔴", sites: 52 }
].sort((a, b) => b.count - a.count)

const tpChartData = tpData.map(tp => ({
  name: tp.name,
  value: tp.count
}))

const okuData = [
  { label: "Non-OKU", count: 1978200, percentage: 92 },
  { label: "OKU", count: 172017, percentage: 8 }
]

const occupationData = [
  { occupation: "Student", count: 602060, percentage: 28 },
  { occupation: "Self-employed", count: 473047, percentage: 22 },
  { occupation: "Private Sector", count: 430043, percentage: 20 },
  { occupation: "Government", count: 322532, percentage: 15 },
  { occupation: "Unemployed", count: 322535, percentage: 15 }
]

export default function MCMCMembership() {
  const [raceSearch, setRaceSearch] = useState("")
  const [occupationSearch, setOccupationSearch] = useState("")
  const [selectedDUSP, setSelectedDUSP] = useState("all")
  const [dateRange, setDateRange] = useState<DateRange | undefined>()

  // Calculate total TP and sites
  const getTotalTP = () => {
    if (selectedDUSP === "all") {
      return tpData.length
    }
    // For MCMC, each DUSP has associated TPs
    return Math.floor(tpData.length / 3) // Simplified calculation
  }

  const getTotalSites = () => {
    if (selectedDUSP === "all") {
      return tpData.reduce((total, tp) => total + tp.sites, 0)
    }
    // For MCMC, calculate sites based on selected DUSP
    return Math.floor(tpData.reduce((total, tp) => total + tp.sites, 0) / 3) // Simplified calculation
  }

  // Filter functions
  const filteredRaceData = demographicsData.find(d => d.category === "Race")?.data.filter(item =>
    item.label.toLowerCase().includes(raceSearch.toLowerCase())
  ) || []

  const filteredOccupationData = occupationData.filter(item =>
    item.occupation.toLowerCase().includes(occupationSearch.toLowerCase())
  )

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">MCMC Membership Dashboard</h1>
          <p className="text-muted-foreground">
            Monitor membership statistics and demographics across NADI centers
          </p>
        </div>
        <PDFDownloadButton filename="mcmc-membership-dashboard" />
      </div>

      {/* Date Range Filter */}
      <div className="flex items-center gap-4">
        <DateRangePicker
          value={dateRange}
          onChange={setDateRange}
          placeholder="Filter by date range"
        />
      </div>

      {/* Tabs */}
      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="dusp-tp">Membership by DUSP and TP</TabsTrigger>
          <TabsTrigger value="demographic">Membership Demographic</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          {/* Key Membership Stats */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {membershipStats.map((stat) => (
              <Card key={stat.title}>
                <CardContent className="p-6">
                  <div className="flex items-center space-x-4">
                    <div className="p-3 bg-primary/10 rounded-lg">
                      <stat.icon className="h-8 w-8 text-primary" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">{stat.title}</p>
                      <p className="text-3xl font-bold">{stat.count}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* New Membership by Area */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MapPin className="h-5 w-5" />
                New Membership by Area
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {areaData.map((area) => (
                <div key={area.area} className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="font-medium">{area.area}</span>
                    <span className="text-muted-foreground">
                      {area.count.toLocaleString()} ({area.percentage}%)
                    </span>
                  </div>
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <div className="cursor-pointer">
                          <Progress value={area.percentage} className="h-2" />
                        </div>
                      </TooltipTrigger>
                      <TooltipContent className="p-4">
                        <div className="space-y-2">
                          <p className="font-semibold">{area.area} Area Details</p>
                          {area.tpData.map((tp) => (
                            <div key={tp.name} className="flex justify-between items-center">
                              <span>{tp.name}:</span>
                              <span className="ml-2">{tp.count.toLocaleString()} ({tp.percentage}%)</span>
                            </div>
                          ))}
                        </div>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* New Membership by DUSP - KEEP FOR MCMC */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Building2 className="h-5 w-5" />
                New Membership by DUSP
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {duspData.map((dusp) => (
                  <Card key={dusp.name} className="text-center">
                    <CardContent className="p-4">
                      <div className="text-2xl mb-2">{dusp.logo}</div>
                      <p className="font-semibold text-sm">{dusp.name}</p>
                      <p className="text-lg font-bold text-primary">{dusp.count.toLocaleString()}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="dusp-tp" className="space-y-6">
          {/* Membership by TP */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="h-5 w-5" />
                Membership by TP
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4">
                {tpData.map((tp) => (
                  <Card key={tp.name} className="text-center">
                    <CardContent className="p-4">
                      <div className="text-2xl mb-2">{tp.logo}</div>
                      <p className="font-semibold text-sm">{tp.name}</p>
                      <p className="text-lg font-bold text-primary">{tp.count.toLocaleString()}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="demographic" className="space-y-6">
          {/* DUSP Filter for Demographic Tab */}
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <Filter className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm font-medium">Filter by DUSP:</span>
                </div>
                <Select value={selectedDUSP} onValueChange={setSelectedDUSP}>
                  <SelectTrigger className="w-40">
                    <Building2 className="h-4 w-4 mr-2" />
                    <SelectValue placeholder="Select DUSP" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All DUSPs</SelectItem>
                    <SelectItem value="TM">TM</SelectItem>
                    <SelectItem value="MAXIS">MAXIS</SelectItem>
                    <SelectItem value="CELCOMDIGI">CELCOMDIGI</SelectItem>
                  </SelectContent>
                </Select>
                <div className="text-sm text-muted-foreground">
                  Total TP: <span className="font-medium">{getTotalTP()}</span>
                </div>
                <div className="text-sm text-muted-foreground">
                  Total Sites: <span className="font-medium">{getTotalSites()}</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Demographics Breakdown - Age Group Only */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Age Group */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <User className="h-5 w-5" />
                  By Age Group
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {demographicsData.find(d => d.category === "Age Group")?.data.map((item) => (
                  <div key={item.label} className="flex justify-between items-center">
                    <div className="flex items-center gap-2">
                      <Badge variant="outline">{item.label}</Badge>
                      <span className="text-sm text-muted-foreground">
                        {item.count.toLocaleString()}
                      </span>
                    </div>
                    <div className="text-sm font-medium">{item.percentage}%</div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* OKU and Occupation */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <User className="h-5 w-5" />
                  By OKU Status
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {okuData.map((item) => (
                  <div key={item.label} className="flex justify-between items-center">
                    <div className="flex items-center gap-2">
                      <Badge variant="outline">{item.label}</Badge>
                      <span className="text-sm text-muted-foreground">
                        {item.count.toLocaleString()}
                      </span>
                    </div>
                    <div className="text-sm font-medium">{item.percentage}%</div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User className="h-5 w-5" />
                By Occupation
              </CardTitle>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search occupation..."
                  value={occupationSearch}
                  onChange={(e) => setOccupationSearch(e.target.value)}
                  className="pl-10"
                />
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              {filteredOccupationData.map((item) => (
                <div key={item.occupation} className="flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    <Badge variant="outline">{item.occupation}</Badge>
                    <span className="text-sm text-muted-foreground">
                      {item.count.toLocaleString()}
                    </span>
                  </div>
                  <div className="text-sm font-medium">{item.percentage}%</div>
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
