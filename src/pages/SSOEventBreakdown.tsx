import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { PieChart, MapPin, TrendingUp, BarChart3, Search, ChevronLeft, ChevronRight, Calendar, Filter } from "lucide-react"
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, LineChart, Line, PieChart as RechartsPieChart, Pie, Cell } from "recharts"
import { DateRangePicker } from "@/components/DateRangePicker"
import { PDFDownloadButton } from "@/components/PDFDownloadButton"
import { DateRange } from "@/components/DateRangePicker"

// Mock data for different pillars
const pillars = [
  { id: "entrepreneur", name: "Entrepreneur" },
  { id: "awareness", name: "Awareness" },
  { id: "lifelong-learning", name: "Lifelong Learning" }
]

// Mock data for locations by different levels
const locationData = {
  states: [
    { name: "Selangor", events: 45, attendees: 1200 },
    { name: "Kuala Lumpur", events: 42, attendees: 1150 },
    { name: "Johor", events: 38, attendees: 980 },
    { name: "Penang", events: 35, attendees: 890 },
    { name: "Perak", events: 32, attendees: 820 },
    { name: "Kedah", events: 28, attendees: 750 },
    { name: "Sabah", events: 25, attendees: 680 },
    { name: "Sarawak", events: 23, attendees: 620 },
    { name: "Negeri Sembilan", events: 20, attendees: 550 },
    { name: "Melaka", events: 18, attendees: 480 },
    { name: "Pahang", events: 15, attendees: 420 },
    { name: "Kelantan", events: 12, attendees: 350 },
    { name: "Terengganu", events: 10, attendees: 280 },
    { name: "Perlis", events: 8, attendees: 220 },
    { name: "Labuan", events: 5, attendees: 150 }
  ],
  parliament: [
    { name: "Petaling Jaya", events: 15, attendees: 450 },
    { name: "Subang", events: 14, attendees: 420 },
    { name: "Puchong", events: 13, attendees: 390 },
    { name: "Klang", events: 12, attendees: 360 },
    { name: "Shah Alam", events: 11, attendees: 330 },
    { name: "Bukit Bintang", events: 10, attendees: 300 },
    { name: "Cheras", events: 9, attendees: 270 },
    { name: "Ampang", events: 8, attendees: 240 },
    { name: "Setapak", events: 7, attendees: 210 },
    { name: "Damansara", events: 6, attendees: 180 },
    { name: "Wangsa Maju", events: 5, attendees: 150 },
    { name: "Titiwangsa", events: 4, attendees: 120 },
    { name: "Lembah Pantai", events: 3, attendees: 90 },
    { name: "Seputeh", events: 2, attendees: 60 },
    { name: "Bandar Tun Razak", events: 1, attendees: 30 }
  ],
  dun: [
    { name: "Sungai Buloh", events: 8, attendees: 240 },
    { name: "Bukit Lanjan", events: 7, attendees: 210 },
    { name: "Paya Jaras", events: 6, attendees: 180 },
    { name: "Kota Damansara", events: 5, attendees: 150 },
    { name: "Kinrara", events: 5, attendees: 150 },
    { name: "Balakong", events: 4, attendees: 120 },
    { name: "Kajang", events: 4, attendees: 120 },
    { name: "Bangi", events: 3, attendees: 90 },
    { name: "Seri Kembangan", events: 3, attendees: 90 },
    { name: "Taman Templer", events: 2, attendees: 60 },
    { name: "Bukit Gasing", events: 2, attendees: 60 },
    { name: "Kampong Tunku", events: 1, attendees: 30 },
    { name: "Bukit Antarabangsa", events: 1, attendees: 30 }
  ]
}

