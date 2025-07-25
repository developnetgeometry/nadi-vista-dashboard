import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { 
  Calendar, 
  MapPin, 
  Users, 
  Building2, 
  TrendingUp, 
  Clock,
  Settings,
  Activity,
  Filter,
  Download,
  Search,
  User,
  BarChart3,
  CalendarDays
} from "lucide-react"
import { useState, useMemo } from "react"

const takwimStats = [
  { title: "Total Events Scheduled", count: "186", icon: Calendar, color: "text-blue-600" },
  { title: "Completed Events", count: "142", icon: Activity, color: "text-green-600" },
  { title: "Ongoing Events", count: "28", icon: Clock, color: "text-orange-600" },
  { title: "Cancelled Events", count: "16", icon: Settings, color: "text-red-600" }
]

const eventsByState = [
  { state: "Selangor", completed: 28, ongoing: 5, scheduled: 8, total: 41 },
  { state: "Kuala Lumpur", completed: 22, ongoing: 3, scheduled: 6, total: 31 },
  { state: "Johor", completed: 20, ongoing: 4, scheduled: 7, total: 31 },
  { state: "Penang", completed: 18, ongoing: 3, scheduled: 4, total: 25 },
  { state: "Perak", completed: 16, ongoing: 2, scheduled: 5, total: 23 },
  { state: "Sabah", completed: 12, ongoing: 3, scheduled: 3, total: 18 },
  { state: "Sarawak", completed: 11, ongoing: 2, scheduled: 4, total: 17 }
]

const eventsByCategory = [
  { category: "Training", count: 45, percentage: 24, color: "bg-blue-500" },
  { category: "Workshop", count: 38, percentage: 20, color: "bg-green-500" },
  { category: "Seminar", count: 32, percentage: 17, color: "bg-purple-500" },
  { category: "Competition", count: 28, percentage: 15, color: "bg-orange-500" },
  { category: "Exhibition", count: 25, percentage: 13, color: "bg-red-500" },
  { category: "Others", count: 18, percentage: 11, color: "bg-gray-500" }
]

const eventDetails = [
  {
    id: "EVT001",
    title: "Digital Literacy Training",
    state: "Selangor",
    district: "Petaling",
    venue: "NADI Shah Alam",
    date: "2024-02-15",
    time: "09:00 AM",
    status: "Completed",
    participants: 150,
    category: "Training"
  },
  {
    id: "EVT002",
    title: "Entrepreneurship Workshop",
    state: "Kuala Lumpur",
    district: "Kuala Lumpur",
    venue: "NADI KL Sentral",
    date: "2024-02-20",
    time: "02:00 PM",
    status: "Ongoing",
    participants: 120,
    category: "Workshop"
  },
  {
    id: "EVT003",
    title: "Health Awareness Seminar",
    state: "Johor",
    district: "Johor Bahru",
    venue: "NADI JB City",
    date: "2024-02-25",
    time: "10:30 AM",
    status: "Scheduled",
    participants: 200,
    category: "Seminar"
  },
  {
    id: "EVT004",
    title: "Innovation Competition",
    state: "Penang",
    district: "Pulau Pinang",
    venue: "NADI Georgetown",
    date: "2024-03-01",
    time: "09:00 AM",
    status: "Scheduled",
    participants: 80,
    category: "Competition"
  }
]

const participantDemographics = [
  { category: "Age Group", data: [
    { label: "12-17", count: 1250, percentage: 25 },
    { label: "18-30", count: 1750, percentage: 35 },
    { label: "31-45", count: 1200, percentage: 24 },
    { label: "46-60", count: 600, percentage: 12 },
    { label: "60+", count: 200, percentage: 4 }
  ]},
  { category: "Gender", data: [
    { label: "Male", count: 2400, percentage: 48 },
    { label: "Female", count: 2600, percentage: 52 }
  ]},
  { category: "Race", data: [
    { label: "Malay", count: 3000, percentage: 60 },
    { label: "Chinese", count: 1000, percentage: 20 },
    { label: "Indian", count: 650, percentage: 13 },
    { label: "Others", count: 350, percentage: 7 }
  ]}
]

