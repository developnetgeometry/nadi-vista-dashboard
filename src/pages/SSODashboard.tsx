import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
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
  Clock,
  Search
} from "lucide-react"
import { PieChart as RechartsPieChart, Pie, Cell, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, LineChart, Line, Legend } from "recharts"

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
      { program: "Digital Marketing Bootcamp", registered: 800, attended: 745 },
      { program: "E-commerce Workshop", registered: 650, attended: 598 },
      { program: "Business Plan Development", registered: 720, attended: 684 },
      { program: "Financial Management Course", registered: 580, attended: 522 },
      { program: "Leadership Training", registered: 490, attended: 441 },
      { program: "Innovation Lab Session", registered: 380, attended: 342 },
      { program: "Networking Event", registered: 620, attended: 558 },
      { program: "Pitch Competition Prep", registered: 310, attended: 279 },
      { program: "Market Research Workshop", registered: 290, attended: 261 },
      { program: "Growth Hacking Seminar", registered: 240, attended: 216 }
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
      { program: "Digital Literacy Workshop", registered: 450, attended: 405 },
      { program: "Cybersecurity Awareness", registered: 380, attended: 342 },
      { program: "Social Media Safety", registered: 320, attended: 288 },
      { program: "Digital Banking Guide", registered: 290, attended: 261 },
      { program: "Online Privacy Protection", registered: 260, attended: 234 },
      { program: "Tech for Seniors", registered: 240, attended: 216 },
      { program: "Digital Communication", registered: 220, attended: 198 },
      { program: "E-Government Services", registered: 200, attended: 180 },
      { program: "Smart Device Usage", registered: 180, attended: 162 },
      { program: "Digital Health Tools", registered: 160, attended: 144 }
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
      { program: "Professional Certification", registered: 520, attended: 468 },
      { program: "Technical Skills Training", registered: 480, attended: 432 },
      { program: "Leadership Development", registered: 440, attended: 396 },
      { program: "Project Management Course", registered: 400, attended: 360 },
      { program: "Data Analytics Workshop", registered: 360, attended: 324 },
      { program: "Communication Skills", registered: 320, attended: 288 },
      { program: "Time Management", registered: 280, attended: 252 },
      { program: "Problem Solving Methods", registered: 250, attended: 225 },
      { program: "Career Development", registered: 220, attended: 198 },
      { program: "Industry Best Practices", registered: 200, attended: 180 }
    ]
  }
}

