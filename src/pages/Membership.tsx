import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { DateRangePicker } from "@/components/ui/date-range-picker"
import { PDFDownload } from "@/components/ui/pdf-download"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"
import { Users, TrendingUp, MapPin, Building2, User, UserCheck, Calendar, Filter, Search } from "lucide-react"
import { useState } from "react"
import { DateRange } from "react-day-picker"

const membershipStats = [
  { title: "Total NADI Membership", count: "2,150,217", icon: Users },
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
    { label: "Indian", count: 280000, percentage: 13 }
  ]}
]

const areaData = [
  { area: "Urban", count: 860000, percentage: 40, color: "bg-blue-500" },
  { area: "Suburban", count: 650000, percentage: 30, color: "bg-green-500" },
  { area: "Rural", count: 430000, percentage: 20, color: "bg-orange-500" },
  { area: "Remote", count: 210217, percentage: 10, color: "bg-red-500" }
]

const duspData = [
  { name: "TM", count: 540000, logo: "🟦" },
  { name: "MAXIS", count: 96634, logo: "🟩" },
  { name: "CELCOMDIGI", count: 390000, logo: "🟨" },
  { name: "REDTONE", count: 340217, logo: "🟥" }
]

// Sort TP data from highest to lowest
const tpData = [
  { name: "Citaglobal", count: 18200, logo: "🟡", sites: 150 },
  { name: "Nera", count: 15420, logo: "🔵", sites: 120 },
  { name: "Samudera", count: 14600, logo: "🟣", sites: 110 },
  { name: "ETDmakmur", count: 13400, logo: "🔶", sites: 100 },
  { name: "Afintra", count: 12350, logo: "🟢", sites: 95 },
  { name: "Sprimtz design", count: 11250, logo: "🟠", sites: 80 },
  { name: "Perwira", count: 9800, logo: "🔴", sites: 60 },
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

export default function Membership() {
  const [raceSearch, setRaceSearch] = useState("")
  const [occupationSearch, setOccupationSearch] = useState("")
  const [selectedTP, setSelectedTP] = useState("all")
  const [dateRange, setDateRange] = useState<DateRange | undefined>()

  // Filter functions
  const filteredRaceData = demographicsData.find(d => d.category === "Race")?.data.filter(item => 
    item.label.toLowerCase().includes(raceSearch.toLowerCase())
  ) || []

  const filteredOccupationData = occupationData.filter(item => 
    item.occupation.toLowerCase().includes(occupationSearch.toLowerCase())
  )

  // Get total sites for selected TP
  const getTotalSites = () => {
    if (selectedTP === "all") {
      return tpData.reduce((sum, tp) => sum + tp.sites, 0)
    }
    const selectedTpData = tpData.find(tp => tp.name === selectedTP)
    return selectedTpData ? selectedTpData.sites : 0
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Membership Dashboard</h1>
          <p className="text-muted-foreground">
            Monitor membership statistics and demographics across NADI centers
          </p>
        </div>
        <PDFDownload filename="membership-dashboard" />
      </div>

      {/* Date Range Filter */}
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center gap-4 flex-wrap">
            <div className="flex items-center gap-2">
              <Filter className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm font-medium">Filter by date range:</span>
            </div>
            <DateRangePicker
              dateRange={dateRange}
              onDateRangeChange={setDateRange}
              placeholder="Select date range"
            />
          </div>
        </CardContent>
      </Card>

      {/* Tabs */}
      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="dusp-tp">Membership by DUSP and TP</TabsTrigger>
          <TabsTrigger value="demographic">Membership Demographic</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          {/* Key Membership Stats */}
          <div className="grid grid-cols-1 md:grid-cols-1 gap-6">
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
                  <Progress value={area.percentage} className="h-2" />
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="dusp-tp" className="space-y-6">
          {/* New Membership by DUSP */}
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
                      <div className="text-3xl mb-2">{dusp.logo}</div>
                      <p className="font-semibold">{dusp.name}</p>
                      <p className="text-2xl font-bold text-primary">{dusp.count.toLocaleString()}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>

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
                      <p className="text-xs text-muted-foreground">{tp.sites} sites</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="demographic" className="space-y-6">
          {/* TP Filter for Demographic Tab */}
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <Filter className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm font-medium">Filter by TP:</span>
                </div>
                <Select value={selectedTP} onValueChange={setSelectedTP}>
                  <SelectTrigger className="w-40">
                    <Building2 className="h-4 w-4 mr-2" />
                    <SelectValue placeholder="Select TP" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All TPs</SelectItem>
                    {tpData.map((tp) => (
                      <SelectItem key={tp.name} value={tp.name}>{tp.name}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Badge variant="outline" className="text-primary border-primary">
                  Total Sites: {getTotalSites()}
                </Badge>
              </div>
            </CardContent>
          </Card>

          {/* Demographics Breakdown */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Gender and Age Group */}
            {demographicsData.filter(d => d.category !== "Race").map((demographic) => (
              <Card key={demographic.category}>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <User className="h-5 w-5" />
                    By {demographic.category}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {demographic.data.map((item) => (
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
            ))}

            {/* Race with Search */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <User className="h-5 w-5" />
                  By Race
                </CardTitle>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search race..."
                    value={raceSearch}
                    onChange={(e) => setRaceSearch(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                {filteredRaceData.map((item) => (
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

          {/* OKU and Occupation */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}