const mockData = {
  entrepreneur: {
    eventsByType: [
      { name: "NADI-Preneur", value: 18, color: "#8884d8" },
      { name: "Business Coaching", value: 12, color: "#82ca9d" },
      { name: "Funding Workshop", value: 8, color: "#ffc658" },
      { name: "Others", value: 4, color: "#ff7300" }
    ],
    eventsByLocation: [
      { location: "Kuala Lumpur", events: 15, attendees: 1200 },
      { location: "Penang", events: 12, attendees: 950 },
      { location: "Johor", events: 10, attendees: 800 },
      { location: "Selangor", events: 5, attendees: 250 }
    ],
    participationTrends: [
      { month: "Jan", participants: 250 },
      { month: "Feb", participants: 300 },
      { month: "Mar", participants: 280 },
      { month: "Apr", participants: 350 },
      { month: "May", participants: 400 },
      { month: "Jun", participants: 320 },
      { month: "Jul", participants: 380 },
      { month: "Aug", participants: 420 },
      { month: "Sep", participants: 390 },
      { month: "Oct", participants: 450 },
      { month: "Nov", participants: 410 },
      { month: "Dec", participants: 480 }
    ],
    registrationVsAttendance: [
      { event: "Startup Bootcamp", registered: 100, attended: 85, completionRate: 85 },
      { event: "Business Plan Workshop", registered: 80, attended: 75, completionRate: 94 },
      { event: "Investor Pitch Day", registered: 120, attended: 95, completionRate: 79 },
      { event: "Marketing Fundamentals", registered: 90, attended: 80, completionRate: 89 },
      { event: "Financial Planning", registered: 70, attended: 65, completionRate: 93 },
      { event: "E-commerce Workshop", registered: 110, attended: 98, completionRate: 89 },
      { event: "Digital Marketing", registered: 95, attended: 88, completionRate: 93 },
      { event: "Leadership Training", registered: 85, attended: 78, completionRate: 92 },
      { event: "Innovation Summit", registered: 150, attended: 135, completionRate: 90 },
      { event: "Networking Event", registered: 75, attended: 70, completionRate: 93 }
    ]
  },
  awareness: {
    eventsByType: [
      { name: "Digital Awareness", value: 12, color: "#8884d8" },
      { name: "Cyber Security", value: 8, color: "#82ca9d" },
      { name: "Tech Literacy", value: 6, color: "#ffc658" },
      { name: "Others", value: 2, color: "#ff7300" }
    ],
    eventsByLocation: [
      { location: "Kuala Lumpur", events: 10, attendees: 750 },
      { location: "Selangor", events: 8, attendees: 600 },
      { location: "Penang", events: 6, attendees: 450 },
      { location: "Johor", events: 4, attendees: 300 }
    ],
    participationTrends: [
      { month: "Jan", participants: 180 },
      { month: "Feb", participants: 220 },
      { month: "Mar", participants: 200 },
      { month: "Apr", participants: 280 },
      { month: "May", participants: 320 },
      { month: "Jun", participants: 280 },
      { month: "Jul", participants: 310 },
      { month: "Aug", participants: 340 },
      { month: "Sep", participants: 300 },
      { month: "Oct", participants: 360 },
      { month: "Nov", participants: 330 },
      { month: "Dec", participants: 380 }
    ],
    registrationVsAttendance: [
      { event: "Digital Literacy Workshop", registered: 150, attended: 120, completionRate: 80 },
      { event: "Cybersecurity Seminar", registered: 100, attended: 90, completionRate: 90 },
      { event: "Tech Awareness Campaign", registered: 80, attended: 70, completionRate: 88 },
      { event: "Digital Skills Training", registered: 200, attended: 180, completionRate: 90 },
      { event: "AI Awareness Session", registered: 120, attended: 110, completionRate: 92 },
      { event: "Data Privacy Workshop", registered: 90, attended: 85, completionRate: 94 },
      { event: "Social Media Safety", registered: 110, attended: 95, completionRate: 86 },
      { event: "Digital Citizenship", registered: 85, attended: 80, completionRate: 94 },
      { event: "Online Security Training", registered: 95, attended: 88, completionRate: 93 },
      { event: "Tech Ethics Seminar", registered: 75, attended: 70, completionRate: 93 }
    ]
  },
  "lifelong-learning": {
    eventsByType: [
      { name: "Skills Training", value: 15, color: "#8884d8" },
      { name: "Professional Development", value: 10, color: "#82ca9d" },
      { name: "Certification Programs", value: 7, color: "#ffc658" },
      { name: "Others", value: 3, color: "#ff7300" }
    ],
    eventsByLocation: [
      { location: "Kuala Lumpur", events: 12, attendees: 960 },
      { location: "Johor", events: 10, attendees: 800 },
      { location: "Penang", events: 8, attendees: 640 },
      { location: "Selangor", events: 5, attendees: 400 }
    ],
    participationTrends: [
      { month: "Jan", participants: 200 },
      { month: "Feb", participants: 250 },
      { month: "Mar", participants: 300 },
      { month: "Apr", participants: 320 },
      { month: "May", participants: 380 },
      { month: "Jun", participants: 350 },
      { month: "Jul", participants: 400 },
      { month: "Aug", participants: 430 },
      { month: "Sep", participants: 410 },
      { month: "Oct", participants: 470 },
      { month: "Nov", participants: 450 },
      { month: "Dec", participants: 500 }
    ],
    registrationVsAttendance: [
      { event: "Professional Development Course", registered: 120, attended: 100, completionRate: 83 },
      { event: "Skills Certification Program", registered: 90, attended: 85, completionRate: 94 },
      { event: "Leadership Training", registered: 110, attended: 95, completionRate: 86 },
      { event: "Communication Skills Workshop", registered: 100, attended: 90, completionRate: 90 },
      { event: "Project Management Training", registered: 130, attended: 115, completionRate: 88 },
      { event: "Time Management Course", registered: 95, attended: 88, completionRate: 93 },
      { event: "Team Building Workshop", registered: 85, attended: 80, completionRate: 94 },
      { event: "Presentation Skills Training", registered: 105, attended: 95, completionRate: 90 },
      { event: "Creative Thinking Workshop", registered: 75, attended: 70, completionRate: 93 },
      { event: "Career Development Seminar", registered: 115, attended: 105, completionRate: 91 }
    ]
  }
}