export default function TPTakwim() {
  const [selectedState, setSelectedState] = useState("all")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [selectedStatus, setSelectedStatus] = useState("all")
  const [selectedMonth, setSelectedMonth] = useState("all")
  const [selectedYear, setSelectedYear] = useState("all")
  
  // Search states
  const [stateSearch, setStateSearch] = useState("")
  const [eventSearch, setEventSearch] = useState("")
  const [raceSearch, setRaceSearch] = useState("")

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

  const FilterComponent = ({ title }: { title: string }) => (
    <div className="flex items-center gap-2 mb-4">
      <Filter className="h-4 w-4" />
      <span className="text-sm font-medium">{title}:</span>
      <Select value={selectedMonth} onValueChange={setSelectedMonth}>
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
      <Select value={selectedYear} onValueChange={setSelectedYear}>
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

  // Filter functions
  const filteredStateData = useMemo(() => {
    return eventsByState.filter(state => 
      state.state.toLowerCase().includes(stateSearch.toLowerCase())
    )
  }, [stateSearch])

  const filteredEventData = useMemo(() => {
    return eventDetails.filter(event => 
      event.title.toLowerCase().includes(eventSearch.toLowerCase()) ||
      event.venue.toLowerCase().includes(eventSearch.toLowerCase())
    )
  }, [eventSearch])

  const filteredRaceData = useMemo(() => {
    const raceData = participantDemographics.find(d => d.category === "Race")?.data || []
    return raceData.filter(race =>
      race.label.toLowerCase().includes(raceSearch.toLowerCase())
    )
  }, [raceSearch])

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Takwim Dashboard</h1>
          <p className="text-muted-foreground">
            Monitor and manage event scheduling and participation across NADI centers
          </p>
        </div>
      </div>

      <Tabs defaultValue="overview" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="events">Event Management</TabsTrigger>
          <TabsTrigger value="participants">Participant Analysis</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6 mt-6">
          {/* Takwim Statistics */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {takwimStats.map((stat) => (
              <Card key={stat.title}>
                <CardContent className="p-6">
                  <div className="flex items-center space-x-3">
                    <div className="p-2 bg-muted rounded-lg">
                      <stat.icon className={`h-6 w-6 ${stat.color}`} />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">{stat.title}</p>
                      <p className="text-2xl font-bold">{stat.count}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Events by State */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MapPin className="h-5 w-5" />
                Events by State
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <FilterComponent title="Filter" />
              <SearchComponent
                search={stateSearch}
                setSearch={setStateSearch}
                placeholder="Search state..."
              />
              <div className="space-y-4">
                {filteredStateData.map((state) => (
                  <div key={state.state} className="space-y-3 p-4 border rounded-lg">
                    <div className="flex justify-between items-center">
                      <h3 className="font-semibold">{state.state}</h3>
                      <Badge variant="outline">{state.total} Total Events</Badge>
                    </div>
                    <div className="grid grid-cols-3 gap-4 text-sm">
                      <div>
                        <span className="text-muted-foreground">Completed:</span>
                        <span className="ml-2 font-medium text-green-600">{state.completed}</span>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Ongoing:</span>
                        <span className="ml-2 font-medium text-orange-600">{state.ongoing}</span>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Scheduled:</span>
                        <span className="ml-2 font-medium text-blue-600">{state.scheduled}</span>
                      </div>
                    </div>
                    <Progress value={(state.completed / state.total) * 100} className="h-2" />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Events by Category */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BarChart3 className="h-5 w-5" />
                Events by Category
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {eventsByCategory.map((category) => (
                <div key={category.category} className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <div className="flex items-center gap-2">
                      <div className={`w-3 h-3 rounded-full ${category.color}`}></div>
                      <span className="font-medium">{category.category}</span>
                    </div>
                    <span className="text-muted-foreground">
                      {category.count} events ({category.percentage}%)
                    </span>
                  </div>
                  <Progress value={category.percentage} className="h-2" />
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="events" className="space-y-6 mt-6">
          {/* Event Filters */}
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-4 flex-wrap">
                <div className="flex items-center gap-2">
                  <Filter className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm font-medium">Filter by:</span>
                </div>
                <Select value={selectedState} onValueChange={setSelectedState}>
                  <SelectTrigger className="w-32">
                    <SelectValue placeholder="State" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All States</SelectItem>
                    {eventsByState.map((state) => (
                      <SelectItem key={state.state} value={state.state}>{state.state}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                  <SelectTrigger className="w-32">
                    <SelectValue placeholder="Category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Categories</SelectItem>
                    {eventsByCategory.map((category) => (
                      <SelectItem key={category.category} value={category.category}>{category.category}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Select value={selectedStatus} onValueChange={setSelectedStatus}>
                  <SelectTrigger className="w-32">
                    <SelectValue placeholder="Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Status</SelectItem>
                    <SelectItem value="Completed">Completed</SelectItem>
                    <SelectItem value="Ongoing">Ongoing</SelectItem>
                    <SelectItem value="Scheduled">Scheduled</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          {/* Event Details Table */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center gap-2">
                  <CalendarDays className="h-5 w-5" />
                  Event Details
                </CardTitle>
                <Button onClick={() => downloadCSV(eventDetails, 'event-details.csv')}>
                  <Download className="h-4 w-4 mr-2" />
                  Download
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <SearchComponent
                search={eventSearch}
                setSearch={setEventSearch}
                placeholder="Search events..."
              />
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Event ID</TableHead>
                      <TableHead>Title</TableHead>
                      <TableHead>State</TableHead>
                      <TableHead>Venue</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead>Time</TableHead>
                      <TableHead>Category</TableHead>
                      <TableHead className="text-center">Participants</TableHead>
                      <TableHead className="text-center">Status</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredEventData.map((event) => (
                      <TableRow key={event.id}>
                        <TableCell className="font-medium">{event.id}</TableCell>
                        <TableCell>{event.title}</TableCell>
                        <TableCell>{event.state}</TableCell>
                        <TableCell>{event.venue}</TableCell>
                        <TableCell>{event.date}</TableCell>
                        <TableCell>{event.time}</TableCell>
                        <TableCell>
                          <Badge variant="outline">{event.category}</Badge>
                        </TableCell>
                        <TableCell className="text-center">{event.participants}</TableCell>
                        <TableCell className="text-center">
                          <Badge 
                            variant="secondary"
                            className={
                              event.status === "Completed" ? "bg-green-50 text-green-600 border-green-200" :
                              event.status === "Ongoing" ? "bg-orange-50 text-orange-600 border-orange-200" :
                              "bg-blue-50 text-blue-600 border-blue-200"
                            }
                          >
                            {event.status}
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

        <TabsContent value="participants" className="space-y-6 mt-6">
          {/* Participant Demographics */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {participantDemographics.map((demographic, index) => (
              <Card key={index}>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <User className="h-5 w-5" />
                    By {demographic.category}
                  </CardTitle>
                  {demographic.category === "Race" && (
                    <SearchComponent
                      search={raceSearch}
                      setSearch={setRaceSearch}
                      placeholder="Search races..."
                    />
                  )}
                </CardHeader>
                <CardContent className="space-y-4">
                  {(demographic.category === "Race" ? filteredRaceData : demographic.data).map((item) => (
                    <div key={item.label} className="flex justify-between items-center p-3 border rounded-lg">
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
          </div>

          {/* Participation Trends */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5" />
                Participation Trends
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="text-center p-4 border rounded-lg">
                    <div className="text-2xl font-bold text-blue-600">5,000</div>
                    <p className="text-sm text-muted-foreground">Total Participants</p>
                  </div>
                  <div className="text-center p-4 border rounded-lg">
                    <div className="text-2xl font-bold text-green-600">+15%</div>
                    <p className="text-sm text-muted-foreground">Growth Rate</p>
                  </div>
                  <div className="text-center p-4 border rounded-lg">
                    <div className="text-2xl font-bold text-orange-600">27</div>
                    <p className="text-sm text-muted-foreground">Avg per Event</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}