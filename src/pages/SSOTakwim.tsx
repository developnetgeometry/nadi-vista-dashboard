import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Calendar, Clock, MapPin, Users, Search, Filter } from "lucide-react"

const pillars = [
  { id: "entrepreneur", name: "Entrepreneur" },
  { id: "awareness", name: "Awareness" },
  { id: "lifelong-learning", name: "Lifelong Learning" }
]

const eventGroups = [
  "NADI4U",
  "Pupuk Programmes", 
  "Entrepreneurship",
  "ICT",
  "e-Learning",
  "Others"
]

const mockEvents = {
  entrepreneur: {
    nadi2u: [
      {
        id: 1,
        programme: "NADI-Preneur",
        title: "Startup Pitching Workshop",
        description: "Learn how to pitch your business idea effectively to investors",
        date: "2024-12-20",
        time: "09:00 AM",
        location: "NADI Kuala Lumpur",
        nadiName: "NADI KL Central",
        group: "Entrepreneurship",
        participants: 45
      },
      {
        id: 2,
        programme: "Business Mentoring",
        title: "1-on-1 Business Coaching Session",
        description: "Personalized coaching for business development",
        date: "2024-12-22",
        time: "02:00 PM",
        location: "NADI Penang",
        nadiName: "NADI Penang Hub",
        group: "Entrepreneurship",
        participants: 20
      }
    ],
    nadi4u: [
      {
        id: 3,
        programme: "Community Outreach",
        title: "Entrepreneur Network Meetup",
        description: "Connect with local entrepreneurs and share experiences",
        date: "2024-12-25",
        time: "07:00 PM",
        location: "NADI Johor",
        nadiName: "NADI Johor Bahru",
        group: "NADI4U",
        participants: 60
      },
      {
        id: 4,
        programme: "Funding Workshop",
        title: "Grant Application Workshop",
        description: "Learn how to apply for government grants and funding",
        date: "2024-12-28",
        time: "10:00 AM",
        location: "NADI Selangor",
        nadiName: "NADI Shah Alam",
        group: "NADI4U",
        participants: 35
      }
    ]
  },
  awareness: {
    nadi2u: [
      {
        id: 5,
        programme: "Digital Literacy",
        title: "Basic Computer Skills Training",
        description: "Essential computer skills for daily use",
        date: "2024-12-18",
        time: "09:00 AM",
        location: "NADI Kuala Lumpur",
        nadiName: "NADI KL Central",
        group: "ICT",
        participants: 50
      }
    ],
    nadi4u: [
      {
        id: 6,
        programme: "Cyber Security Awareness",
        title: "Online Safety Workshop",
        description: "Learn how to stay safe online and protect your data",
        date: "2024-12-21",
        time: "02:00 PM",
        location: "NADI Penang",
        nadiName: "NADI Penang Hub",
        group: "ICT",
        participants: 40
      }
    ]
  },
  "lifelong-learning": {
    nadi2u: [
      {
        id: 7,
        programme: "Professional Development",
        title: "Leadership Skills Workshop",
        description: "Develop your leadership capabilities",
        date: "2024-12-19",
        time: "09:00 AM",
        location: "NADI Johor",
        nadiName: "NADI Johor Bahru",
        group: "e-Learning",
        participants: 30
      }
    ],
    nadi4u: [
      {
        id: 8,
        programme: "Skills Certification",
        title: "Microsoft Office Certification Prep",
        description: "Prepare for Microsoft Office certification exams",
        date: "2024-12-23",
        time: "10:00 AM",
        location: "NADI Selangor",
        nadiName: "NADI Shah Alam",
        group: "e-Learning",
        participants: 25
      }
    ]
  }
}