export default function SSODashboard() {
  const [selectedPillar, setSelectedPillar] = useState<string>("")
  const [currentData, setCurrentData] = useState<any>(null)
  const [locationSearch, setLocationSearch] = useState<string>("")

  useEffect(() => {
    if (selectedPillar && mockData[selectedPillar as keyof typeof mockData]) {
      setCurrentData(mockData[selectedPillar as keyof typeof mockData])
    }
  }, [selectedPillar])

  const handlePillarChange = (pillar: string) => {
    setSelectedPillar(pillar)
  }

  // Filter location data based on search
  const filteredLocationData = currentData?.eventsByLocation?.filter((item: any) =>
    item.location.toLowerCase().includes(locationSearch.toLowerCase())
  ) || []

  // Custom tooltip for Registration vs Attendance
  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      const registered = payload.find((p: any) => p.dataKey === 'registered')?.value || 0
      const attended = payload.find((p: any) => p.dataKey === 'attended')?.value || 0
      const percentage = registered > 0 ? Math.round((attended / registered) * 100) : 0
      
      return (
        <div className="bg-white p-3 border rounded-lg shadow-lg">
          <p className="font-medium">{`Programme: ${label}`}</p>
          <p className="text-blue-600">{`Registered: ${registered}`}</p>
          <p className="text-green-600">{`Attended: ${attended} (${percentage}%)`}</p>
        </div>
      )
    }
    return null
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
          {/* Events Overview */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card>
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
            <Card className="hover-scale">
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
            <Card className="hover-scale">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MapPin className="h-5 w-5" />
                  Events by Location
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="relative">
                  <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search locations..."
                    value={locationSearch}
                    onChange={(e) => setLocationSearch(e.target.value)}
                    className="pl-8"
                  />
                </div>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={filteredLocationData}>
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
            <Card className="hover-scale">
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
          {/* Registration vs Attendance - Full Width Smart Section */}
          <Card className="w-full animate-fade-in">
            <CardHeader className="bg-gradient-to-r from-blue-50 to-green-50 dark:from-blue-950 dark:to-green-950">
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center gap-3 text-xl">
                  <div className="p-2 bg-primary/10 rounded-lg">
                    <BarChart3 className="h-6 w-6 text-primary" />
                  </div>
                  Registration vs Actual Attendance Analysis
                </CardTitle>
                <Badge variant="secondary" className="text-sm">
                  {currentData.registrationVsAttendance.length} Programs
                </Badge>
              </div>
              <p className="text-muted-foreground mt-2">
                Compare registration numbers with actual attendance across all programs
              </p>
            </CardHeader>
            <CardContent className="p-6 space-y-6">
              {/* Summary Stats */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="bg-blue-50 dark:bg-blue-950/20 p-4 rounded-lg text-center hover-scale">
                  <div className="text-2xl font-bold text-blue-600">
                    {currentData.registrationVsAttendance.reduce((sum: number, item: any) => sum + item.registered, 0).toLocaleString()}
                  </div>
                  <div className="text-sm text-muted-foreground">Total Registered</div>
                </div>
                <div className="bg-green-50 dark:bg-green-950/20 p-4 rounded-lg text-center hover-scale">
                  <div className="text-2xl font-bold text-green-600">
                    {currentData.registrationVsAttendance.reduce((sum: number, item: any) => sum + item.attended, 0).toLocaleString()}
                  </div>
                  <div className="text-sm text-muted-foreground">Total Attended</div>
                </div>
                <div className="bg-purple-50 dark:bg-purple-950/20 p-4 rounded-lg text-center hover-scale">
                  <div className="text-2xl font-bold text-purple-600">
                    {Math.round((currentData.registrationVsAttendance.reduce((sum: number, item: any) => sum + item.attended, 0) / 
                    currentData.registrationVsAttendance.reduce((sum: number, item: any) => sum + item.registered, 0)) * 100)}%
                  </div>
                  <div className="text-sm text-muted-foreground">Overall Rate</div>
                </div>
                <div className="bg-orange-50 dark:bg-orange-950/20 p-4 rounded-lg text-center hover-scale">
                  <div className="text-2xl font-bold text-orange-600">
                    {Math.round(currentData.registrationVsAttendance.reduce((sum: number, item: any) => sum + item.attended, 0) / currentData.registrationVsAttendance.length)}
                  </div>
                  <div className="text-sm text-muted-foreground">Avg per Program</div>
                </div>
              </div>

              {/* Legend and Controls */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-6 text-sm">
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 bg-blue-500 rounded shadow-lg"></div>
                    <span className="font-medium">Registered</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 bg-green-500 rounded shadow-lg"></div>
                    <span className="font-medium">Attended</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 bg-gradient-to-r from-blue-500 to-green-500 rounded shadow-lg"></div>
                    <span className="font-medium">Attendance Rate</span>
                  </div>
                </div>
              </div>

              {/* Enhanced Chart */}
              <div className="border rounded-lg p-4 bg-gradient-to-br from-gray-50 to-white dark:from-gray-900 dark:to-gray-800">
                <ResponsiveContainer width="100%" height={600}>
                  <BarChart
                    layout="horizontal"
                    data={currentData.registrationVsAttendance}
                    margin={{ top: 20, right: 120, left: 200, bottom: 20 }}
                  >
                    <defs>
                      <linearGradient id="registeredGradient" x1="0" y1="0" x2="1" y2="0">
                        <stop offset="0%" stopColor="#3b82f6" stopOpacity={0.8}/>
                        <stop offset="100%" stopColor="#1d4ed8" stopOpacity={1}/>
                      </linearGradient>
                      <linearGradient id="attendedGradient" x1="0" y1="0" x2="1" y2="0">
                        <stop offset="0%" stopColor="#10b981" stopOpacity={0.8}/>
                        <stop offset="100%" stopColor="#059669" stopOpacity={1}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
                    <XAxis 
                      type="number" 
                      tick={{ fontSize: 12 }}
                      tickFormatter={(value) => value.toLocaleString()}
                    />
                    <YAxis 
                      type="category" 
                      dataKey="program" 
                      width={180}
                      tick={{ fontSize: 11 }}
                      interval={0}
                    />
                    <Tooltip content={<CustomTooltip />} />
                    <Bar 
                      dataKey="registered" 
                      fill="url(#registeredGradient)" 
                      name="Registered"
                      radius={[0, 4, 4, 0]}
                    />
                    <Bar 
                      dataKey="attended" 
                      fill="url(#attendedGradient)" 
                      name="Attended"
                      radius={[0, 4, 4, 0]}
                    />
                  </BarChart>
                </ResponsiveContainer>
              </div>

              {/* Program Performance List */}
              <div className="space-y-3">
                <h4 className="font-semibold text-lg">Program Performance Breakdown</h4>
                <div className="grid gap-3 max-h-80 overflow-y-auto">
                  {currentData.registrationVsAttendance
                    .sort((a: any, b: any) => (b.attended / b.registered) - (a.attended / a.registered))
                    .map((program: any, index: number) => {
                      const percentage = Math.round((program.attended / program.registered) * 100)
                      const isHighPerforming = percentage >= 85
                      const isMediumPerforming = percentage >= 70
                      
                      return (
                        <div 
                          key={program.program} 
                          className="flex items-center justify-between p-3 bg-card border rounded-lg hover:shadow-md transition-all duration-200 hover-scale"
                        >
                          <div className="flex items-center gap-3">
                            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-white text-sm font-bold ${
                              isHighPerforming ? 'bg-green-500' : 
                              isMediumPerforming ? 'bg-yellow-500' : 'bg-red-500'
                            }`}>
                              {index + 1}
                            </div>
                            <div>
                              <div className="font-medium text-sm">{program.program}</div>
                              <div className="text-xs text-muted-foreground">
                                {program.attended.toLocaleString()} / {program.registered.toLocaleString()} attendees
                              </div>
                            </div>
                          </div>
                          <div className="flex items-center gap-4">
                            <div className="w-32 bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                              <div 
                                className={`h-2 rounded-full transition-all duration-500 ${
                                  isHighPerforming ? 'bg-green-500' : 
                                  isMediumPerforming ? 'bg-yellow-500' : 'bg-red-500'
                                }`}
                                style={{ width: `${percentage}%` }}
                              />
                            </div>
                            <div className={`text-sm font-bold ${
                              isHighPerforming ? 'text-green-600' : 
                              isMediumPerforming ? 'text-yellow-600' : 'text-red-600'
                            }`}>
                              {percentage}%
                            </div>
                          </div>
                        </div>
                      )
                    })}
                </div>
              </div>
            </CardContent>
          </Card>
        </>
      )}
    </div>
  )
}