export default function SSOEventBreakdown() {
  const [selectedPillar, setSelectedPillar] = useState<string>("entrepreneur")
  const [currentData, setCurrentData] = useState<any>(null)
  const [searchLocation, setSearchLocation] = useState<string>("")
  const [searchProgram, setSearchProgram] = useState<string>("")
  const [currentPage, setCurrentPage] = useState<number>(1)
  const [selectedMonth, setSelectedMonth] = useState<string>("all")
  const [selectedYear, setSelectedYear] = useState<string>("2024")
  const [dateRange, setDateRange] = useState<DateRange | undefined>()
  const [participantTrendsYear, setParticipantTrendsYear] = useState<string>("2024")
  const [searchState, setSearchState] = useState<string>("")
  const [searchParliament, setSearchParliament] = useState<string>("")
  const [searchDun, setSearchDun] = useState<string>("")
  const itemsPerPage = 5

  const months = [
    { value: "all", label: "All Months" },
    { value: "01", label: "January" },
    { value: "02", label: "February" },
    { value: "03", label: "March" },
    { value: "04", label: "April" },
    { value: "05", label: "May" },
    { value: "06", label: "June" },
    { value: "07", label: "July" },
    { value: "08", label: "August" },
    { value: "09", label: "September" },
    { value: "10", label: "October" },
    { value: "11", label: "November" },
    { value: "12", label: "December" }
  ]

  const years = [
    { value: "2024", label: "2024" },
    { value: "2023", label: "2023" },
    { value: "2022", label: "2022" }
  ]

  useEffect(() => {
    if (selectedPillar && mockData[selectedPillar as keyof typeof mockData]) {
      setCurrentData(mockData[selectedPillar as keyof typeof mockData])
    }
  }, [selectedPillar])

  const handlePillarChange = (pillar: string) => {
    setSelectedPillar(pillar)
  }

  // Apply filters (except for participation trends)
  const applyDateFilter = (data: any[]) => {
    if (selectedMonth === "all") return data
    // For demo purposes, we'll filter by a simple logic
    return data.filter((_: any, index: number) => {
      const monthIndex = parseInt(selectedMonth) - 1
      return index === monthIndex || selectedMonth === "all"
    })
  }

  const filteredLocations = currentData?.eventsByLocation.filter((location: any) =>
    location.location.toLowerCase().includes(searchLocation.toLowerCase())
  ) || []

  const filteredPrograms = currentData?.registrationVsAttendance.filter((program: any) =>
    program.event.toLowerCase().includes(searchProgram.toLowerCase())
  ) || []

  // Apply date filter to events by type (for demo)
  const filteredEventsByType = selectedMonth === "all" ? 
    currentData?.eventsByType || [] :
    applyDateFilter(currentData?.eventsByType || [])

  const totalPages = Math.ceil(filteredPrograms.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const endIndex = startIndex + itemsPerPage
  const paginatedPrograms = filteredPrograms.slice(startIndex, endIndex)

  return (
    <div className="space-y-6">
      {/* Header with Pillar Selection */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Event Breakdown</h1>
          <p className="text-muted-foreground">Detailed analysis and visualization of event data</p>
        </div>
        <div className="flex items-center gap-4">
          <PDFDownloadButton filename="sso-event-breakdown" />
          <Select value={selectedPillar} onValueChange={handlePillarChange}>
            <SelectTrigger className="w-48">
              <SelectValue placeholder="Select Pillar" />
            </SelectTrigger>
            <SelectContent>
              {pillars.map((pillar) => (
                <SelectItem key={pillar.id} value={pillar.id}>
                  {pillar.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Date Range Filter */}
      <div className="flex items-center gap-4">
        <DateRangePicker
          value={dateRange}
          onChange={setDateRange}
          placeholder="Filter by date range"
        />
      </div>

      {/* Filters Section */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Filter className="h-5 w-5" />
            Date Filters
          </CardTitle>
          <p className="text-sm text-muted-foreground">
            Filter data by month and year (applies to all sections except Participation Trends)
          </p>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4" />
              <Select value={selectedMonth} onValueChange={setSelectedMonth}>
                <SelectTrigger className="w-40">
                  <SelectValue placeholder="Select Month" />
                </SelectTrigger>
                <SelectContent>
                  {months.map((month) => (
                    <SelectItem key={month.value} value={month.value}>
                      {month.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="flex items-center gap-2">
              <Select value={selectedYear} onValueChange={setSelectedYear}>
                <SelectTrigger className="w-32">
                  <SelectValue placeholder="Select Year" />
                </SelectTrigger>
                <SelectContent>
                  {years.map((year) => (
                    <SelectItem key={year.value} value={year.value}>
                      {year.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <Badge variant="outline" className="text-primary border-primary">
              {selectedMonth === "all" ? "All Data" : `${months.find(m => m.value === selectedMonth)?.label} ${selectedYear}`}
            </Badge>
          </div>
        </CardContent>
      </Card>

      {currentData && (
        <>
          {/* Charts Section */}
          {/* Charts Section */}
          <div className="space-y-6">
            {/* Events by Type */}
            <Card data-component="events-by-type">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <PieChart className="h-5 w-5" />
                  Events by Type
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <RechartsPieChart>
                    <Pie
                      data={filteredEventsByType}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {filteredEventsByType.map((entry: any, index: number) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </RechartsPieChart>
                </ResponsiveContainer>
                <div className="mt-4 grid grid-cols-2 gap-2">
                  {filteredEventsByType.map((item: any, index: number) => (
                    <div key={index} className="flex items-center gap-2">
                      <div 
                        className="w-3 h-3 rounded-full" 
                        style={{ backgroundColor: item.color }}
                      />
                      <span className="text-sm">{item.name}: {item.value}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Events by Location with Tabs */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MapPin className="h-5 w-5" />
                  Events by Location
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Tabs defaultValue="state" className="w-full">
                  <TabsList className="grid w-full grid-cols-3">
                    <TabsTrigger value="state">State</TabsTrigger>
                    <TabsTrigger value="parliament">Parliament</TabsTrigger>
                    <TabsTrigger value="dun">DUN</TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="state" className="space-y-4">
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input
                        placeholder="Search states..."
                        value={searchState}
                        onChange={(e) => setSearchState(e.target.value)}
                        className="pl-10"
                      />
                    </div>
                    <ResponsiveContainer width="100%" height={400}>
                      <BarChart data={locationData.states.slice(0, 10)}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" angle={-45} textAnchor="end" height={80} />
                        <YAxis />
                        <Tooltip />
                        <Bar dataKey="events" fill="#8884d8" name="Events" />
                        <Bar dataKey="attendees" fill="#82ca9d" name="Attendees" />
                      </BarChart>
                    </ResponsiveContainer>
                    {searchState && (
                      <div className="mt-4">
                        <h4 className="font-medium mb-2">Search Results:</h4>
                        <div className="grid grid-cols-1 gap-2">
                          {locationData.states
                            .filter(state => state.name.toLowerCase().includes(searchState.toLowerCase()))
                            .slice(0, 5)
                            .map((state, index) => (
                              <div key={index} className="flex justify-between items-center p-2 bg-muted rounded">
                                <span>{state.name}</span>
                                <div className="text-sm text-muted-foreground">
                                  {state.events} events, {state.attendees} attendees
                                </div>
                              </div>
                            ))}
                        </div>
                      </div>
                    )}
                  </TabsContent>

                  <TabsContent value="parliament" className="space-y-4">
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input
                        placeholder="Search parliament constituencies..."
                        value={searchParliament}
                        onChange={(e) => setSearchParliament(e.target.value)}
                        className="pl-10"
                      />
                    </div>
                    <ResponsiveContainer width="100%" height={400}>
                      <BarChart data={locationData.parliament.slice(0, 10)}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" angle={-45} textAnchor="end" height={80} />
                        <YAxis />
                        <Tooltip />
                        <Bar dataKey="events" fill="#8884d8" name="Events" />
                        <Bar dataKey="attendees" fill="#82ca9d" name="Attendees" />
                      </BarChart>
                    </ResponsiveContainer>
                    {searchParliament && (
                      <div className="mt-4">
                        <h4 className="font-medium mb-2">Search Results:</h4>
                        <div className="grid grid-cols-1 gap-2">
                          {locationData.parliament
                            .filter(p => p.name.toLowerCase().includes(searchParliament.toLowerCase()))
                            .slice(0, 5)
                            .map((parliament, index) => (
                              <div key={index} className="flex justify-between items-center p-2 bg-muted rounded">
                                <span>{parliament.name}</span>
                                <div className="text-sm text-muted-foreground">
                                  {parliament.events} events, {parliament.attendees} attendees
                                </div>
                              </div>
                            ))}
                        </div>
                      </div>
                    )}
                  </TabsContent>

                  <TabsContent value="dun" className="space-y-4">
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input
                        placeholder="Search DUN constituencies..."
                        value={searchDun}
                        onChange={(e) => setSearchDun(e.target.value)}
                        className="pl-10"
                      />
                    </div>
                    <ResponsiveContainer width="100%" height={400}>
                      <BarChart data={locationData.dun.slice(0, 10)}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" angle={-45} textAnchor="end" height={80} />
                        <YAxis />
                        <Tooltip />
                        <Bar dataKey="events" fill="#8884d8" name="Events" />
                        <Bar dataKey="attendees" fill="#82ca9d" name="Attendees" />
                      </BarChart>
                    </ResponsiveContainer>
                    {searchDun && (
                      <div className="mt-4">
                        <h4 className="font-medium mb-2">Search Results:</h4>
                        <div className="grid grid-cols-1 gap-2">
                          {locationData.dun
                            .filter(dun => dun.name.toLowerCase().includes(searchDun.toLowerCase()))
                            .slice(0, 5)
                            .map((dun, index) => (
                              <div key={index} className="flex justify-between items-center p-2 bg-muted rounded">
                                <span>{dun.name}</span>
                                <div className="text-sm text-muted-foreground">
                                  {dun.events} events, {dun.attendees} attendees
                                </div>
                              </div>
                            ))}
                        </div>
                      </div>
                    )}
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          </div>

          {/* Participation Trends - Full Width at Bottom */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5" />
                Participation Trends (Full Year)
              </CardTitle>
              <div className="flex items-center justify-between">
                <p className="text-sm text-muted-foreground">
                  Monthly participation trends throughout the year
                </p>
                <select 
                  value={participantTrendsYear} 
                  onChange={(e) => setParticipantTrendsYear(e.target.value)}
                  className="px-3 py-1 border border-gray-300 rounded-md text-sm"
                >
                  <option value="2024">2024</option>
                  <option value="2023">2023</option>
                  <option value="2022">2022</option>
                </select>
              </div>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={400}>
                <LineChart data={currentData.participationTrends}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Line type="monotone" dataKey="participants" stroke="#8884d8" strokeWidth={3} />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </>
      )}
    </div>
  )
}