export default function SSOTakwim() {
  const [selectedPillar, setSelectedPillar] = useState<string>("")
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedGroup, setSelectedGroup] = useState("all")
  const [currentEvents, setCurrentEvents] = useState<any>({ nadi2u: [], nadi4u: [] })

  useEffect(() => {
    if (selectedPillar && mockEvents[selectedPillar as keyof typeof mockEvents]) {
      setCurrentEvents(mockEvents[selectedPillar as keyof typeof mockEvents])
    }
  }, [selectedPillar])

  const handlePillarChange = (pillar: string) => {
    setSelectedPillar(pillar)
  }

  const filterEvents = (events: any[]) => {
    return events.filter(event => {
      const matchesSearch = event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           event.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           event.programme.toLowerCase().includes(searchTerm.toLowerCase())
      const matchesGroup = selectedGroup === "all" || event.group === selectedGroup
      return matchesSearch && matchesGroup
    })
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
              Please select a pillar to view the calendar.
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
          <h1 className="text-3xl font-bold tracking-tight">Takwim NADI (SSO)</h1>
          <p className="text-muted-foreground">View events for your selected pillar</p>
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

      {/* Filters */}
      <div className="flex gap-4 items-center">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search events..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        <Select value={selectedGroup} onValueChange={setSelectedGroup}>
          <SelectTrigger className="w-48">
            <Filter className="h-4 w-4 mr-2" />
            <SelectValue placeholder="Filter by group" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Groups</SelectItem>
            {eventGroups.map((group) => (
              <SelectItem key={group} value={group}>
                {group}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Calendar with Tabs */}
      <Tabs defaultValue="nadi2u" className="space-y-6">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="nadi2u">NADI2U</TabsTrigger>
          <TabsTrigger value="nadi4u">NADI4U</TabsTrigger>
        </TabsList>

        <TabsContent value="nadi2u" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Calendar View */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calendar className="h-5 w-5" />
                  Calendar View - NADI2U
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-64 bg-muted rounded-lg flex items-center justify-center">
                  <div className="text-center">
                    <Calendar className="h-12 w-12 text-muted-foreground mx-auto mb-2" />
                    <p className="text-muted-foreground">Calendar Component</p>
                    <p className="text-sm text-muted-foreground mt-1">
                      Filtered by: {pillars.find(p => p.id === selectedPillar)?.name}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Events List */}
            <Card>
              <CardHeader>
                <CardTitle>NADI2U Events</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 max-h-80 overflow-y-auto">
                {filterEvents(currentEvents.nadi2u).map((event: any) => (
                  <div key={event.id} className="border rounded-lg p-4 space-y-3 cursor-pointer hover:bg-muted/50 transition-colors">
                    <div className="flex justify-between items-start">
                      <div className="space-y-1">
                        <h4 className="font-semibold">{event.title}</h4>
                        <p className="text-sm font-medium text-primary">{event.programme}</p>
                      </div>
                      <Badge variant="secondary">{event.group}</Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">{event.description}</p>
                    <div className="grid grid-cols-1 gap-2 text-sm text-muted-foreground">
                      <div className="flex items-center gap-2">
                        <Clock className="h-4 w-4" />
                        <span>{event.date} at {event.time}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <MapPin className="h-4 w-4" />
                        <span>{event.location}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Users className="h-4 w-4" />
                        <span>{event.participants} participants</span>
                      </div>
                      <div className="text-xs font-medium text-primary">
                        NADI: {event.nadiName}
                      </div>
                    </div>
                  </div>
                ))}
                {filterEvents(currentEvents.nadi2u).length === 0 && (
                  <div className="text-center py-8 text-muted-foreground">
                    No events found matching your criteria
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="nadi4u" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Calendar View */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calendar className="h-5 w-5" />
                  Calendar View - NADI4U
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-64 bg-muted rounded-lg flex items-center justify-center">
                  <div className="text-center">
                    <Calendar className="h-12 w-12 text-muted-foreground mx-auto mb-2" />
                    <p className="text-muted-foreground">Calendar Component</p>
                    <p className="text-sm text-muted-foreground mt-1">
                      Filtered by: {pillars.find(p => p.id === selectedPillar)?.name}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Events List */}
            <Card>
              <CardHeader>
                <CardTitle>NADI4U Events</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 max-h-80 overflow-y-auto">
                {filterEvents(currentEvents.nadi4u).map((event: any) => (
                  <div key={event.id} className="border rounded-lg p-4 space-y-3 cursor-pointer hover:bg-muted/50 transition-colors">
                    <div className="flex justify-between items-start">
                      <div className="space-y-1">
                        <h4 className="font-semibold">{event.title}</h4>
                        <p className="text-sm font-medium text-primary">{event.programme}</p>
                      </div>
                      <Badge variant="secondary">{event.group}</Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">{event.description}</p>
                    <div className="grid grid-cols-1 gap-2 text-sm text-muted-foreground">
                      <div className="flex items-center gap-2">
                        <Clock className="h-4 w-4" />
                        <span>{event.date} at {event.time}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <MapPin className="h-4 w-4" />
                        <span>{event.location}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Users className="h-4 w-4" />
                        <span>{event.participants} participants</span>
                      </div>
                      <div className="text-xs font-medium text-primary">
                        NADI: {event.nadiName}
                      </div>
                    </div>
                  </div>
                ))}
                {filterEvents(currentEvents.nadi4u).length === 0 && (
                  <div className="text-center py-8 text-muted-foreground">
                    No events found matching your criteria
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}