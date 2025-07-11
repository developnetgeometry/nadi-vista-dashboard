import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { PieChart, MapPin, TrendingUp, BarChart3, Search } from "lucide-react"
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, LineChart, Line, PieChart as RechartsPieChart, Pie, Cell } from "recharts"

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
      { month: "Jun", participants: 320 }
    ],
    registrationVsAttendance: [
      { event: "Startup Bootcamp", registered: 100, attended: 85, completionRate: 85 },
      { event: "Business Plan Workshop", registered: 80, attended: 75, completionRate: 94 },
      { event: "Investor Pitch Day", registered: 120, attended: 95, completionRate: 79 },
      { event: "Marketing Fundamentals", registered: 90, attended: 80, completionRate: 89 },
      { event: "Financial Planning", registered: 70, attended: 65, completionRate: 93 }
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
      { month: "Jun", participants: 280 }
    ],
    registrationVsAttendance: [
      { event: "Digital Literacy Workshop", registered: 150, attended: 120, completionRate: 80 },
      { event: "Cybersecurity Seminar", registered: 100, attended: 90, completionRate: 90 },
      { event: "Tech Awareness Campaign", registered: 80, attended: 70, completionRate: 88 },
      { event: "Digital Skills Training", registered: 200, attended: 180, completionRate: 90 }
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
      { month: "Jun", participants: 350 }
    ],
    registrationVsAttendance: [
      { event: "Professional Development Course", registered: 120, attended: 100, completionRate: 83 },
      { event: "Skills Certification Program", registered: 90, attended: 85, completionRate: 94 },
      { event: "Leadership Training", registered: 110, attended: 95, completionRate: 86 },
      { event: "Communication Skills Workshop", registered: 100, attended: 90, completionRate: 90 }
    ]
  }
}

export default function SSOEventBreakdown() {
  const [selectedPillar, setSelectedPillar] = useState<string>("entrepreneur")
  const [currentData, setCurrentData] = useState<any>(null)
  const [searchLocation, setSearchLocation] = useState<string>("")

  useEffect(() => {
    if (selectedPillar && mockData[selectedPillar as keyof typeof mockData]) {
      setCurrentData(mockData[selectedPillar as keyof typeof mockData])
    }
  }, [selectedPillar])

  const handlePillarChange = (pillar: string) => {
    setSelectedPillar(pillar)
  }

  const filteredLocations = currentData?.eventsByLocation.filter((location: any) =>
    location.location.toLowerCase().includes(searchLocation.toLowerCase())
  ) || []

  return (
    <div className="space-y-6">
      {/* Header with Pillar Selection */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Event Breakdown</h1>
          <p className="text-muted-foreground">Detailed analysis and visualization of event data</p>
        </div>
        <div className="flex items-center gap-4">
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
          <Badge variant="outline" className="text-primary border-primary">
            {pillars.find(p => p.id === selectedPillar)?.name}
          </Badge>
        </div>
      </div>

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

            {/* Events by Location with Search */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MapPin className="h-5 w-5" />
                  Events by Location
                </CardTitle>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search locations..."
                    value={searchLocation}
                    onChange={(e) => setSearchLocation(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={filteredLocations}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="location" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="events" fill="#8884d8" name="Events" />
                    <Bar dataKey="attendees" fill="#82ca9d" name="Attendees" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            {/* Participation Trends */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="h-5 w-5" />
                  Participation Trends
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={currentData.participationTrends}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Line type="monotone" dataKey="participants" stroke="#8884d8" strokeWidth={2} />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>

          {/* Registration vs Attendance - Full Width */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BarChart3 className="h-5 w-5" />
                Registration vs Actual Attendance Analysis
              </CardTitle>
              <p className="text-sm text-muted-foreground">
                Comprehensive comparison of registration numbers and actual attendance with completion rates
              </p>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
                <div className="p-4 bg-primary/5 rounded-lg text-center">
                  <div className="text-2xl font-bold text-primary">
                    {Math.round(currentData.registrationVsAttendance.reduce((sum: number, item: any) => sum + (item.attended / item.registered * 100), 0) / currentData.registrationVsAttendance.length)}%
                  </div>
                  <p className="text-sm text-muted-foreground">Average Attendance Rate</p>
                </div>
                <div className="p-4 bg-secondary/5 rounded-lg text-center">
                  <div className="text-2xl font-bold text-secondary">
                    {currentData.registrationVsAttendance.reduce((sum: number, item: any) => sum + item.registered, 0)}
                  </div>
                  <p className="text-sm text-muted-foreground">Total Registrations</p>
                </div>
                <div className="p-4 bg-accent/5 rounded-lg text-center">
                  <div className="text-2xl font-bold text-accent">
                    {currentData.registrationVsAttendance.reduce((sum: number, item: any) => sum + item.attended, 0)}
                  </div>
                  <p className="text-sm text-muted-foreground">Total Attendance</p>
                </div>
              </div>
              
              <ResponsiveContainer width="100%" height={400}>
                <BarChart data={currentData.registrationVsAttendance} layout="horizontal">
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis type="number" />
                  <YAxis dataKey="event" type="category" width={150} />
                  <Tooltip 
                    formatter={(value, name) => [value, name === "registered" ? "Registered" : "Attended"]}
                    labelFormatter={(label) => `Event: ${label}`}
                  />
                  <Bar dataKey="registered" fill="#ffc658" name="Registered" />
                  <Bar dataKey="attended" fill="#8884d8" name="Attended" />
                </BarChart>
              </ResponsiveContainer>

              {/* Event Details Table */}
              <div className="mt-6 overflow-x-auto">
                <h4 className="text-lg font-semibold mb-4">Event Performance Details</h4>
                <div className="border rounded-lg">
                  <div className="grid grid-cols-4 gap-4 p-4 bg-muted/50 font-medium">
                    <div>Event Name</div>
                    <div>Registered</div>
                    <div>Attended</div>
                    <div>Attendance Rate</div>
                  </div>
                  {currentData.registrationVsAttendance.map((event: any, index: number) => (
                    <div key={index} className="grid grid-cols-4 gap-4 p-4 border-t">
                      <div className="font-medium">{event.event}</div>
                      <div>{event.registered}</div>
                      <div>{event.attended}</div>
                      <div>
                        <Badge 
                          variant={event.attended / event.registered >= 0.8 ? "default" : "secondary"}
                          className={event.attended / event.registered >= 0.8 ? "bg-green-500" : ""}
                        >
                          {Math.round((event.attended / event.registered) * 100)}%
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </>
      )}
    </div>
  )
}