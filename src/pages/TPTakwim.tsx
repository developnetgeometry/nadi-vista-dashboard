import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { CalendarIcon, TrendingUp, Filter, Plus, Clock, Users, MapPin } from "lucide-react"
import { useState } from "react"
import { addDays, format } from "date-fns"

const eventStats = [
  { status: "Upcoming Events", count: 8, bgColor: "bg-blue-50", textColor: "text-blue-600", borderColor: "border-blue-200" },
  { status: "Ongoing Events", count: 3, bgColor: "bg-green-50", textColor: "text-green-600", borderColor: "border-green-200" },
  { status: "Completed Events", count: 15, bgColor: "bg-gray-50", textColor: "text-gray-600", borderColor: "border-gray-200" },
  { status: "Total Participants", count: 1250, bgColor: "bg-purple-50", textColor: "text-purple-600", borderColor: "border-purple-200" }
]

const upcomingEvents = [
  { 
    id: "EVT001", 
    title: "Digital Literacy Training", 
    date: "2024-02-15", 
    time: "09:00 AM", 
    location: "KL Convention Center", 
    participants: 150,
    status: "Scheduled",
    category: "Training"
  },
  { 
    id: "EVT002", 
    title: "NADI Network Upgrade", 
    date: "2024-02-20", 
    time: "02:00 PM", 
    location: "Cyberjaya", 
    participants: 80,
    status: "Confirmed",
    category: "Maintenance"
  },
  { 
    id: "EVT003", 
    title: "Rural Connectivity Workshop", 
    date: "2024-02-25", 
    time: "10:30 AM", 
    location: "Ipoh Community Center", 
    participants: 200,
    status: "Scheduled",
    category: "Workshop"
  }
]

export default function TPTakwim() {
  const [selectedYear, setSelectedYear] = useState("2024")
  const [selectedMonth, setSelectedMonth] = useState("All")
  const [selectedCategory, setSelectedCategory] = useState("All")
  const [date, setDate] = useState<Date>(new Date())

  const totalEvents = eventStats[0].count + eventStats[1].count + eventStats[2].count

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Takwim Events</h1>
          <p className="text-muted-foreground">Manage and schedule events for TP operations</p>
        </div>
        <Button><Plus className="h-4 w-4 mr-2" />New Event</Button>
      </div>

      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="calendar">Calendar View</TabsTrigger>
          <TabsTrigger value="events">Event Management</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          {/* Event Statistics */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <h2 className="text-xl font-semibold">Event Statistics</h2>
              <Badge variant="outline">{totalEvents} Total Events</Badge>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {eventStats.map((stat) => (
                <Card key={stat.status} className={`${stat.bgColor} ${stat.borderColor} border`}>
                  <CardContent className="p-6 text-center">
                    <div className={`text-3xl font-bold ${stat.textColor}`}>{stat.count.toLocaleString()}</div>
                    <p className={`text-sm font-medium ${stat.textColor} mt-2`}>{stat.status}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Upcoming Events */}
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold">Upcoming Events</h2>
              <div className="flex items-center gap-2">
                <Filter className="h-4 w-4" />
                <span className="text-sm text-muted-foreground">Filters:</span>
                <Select value={selectedYear} onValueChange={setSelectedYear}>
                  <SelectTrigger className="w-24">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="2024">2024</SelectItem>
                    <SelectItem value="2023">2023</SelectItem>
                  </SelectContent>
                </Select>
                <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                  <SelectTrigger className="w-32">
                    <SelectValue placeholder="Category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="All">All Categories</SelectItem>
                    <SelectItem value="Training">Training</SelectItem>
                    <SelectItem value="Workshop">Workshop</SelectItem>
                    <SelectItem value="Maintenance">Maintenance</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CalendarIcon className="h-5 w-5" />
                  Event Schedule
                </CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="px-6">Event ID</TableHead>
                      <TableHead>Title</TableHead>
                      <TableHead>Category</TableHead>
                      <TableHead>Date & Time</TableHead>
                      <TableHead>Location</TableHead>
                      <TableHead className="text-center">Participants</TableHead>
                      <TableHead className="text-center">Status</TableHead>
                      <TableHead className="text-center">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {upcomingEvents.map((event) => (
                      <TableRow key={event.id} className="hover:bg-muted/50">
                        <TableCell className="font-medium px-6">{event.id}</TableCell>
                        <TableCell className="font-medium">{event.title}</TableCell>
                        <TableCell>
                          <Badge variant="outline">{event.category}</Badge>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <CalendarIcon className="h-4 w-4 text-muted-foreground" />
                            <div>
                              <div className="text-sm font-medium">{event.date}</div>
                              <div className="text-xs text-muted-foreground">{event.time}</div>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <MapPin className="h-4 w-4 text-muted-foreground" />
                            <span className="text-sm">{event.location}</span>
                          </div>
                        </TableCell>
                        <TableCell className="text-center">
                          <div className="flex items-center justify-center gap-1">
                            <Users className="h-4 w-4 text-muted-foreground" />
                            <span>{event.participants}</span>
                          </div>
                        </TableCell>
                        <TableCell className="text-center">
                          <Badge 
                            variant="secondary" 
                            className={
                              event.status === "Confirmed" 
                                ? "bg-green-50 text-green-600 border-green-200" 
                                : "bg-blue-50 text-blue-600 border-blue-200"
                            }
                          >
                            {event.status}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-center">
                          <Button variant="outline" size="sm">Edit</Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="calendar" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <Card className="lg:col-span-2">
              <CardHeader>
                <CardTitle>Event Calendar</CardTitle>
              </CardHeader>
              <CardContent>
                <Calendar
                  mode="single"
                  selected={date}
                  onSelect={(date) => date && setDate(date)}
                  className="rounded-md border"
                />
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Events on {format(date, "PPP")}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {upcomingEvents.filter(event => event.date === format(date, "yyyy-MM-dd")).map((event) => (
                    <div key={event.id} className="p-3 border rounded-lg">
                      <h4 className="font-medium">{event.title}</h4>
                      <p className="text-sm text-muted-foreground">{event.time}</p>
                      <p className="text-sm text-muted-foreground">{event.location}</p>
                      <Badge variant="outline" className="mt-2">{event.category}</Badge>
                    </div>
                  ))}
                  {upcomingEvents.filter(event => event.date === format(date, "yyyy-MM-dd")).length === 0 && (
                    <p className="text-sm text-muted-foreground">No events scheduled for this date.</p>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="events" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Event Management</CardTitle>
              <p className="text-sm text-muted-foreground">Create and manage events for your organization</p>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="text-center py-8">
                  <CalendarIcon className="mx-auto h-12 w-12 text-muted-foreground" />
                  <h3 className="mt-4 text-lg font-medium">Event Management Tools</h3>
                  <p className="text-sm text-muted-foreground mt-2">
                    Use this section to create, edit, and manage all your events
                  </p>
                  <Button className="mt-4">
                    <Plus className="h-4 w-4 mr-2" />
                    Create New Event
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}