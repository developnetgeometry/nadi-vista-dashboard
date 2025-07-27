import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { DateRangePicker } from "@/components/ui/date-range-picker"
import { PDFDownload } from "@/components/ui/pdf-download"
import { PieChart, MapPin, TrendingUp, BarChart3, Search, ChevronLeft, ChevronRight, Calendar, Filter } from "lucide-react"
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, LineChart, Line, PieChart as RechartsPieChart, Pie, Cell } from "recharts"
import { DateRange } from "react-day-picker"

// Mock data for different pillars
const pillars = [
  { id: "entrepreneur", name: "Entrepreneur" },
  { id: "awareness", name: "Awareness" },
  { id: "lifelong-learning", name: "Lifelong Learning" }
]

const mockData = {
  entrepreneur: {
    eventsByType: [
      { name: "NADI-Preneur", value: 18, color: "#8884d8" },
      { name: "Business Coaching", value: 12, color: "#82ca9d" },
      { name: "Funding Workshop", value: 8, color: "#ffc658" },
      { name: "Others", value: 4, color: "#ff7300" }
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
    ]
  },
  awareness: {
    eventsByType: [
      { name: "Digital Awareness", value: 12, color: "#8884d8" },
      { name: "Cyber Security", value: 8, color: "#82ca9d" },
      { name: "Tech Literacy", value: 6, color: "#ffc658" },
      { name: "Others", value: 2, color: "#ff7300" }
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
    ]
  },
  "lifelong-learning": {
    eventsByType: [
      { name: "Skills Training", value: 15, color: "#8884d8" },
      { name: "Professional Development", value: 10, color: "#82ca9d" },
      { name: "Certification Programs", value: 7, color: "#ffc658" },
      { name: "Others", value: 3, color: "#ff7300" }
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
    ]
  }
}

