import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { 
  Calendar, 
  Users, 
  TrendingUp, 
  MapPin, 
  BarChart3, 
  PieChart,
  Activity,
  UserCheck,
  Building2,
  Clock
} from "lucide-react"
import { PieChart as RechartsPieChart, Pie, Cell, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, LineChart, Line } from "recharts"
import { DateRangePicker } from "@/components/DateRangePicker"
import { PDFDownloadButton } from "@/components/PDFDownloadButton"
import { DateRange } from "@/components/DateRangePicker"

// Mock data for different pillars
const pillars = [
  { id: "entrepreneur", name: "Entrepreneur" },
  { id: "awareness", name: "Awareness" },
  { id: "lifelong-learning", name: "Lifelong Learning" }
]

const mockData = {
  entrepreneur: {
    totalEvents: 42,
    currentMonthEvents: 8,
    currentYearEvents: 42,
    totalParticipants: 3200,
    avgAttendancePerEvent: 76,
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
      { event: "Bootcamp 1", registered: 100, attended: 85 },
      { event: "Workshop A", registered: 80, attended: 75 },
      { event: "Seminar B", registered: 120, attended: 95 },
      { event: "Training C", registered: 90, attended: 80 }
    ]
  },
  awareness: {
    totalEvents: 28,
    currentMonthEvents: 6,
    currentYearEvents: 28,
    totalParticipants: 2100,
    avgAttendancePerEvent: 75,
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
      { event: "Digital Day", registered: 150, attended: 120 },
      { event: "Cyber Seminar", registered: 100, attended: 90 },
      { event: "Tech Talk", registered: 80, attended: 70 },
      { event: "Awareness Campaign", registered: 200, attended: 180 }
    ]
  },
  "lifelong-learning": {
    totalEvents: 35,
    currentMonthEvents: 7,
    currentYearEvents: 35,
    totalParticipants: 2800,
    avgAttendancePerEvent: 80,
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
      { event: "Skills Workshop", registered: 120, attended: 100 },
      { event: "Certification Prep", registered: 90, attended: 85 },
      { event: "Professional Course", registered: 110, attended: 95 },
      { event: "Training Program", registered: 100, attended: 90 }
    ]
  }
}

export default function SSODashboard() {
  const [selectedPillar, setSelectedPillar] = useState<string>("")
  const [currentData, setCurrentData] = useState<any>(null)
  const [dateRange, setDateRange] = useState<DateRange | undefined>()

  useEffect(() => {
    if (selectedPillar && mockData[selectedPillar as keyof typeof mockData]) {
      setCurrentData(mockData[selectedPillar as keyof typeof mockData])
    }
  }, [selectedPillar])

  const handlePillarChange = (pillar: string) => {
    setSelectedPillar(pillar)
  }

  if (!selectedPillar) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <Card className="w-96">
          <CardHeader>
            <CardTitle className="text-center">Select Your Pillar</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-muted-foreground text-center">
              Please select a pillar to view the dashboard data.
            </p>
            <Select value={selectedPillar} onValueChange={handlePillarChange}>
              <SelectTrigger>
                <SelectValue placeholder="Choose a pillar..." />
              </SelectTrigger>
              <SelectContent>
                {pillars.map((pillar) => (
                  <SelectItem key={pillar.id} value={pillar.id}>
                    {pillar.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header with Pillar Selection */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">SSO Dashboard</h1>
          <p className="text-muted-foreground">View data for your selected pillar</p>
        </div>
        <div className="flex items-center gap-4">
          <PDFDownloadButton filename="sso-dashboard" />
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

      {/* Date Range Filter */}
      {currentData && (
        <div className="flex items-center gap-4">
          <DateRangePicker
            value={dateRange}
            onChange={setDateRange}
            placeholder="Filter by date range"
          />
        </div>
      )}

      {currentData && (
        <>
          {/* Events Overview */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6" data-component="events-overview">
            <Card data-stat-title="Total Events">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Events</CardTitle>
                <Calendar className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{currentData.totalEvents}</div>
                <p className="text-xs text-muted-foreground">This year</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Current Month</CardTitle>
                <Clock className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{currentData.currentMonthEvents}</div>
                <p className="text-xs text-muted-foreground">Events this month</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Participants</CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{currentData.totalParticipants.toLocaleString()}</div>
                <p className="text-xs text-muted-foreground">All events</p>
              </CardContent>
            </Card>
          </div>

          {/* Participation Stats */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <UserCheck className="h-5 w-5" />
                  Average Attendance
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">{currentData.avgAttendancePerEvent}</div>
                <p className="text-muted-foreground">per event</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Activity className="h-5 w-5" />
                  Quick Stats
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Events/Month Avg:</span>
                  <span className="font-medium">{Math.round(currentData.totalEvents / 6)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Growth Rate:</span>
                  <span className="font-medium text-green-600">+12%</span>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Charts Section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
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
              </CardContent>
            </Card>

            {/* Events by Location */}
            <Card data-component="events-by-location">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MapPin className="h-5 w-5" />
                  Events by Location
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={currentData.eventsByLocation}>
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

            {/* Registration vs Attendance */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BarChart3 className="h-5 w-5" />
                  Registration vs Attendance
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={currentData.registrationVsAttendance}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="event" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="registered" fill="#ffc658" name="Registered" />
                    <Bar dataKey="attended" fill="#8884d8" name="Attended" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>
        </>
      )}
    </div>
  )
}