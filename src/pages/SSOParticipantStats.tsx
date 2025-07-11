import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Users, UserCheck, TrendingUp, Award, Activity, Target } from "lucide-react"
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, LineChart, Line, PieChart as RechartsPieChart, Pie, Cell } from "recharts"

// Mock data for different pillars
const pillars = [
  { id: "entrepreneur", name: "Entrepreneur" },
  { id: "awareness", name: "Awareness" },
  { id: "lifelong-learning", name: "Lifelong Learning" }
]

const mockData = {
  entrepreneur: {
    totalParticipants: 3200,
    activeParticipants: 2800,
    avgAttendancePerEvent: 76,
    completionRate: 87,
    participantGrowth: [
      { month: "Jan", participants: 250, new: 180, returning: 70 },
      { month: "Feb", participants: 300, new: 210, returning: 90 },
      { month: "Mar", participants: 280, new: 160, returning: 120 },
      { month: "Apr", participants: 350, new: 220, returning: 130 },
      { month: "May", participants: 400, new: 250, returning: 150 },
      { month: "Jun", participants: 320, new: 180, returning: 140 }
    ],
    ageDistribution: [
      { name: "18-25", value: 35, color: "#8884d8" },
      { name: "26-35", value: 40, color: "#82ca9d" },
      { name: "36-45", value: 20, color: "#ffc658" },
      { name: "46+", value: 5, color: "#ff7300" }
    ],
    topPerformers: [
      { name: "Ahmad Rahman", events: 12, completion: 95 },
      { name: "Siti Nurhaliza", events: 10, completion: 90 },
      { name: "David Lim", events: 9, completion: 88 }
    ],
    engagementMetrics: {
      averageRating: 4.6,
      feedbackScore: 92,
      retentionRate: 78
    }
  },
  awareness: {
    totalParticipants: 2100,
    activeParticipants: 1850,
    avgAttendancePerEvent: 75,
    completionRate: 82,
    participantGrowth: [
      { month: "Jan", participants: 180, new: 140, returning: 40 },
      { month: "Feb", participants: 220, new: 160, returning: 60 },
      { month: "Mar", participants: 200, new: 130, returning: 70 },
      { month: "Apr", participants: 280, new: 190, returning: 90 },
      { month: "May", participants: 320, new: 210, returning: 110 },
      { month: "Jun", participants: 280, new: 180, returning: 100 }
    ],
    ageDistribution: [
      { name: "18-25", value: 30, color: "#8884d8" },
      { name: "26-35", value: 35, color: "#82ca9d" },
      { name: "36-45", value: 25, color: "#ffc658" },
      { name: "46+", value: 10, color: "#ff7300" }
    ],
    topPerformers: [
      { name: "Fatimah Ali", events: 8, completion: 92 },
      { name: "Chen Wei Ming", events: 7, completion: 89 },
      { name: "Raj Kumar", events: 6, completion: 85 }
    ],
    engagementMetrics: {
      averageRating: 4.4,
      feedbackScore: 88,
      retentionRate: 72
    }
  },
  "lifelong-learning": {
    totalParticipants: 2800,
    activeParticipants: 2450,
    avgAttendancePerEvent: 80,
    completionRate: 89,
    participantGrowth: [
      { month: "Jan", participants: 200, new: 150, returning: 50 },
      { month: "Feb", participants: 250, new: 180, returning: 70 },
      { month: "Mar", participants: 300, new: 200, returning: 100 },
      { month: "Apr", participants: 320, new: 210, returning: 110 },
      { month: "May", participants: 380, new: 240, returning: 140 },
      { month: "Jun", participants: 350, new: 220, returning: 130 }
    ],
    ageDistribution: [
      { name: "18-25", value: 25, color: "#8884d8" },
      { name: "26-35", value: 45, color: "#82ca9d" },
      { name: "36-45", value: 25, color: "#ffc658" },
      { name: "46+", value: 5, color: "#ff7300" }
    ],
    topPerformers: [
      { name: "Lisa Wong", events: 15, completion: 98 },
      { name: "Muhammad Fauzi", events: 13, completion: 94 },
      { name: "Priya Sharma", events: 11, completion: 91 }
    ],
    engagementMetrics: {
      averageRating: 4.8,
      feedbackScore: 95,
      retentionRate: 85
    }
  }
}

