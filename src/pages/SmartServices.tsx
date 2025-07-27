import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { 
  Cpu, 
  Users, 
  TrendingUp, 
  Building2, 
  User, 
  MapPin, 
  Search,
  Filter,
  Download,
  RefreshCw,
  ArrowUp,
  BarChart3,
  Activity,
  Sparkles,
  Eye
} from "lucide-react"
import { useState } from "react"
import { DateRangePicker } from "@/components/DateRangePicker"
import { PDFDownloadButton } from "@/components/PDFDownloadButton"
import { DateRange } from "@/components/DateRangePicker"
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip } from "recharts"

const pillars = [
  "NADi x Entrepreneur",
  "NADi x Lifelong Learning", 
  "NADi x Wellbeing",
  "NADi x Awareness",
  "NADi x Government"
]

const pillarData = {
  "NADi x Entrepreneur": { participants: 850, total: 7000, percentage: 12.1 },
  "NADi x Lifelong Learning": { participants: 920, total: 8200, percentage: 11.2 },
  "NADi x Wellbeing": { participants: 720, total: 6800, percentage: 10.6 },
  "NADi x Awareness": { participants: 1100, total: 7300, percentage: 15.1 },
  "NADi x Government": { participants: 390, total: 4200, percentage: 9.3 }
}

const participantStats = {
  total: 33500,
  participants: 3980,
  percentage: 12
}

const programData = {
  "NADi x Entrepreneur": [
    { name: "Program 1", participants: 250, icon: "💼" },
    { name: "Program 2", participants: 180, icon: "🚀" },
    { name: "Program 3", participants: 220, icon: "💡" },
    { name: "Program 4", participants: 200, icon: "📈" }
  ],
  "NADi x Lifelong Learning": [
    { name: "Program 1", participants: 300, icon: "📚" },
    { name: "Program 2", participants: 250, icon: "🎓" },
    { name: "Program 3", participants: 200, icon: "🧠" },
    { name: "Program 4", participants: 170, icon: "💻" }
  ],
  "NADi x Wellbeing": [
    { name: "Program 1", participants: 200, icon: "🏃" },
    { name: "Program 2", participants: 180, icon: "🧘" },
    { name: "Program 3", participants: 160, icon: "💚" },
    { name: "Program 4", participants: 180, icon: "🌱" }
  ],
  "NADi x Awareness": [
    { name: "Program 1", participants: 350, icon: "📢" },
    { name: "Program 2", participants: 280, icon: "🎯" },
    { name: "Program 3", participants: 250, icon: "📊" },
    { name: "Program 4", participants: 220, icon: "🔍" }
  ],
  "NADi x Government": [
    { name: "Program 1", participants: 120, icon: "🏛️" },
    { name: "Program 2", participants: 100, icon: "📋" },
    { name: "Program 3", participants: 90, icon: "⚖️" },
    { name: "Program 4", participants: 80, icon: "🗳️" }
  ]
}

const participantCategories = [
  { category: "Children", count: 1200, percentage: 30, color: "bg-blue-500" },
  { category: "Youth", count: 1000, percentage: 25, color: "bg-green-500" },
  { category: "Students", count: 800, percentage: 20, color: "bg-purple-500" },
  { category: "Women", count: 680, percentage: 17, color: "bg-pink-500" },
  { category: "OKU", count: 300, percentage: 8, color: "bg-orange-500" }
]

const demographicsData = [
  { category: "Gender", data: [
    { label: "Female", count: 2200, percentage: 55 },
    { label: "Male", count: 1780, percentage: 45 }
  ]},
  { category: "Race", data: [
    { label: "Malay", count: 2388, percentage: 60 },
    { label: "Chinese", count: 796, percentage: 20 },
    { label: "Indian", count: 517, percentage: 13 }
  ]},
  { category: "Age Group", data: [
    { label: "12-17", count: 796, percentage: 20 },
    { label: "18-25", count: 1194, percentage: 30 },
    { label: "26-35", count: 955, percentage: 24 },
    { label: "36-50", count: 716, percentage: 18 },
    { label: "50+", count: 319, percentage: 8 }
  ]}
]

const duspData = [
  { name: "TM", count: 1194, logo: "🟦" },
  { name: "MAXIS", count: 955, logo: "🟩" },
  { name: "CELCOMDIGI", count: 796, logo: "🟨" },
  { name: "REDTONE", count: 637, logo: "🟥" },
  { name: "Others", count: 398, logo: "⚫" }
]