export default function SSOEventBreakdown() {
  const [selectedPillar, setSelectedPillar] = useState<string>("entrepreneur")
  const [currentData, setCurrentData] = useState<any>(null)
  const [searchLocation, setSearchLocation] = useState<string>("")
  const [dateRange, setDateRange] = useState<DateRange | undefined>()
  const [participantTrendsYear, setParticipantTrendsYear] = useState<string>("2024")
  const [activeLocationTab, setActiveLocationTab] = useState<string>("state")

  // Add mock location data for tabs
  const locationTabData = {
    state: [
      { name: "Selangor", events: 15, attendees: 1200 },
      { name: "Kuala Lumpur", events: 12, attendees: 950 },
      { name: "Johor", events: 10, attendees: 800 },
      { name: "Penang", events: 8, attendees: 650 },
      { name: "Perak", events: 6, attendees: 480 },
      { name: "Sabah", events: 5, attendees: 400 },
      { name: "Sarawak", events: 4, attendees: 320 },
      { name: "Kedah", events: 3, attendees: 240 },
      { name: "Kelantan", events: 2, attendees: 160 },
      { name: "Terengganu", events: 2, attendees: 160 },
      { name: "Pahang", events: 1, attendees: 80 }
    ],
    parliament: [
      { name: "Petaling Jaya", events: 8, attendees: 640 },
      { name: "Shah Alam", events: 7, attendees: 560 },
      { name: "Subang", events: 6, attendees: 480 },
      { name: "Klang", events: 5, attendees: 400 },
      { name: "Ampang", events: 4, attendees: 320 },
      { name: "Cheras", events: 4, attendees: 320 },
      { name: "Kepong", events: 3, attendees: 240 },
      { name: "Seputeh", events: 3, attendees: 240 },
      { name: "Lembah Pantai", events: 2, attendees: 160 },
      { name: "Titiwangsa", events: 2, attendees: 160 },
      { name: "Batu", events: 1, attendees: 80 }
    ],
    dun: [
      { name: "Damansara Utama", events: 6, attendees: 480 },
      { name: "Taman Tun Dr Ismail", events: 5, attendees: 400 },
      { name: "Bandar Utama", events: 4, attendees: 320 },
      { name: "Kota Damansara", events: 4, attendees: 320 },
      { name: "Tropicana", events: 3, attendees: 240 },
      { name: "Bukit Lanjan", events: 3, attendees: 240 },
      { name: "Seri Setia", events: 2, attendees: 160 },
      { name: "Kinrara", events: 2, attendees: 160 },
      { name: "Subang Jaya", events: 2, attendees: 160 },
      { name: "Sungai Pelek", events: 1, attendees: 80 },
      { name: "Morib", events: 1, attendees: 80 }
    ]
  }

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

  // Get current tab data and filter based on search
  const currentTabData = locationTabData[activeLocationTab as keyof typeof locationTabData] || []
  const filteredLocationData = currentTabData.filter((location: any) =>
    location.name.toLowerCase().includes(searchLocation.toLowerCase())
  )

  // Show top 10 by default, rest available through search
  const displayLocationData = searchLocation 
    ? filteredLocationData 
    : filteredLocationData.slice(0, 10)

  return (
    <div className="space-y-6">
      {/* Header with Pillar Selection and PDF Download */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Event Breakdown</h1>
          <p className="text-muted-foreground">Detailed analysis and visualization of event data</p>
        </div>
        <div className="flex items-center gap-4">
          <PDFDownload filename="event-breakdown" />
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

      {/* Date Range Filter Section */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Filter className="h-5 w-5" />
            Date Range Filter
          </CardTitle>
          <p className="text-sm text-muted-foreground">
            Select a date range to filter event data (applies to all sections except Participation Trends)
          </p>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-4">
            <DateRangePicker
              dateRange={dateRange}
              onDateRangeChange={setDateRange}
              placeholder="Select date range for events"
            />
            {dateRange && (
              <Badge variant="outline" className="text-primary border-primary">
                Date range selected
              </Badge>
            )}
          </div>
        </CardContent>
      </Card>

      {currentData && (
        <>
          {/* Charts Section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Events by Type */}
            <Card>
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
                      data={currentData.eventsByType}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {currentData.eventsByType.map((entry: any, index: number) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </RechartsPieChart>
                </ResponsiveContainer>
                <div className="mt-4 grid grid-cols-2 gap-2">
                  {currentData.eventsByType.map((item: any, index: number) => (
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
                <Tabs value={activeLocationTab} onValueChange={setActiveLocationTab}>
                  <TabsList className="grid w-full grid-cols-3">
                    <TabsTrigger value="state">State</TabsTrigger>
                    <TabsTrigger value="parliament">Parliament</TabsTrigger>
                    <TabsTrigger value="dun">DUN</TabsTrigger>
                  </TabsList>
                </Tabs>
                <div className="relative mt-4">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder={`Search ${activeLocationTab}...`}
                    value={searchLocation}
                    onChange={(e) => setSearchLocation(e.target.value)}
                    className="pl-10"
                  />
                </div>
                {!searchLocation && (
                  <p className="text-xs text-muted-foreground mt-2">
                    Showing top 10 by default. Use search to find other locations.
                  </p>
                )}
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={displayLocationData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis 
                      dataKey="name" 
                      angle={-45}
                      textAnchor="end"
                      height={80}
                      fontSize={10}
                    />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="events" fill="#8884d8" name="Events" />
                    <Bar dataKey="attendees" fill="#82ca9d" name="Attendees" />
                  </BarChart>
                </ResponsiveContainer>
                <div className="mt-2 text-xs text-muted-foreground text-center">
                  {searchLocation 
                    ? `Showing ${filteredLocationData.length} result(s) for "${searchLocation}"`
                    : `Showing top 10 of ${currentTabData.length} total ${activeLocationTab}s`
                  }
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Participation Trends with Year Filter */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="flex items-center gap-2">
                    <TrendingUp className="h-5 w-5" />
                    Participation Trends (Full Year)
                  </CardTitle>
                  <p className="text-sm text-muted-foreground">
                    Monthly participation trends throughout the year
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-sm text-muted-foreground">Year:</span>
                  <Select value={participantTrendsYear} onValueChange={setParticipantTrendsYear}>
                    <SelectTrigger className="w-32">
                      <SelectValue />
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