export default function SSOParticipantStats() {
  const [selectedPillar, setSelectedPillar] = useState<string>("entrepreneur")
  const [currentData, setCurrentData] = useState<any>(null)

  useEffect(() => {
    if (selectedPillar && mockData[selectedPillar as keyof typeof mockData]) {
      setCurrentData(mockData[selectedPillar as keyof typeof mockData])
    }
  }, [selectedPillar])

  const handlePillarChange = (pillar: string) => {
    setSelectedPillar(pillar)
  }

  return (
    <div className="space-y-6">
      {/* Header with Pillar Selection */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Participant Statistics</h1>
          <p className="text-muted-foreground">Detailed insights on participant engagement and performance</p>
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
          {/* Key Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Participants</CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{currentData.totalParticipants.toLocaleString()}</div>
                <p className="text-xs text-muted-foreground">All time</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Active Participants</CardTitle>
                <UserCheck className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{currentData.activeParticipants.toLocaleString()}</div>
                <p className="text-xs text-muted-foreground">This period</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Avg Attendance</CardTitle>
                <Activity className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{currentData.avgAttendancePerEvent}</div>
                <p className="text-xs text-muted-foreground">per event</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Completion Rate</CardTitle>
                <Target className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{currentData.completionRate}%</div>
                <p className="text-xs text-muted-foreground">Overall</p>
              </CardContent>
            </Card>
          </div>

          {/* Charts Section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Participant Growth */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="h-5 w-5" />
                  Participant Growth
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={currentData.participantGrowth}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Line type="monotone" dataKey="new" stroke="#8884d8" strokeWidth={2} name="New Participants" />
                    <Line type="monotone" dataKey="returning" stroke="#82ca9d" strokeWidth={2} name="Returning Participants" />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            {/* Age Distribution */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="h-5 w-5" />
                  Age Distribution
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <RechartsPieChart>
                    <Pie
                      data={currentData.ageDistribution}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {currentData.ageDistribution.map((entry: any, index: number) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </RechartsPieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>

          {/* Engagement Metrics and Top Performers */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Engagement Metrics */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Award className="h-5 w-5" />
                  Engagement Metrics
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-3 bg-primary/5 rounded-lg">
                    <span className="font-medium">Average Rating</span>
                    <span className="text-2xl font-bold text-primary">{currentData.engagementMetrics.averageRating}/5</span>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-secondary/5 rounded-lg">
                    <span className="font-medium">Feedback Score</span>
                    <span className="text-2xl font-bold text-secondary">{currentData.engagementMetrics.feedbackScore}%</span>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-accent/5 rounded-lg">
                    <span className="font-medium">Retention Rate</span>
                    <span className="text-2xl font-bold text-accent">{currentData.engagementMetrics.retentionRate}%</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Top Performers */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Award className="h-5 w-5" />
                  Top Performers
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {currentData.topPerformers.map((performer: any, index: number) => (
                    <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                      <div>
                        <h4 className="font-medium">{performer.name}</h4>
                        <p className="text-sm text-muted-foreground">{performer.events} events attended</p>
                      </div>
                      <div className="text-right">
                        <div className="text-lg font-bold text-primary">{performer.completion}%</div>
                        <p className="text-xs text-muted-foreground">Completion rate</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Participation Trends */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BarChart className="h-5 w-5" />
                Monthly Participation Breakdown
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={400}>
                <BarChart data={currentData.participantGrowth}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="new" stackId="a" fill="#8884d8" name="New Participants" />
                  <Bar dataKey="returning" stackId="a" fill="#82ca9d" name="Returning Participants" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </>
      )}
    </div>
  )
}