const stateData = [
  { state: "Selangor", count: 598, percentage: 15 },
  { state: "Kuala Lumpur", count: 478, percentage: 12 },
  { state: "Johor", count: 438, percentage: 11 },
  { state: "Penang", count: 398, percentage: 10 },
  { state: "Perak", count: 358, percentage: 9 }
]

export default function SmartServices() {
  const [selectedMonth, setSelectedMonth] = useState("all")
  const [selectedYear, setSelectedYear] = useState("all")
  const [selectedPillar, setSelectedPillar] = useState("NADi x Entrepreneur")
  const [selectedProgram, setSelectedProgram] = useState("all")
  const [programYear, setProgramYear] = useState("all")
  const [stateSearchTerm, setStateSearchTerm] = useState("")
  const [raceSearchTerm, setRaceSearchTerm] = useState("")
  const [dateRange, setDateRange] = useState<DateRange | undefined>()

  // Filter functions
  const filteredStateData = stateData.filter(state => 
    state.state.toLowerCase().includes(stateSearchTerm.toLowerCase())
  )
  
  const filteredRaceData = demographicsData.find(d => d.category === "Race")?.data.filter(race =>
    race.label.toLowerCase().includes(raceSearchTerm.toLowerCase())
  ) || []

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Smart Services Dashboard</h1>
          <p className="text-muted-foreground">
            Monitor participation and engagement in smart services programs
          </p>
        </div>
        <PDFDownloadButton filename="smart-services-dashboard" />
      </div>

      {/* Date Range Filter */}
      <div className="flex items-center gap-4">
        <DateRangePicker
          value={dateRange}
          onChange={setDateRange}
          placeholder="Filter by date range"
        />
      </div>

      {/* Tabs Section */}
      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="program">By Program</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          {/* Key Participation Stats */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="border-0 shadow-md hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Total Participants</p>
                    <p className="text-3xl font-bold text-blue-600">{participantStats.participants.toLocaleString()}</p>
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button variant="outline" size="sm" className="mt-2">
                          Click More
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="max-w-2xl">
                        <DialogHeader>
                          <DialogTitle>Participants by Pillars</DialogTitle>
                        </DialogHeader>
                        <div className="space-y-4">
                          {pillars.map((pillar, index) => (
                            <div key={index} className="p-4 border rounded-lg">
                              <div className="flex justify-between items-center mb-2">
                                <h4 className="font-semibold">{pillar}</h4>
                                <Badge variant="secondary">{pillarData[pillar].percentage}%</Badge>
                              </div>
                              <div className="flex justify-between items-center mb-2">
                                <span className="text-sm text-gray-600">Participants</span>
                                <span className="font-bold text-blue-600">{pillarData[pillar].participants.toLocaleString()}</span>
                              </div>
                              <div className="flex justify-between items-center mb-2">
                                 <span className="text-sm text-gray-600">Total KPI</span>
                                 <span className="font-bold text-gray-600">{pillarData[pillar].total.toLocaleString()}</span>
                              </div>
                              <Progress value={pillarData[pillar].percentage} className="h-2" />
                            </div>
                          ))}
                        </div>
                      </DialogContent>
                    </Dialog>
                  </div>
                  <div className="p-3 bg-blue-100 rounded-xl">
                    <Users className="h-6 w-6 text-blue-600" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-md hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Participation Rate</p>
                    <p className="text-3xl font-bold text-green-600">{participantStats.percentage}%</p>
                  </div>
                  <div className="p-3 bg-green-100 rounded-xl">
                    <TrendingUp className="h-6 w-6 text-green-600" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-md hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Total KPI</p>
                    <p className="text-3xl font-bold text-purple-600">{participantStats.total.toLocaleString()}</p>
                  </div>
                  <div className="p-3 bg-purple-100 rounded-xl">
                    <User className="h-6 w-6 text-purple-600" />
                  </div>
                </div>
              </CardContent>
            </Card>

          </div>

          {/* Participant Categories */}
          <Card className="border-0 shadow-md">
            <CardHeader>
              <div className="flex justify-between items-center">
                <CardTitle className="flex items-center gap-2">
                  <Users className="h-5 w-5 text-blue-600" />
                  Participant Categories
                </CardTitle>
                <select 
                  value={selectedPillar} 
                  onChange={(e) => setSelectedPillar(e.target.value)}
                  className="px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  {pillars.map((pillar) => (
                    <option key={pillar} value={pillar}>{pillar}</option>
                  ))}
                </select>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              {participantCategories.map((category, index) => (
                <div key={index} className="p-4 border rounded-lg hover:shadow-sm transition-shadow">
                  <div className="flex justify-between items-center mb-2">
                    <div className="flex items-center gap-3">
                      <div className={`w-3 h-3 rounded-full ${category.color}`}></div>
                      <h4 className="font-medium text-sm">{category.category}</h4>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-lg font-bold text-blue-600">
                        {category.count.toLocaleString()}
                      </span>
                      <Badge variant="secondary" className="text-xs">
                        {category.percentage}%
                      </Badge>
                    </div>
                  </div>
                  <Progress value={category.percentage} className="h-2" />
                </div>
              ))}
            </CardContent>
          </Card>




        </TabsContent>

        <TabsContent value="program" className="space-y-6">
          {/* Filter section moved below the title */}
          <Card className="border-0 shadow-md">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BarChart3 className="h-5 w-5 text-blue-600" />
                Programs - NADi x Entrepreneur
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2">
                    <Filter className="h-4 w-4 text-gray-600" />
                    <span className="text-sm font-medium text-gray-700">Filter by (NADi x Entrepreneur):</span>
                  </div>
                  <select 
                    value={selectedPillar} 
                    onChange={(e) => setSelectedPillar(e.target.value)}
                    className="px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    {pillars.map((pillar) => (
                      <option key={pillar} value={pillar}>{pillar}</option>
                    ))}
                  </select>
                  <select 
                    value={programYear} 
                    onChange={(e) => setProgramYear(e.target.value)}
                    className="px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="all">All Years</option>
                    <option value="2024">2024</option>
                    <option value="2023">2023</option>
                    <option value="2022">2022</option>
                    <option value="2021">2021</option>
                  </select>
                  <select 
                    value={selectedProgram} 
                    onChange={(e) => setSelectedProgram(e.target.value)}
                    className="px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="all">All Programs</option>
                    {programData["NADi x Entrepreneur"]?.map((program, index) => (
                      <option key={index} value={program.name}>{program.name}</option>
                    ))}
                  </select>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Program Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {programData["NADi x Entrepreneur"]?.map((program, index) => (
              <div key={index} className="text-center p-6 border rounded-lg hover:shadow-sm transition-shadow">
                <div className="text-4xl mb-4">{program.icon}</div>
                <div>
                  <p className="font-semibold text-lg mb-2">{program.name}</p>
                  <p className="text-3xl font-bold text-blue-600">
                    {program.participants.toLocaleString()}
                  </p>
                  <p className="text-sm text-gray-500">participants</p>
                </div>
              </div>
            ))}
          </div>

          {/* Demographics for Program Tab */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {demographicsData.map((demographic, index) => (
              <Card key={index} className="border-0 shadow-md">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <User className="h-5 w-5 text-blue-600" />
                    By {demographic.category}
                  </CardTitle>
                  {demographic.category === "Race" && (
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                      <Input
                        placeholder="Search races..."
                        value={raceSearchTerm}
                        onChange={(e) => setRaceSearchTerm(e.target.value)}
                        className="pl-10"
                      />
                    </div>
                  )}
                </CardHeader>
                <CardContent className="space-y-4">
                  {(demographic.category === "Race" ? filteredRaceData : demographic.data).map((item, itemIndex) => (
                    <div key={itemIndex} className="flex justify-between items-center p-3 rounded-lg hover:bg-gray-50 transition-all">
                      <div className="flex items-center gap-3">
                        <div className="w-2 h-2 rounded-full bg-blue-600"></div>
                        <Badge variant="outline" className="text-blue-600 border-blue-200">
                          {item.label}
                        </Badge>
                        <span className="text-sm text-gray-600 font-medium">
                          {item.count.toLocaleString()}
                        </span>
                      </div>
                      <div className="text-lg font-bold text-blue-600">{item.percentage}%</div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            ))}
          </div>

          {/* State Distribution for Program Tab - Updated to Bar Chart */}
          <Card className="border-0 shadow-md">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MapPin className="h-5 w-5 text-blue-600" />
                Participation by State
              </CardTitle>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search states..."
                  value={stateSearchTerm}
                  onChange={(e) => setStateSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={400}>
                <BarChart data={filteredStateData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="state" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="count" fill="#3b82f6" name="Participants" />
                </BarChart>
              </ResponsiveContainer>
              {stateSearchTerm && (
                <div className="mt-4">
                  <h4 className="font-medium mb-2">Search Results:</h4>
                  <div className="grid grid-cols-1 gap-2">
                    {filteredStateData.slice(0, 5).map((state, index) => (
                      <div key={index} className="flex justify-between items-center p-2 bg-muted rounded">
                        <span>{state.state}</span>
                        <div className="text-sm text-muted-foreground">
                          {state.count} participants ({state.percentage}%)
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}