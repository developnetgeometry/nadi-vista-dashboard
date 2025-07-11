import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Calendar, Users, Clock, Activity, TrendingUp } from "lucide-react";

// Mock data for different pillars
const pillars = [{
  id: "entrepreneur",
  name: "Entrepreneur"
}, {
  id: "awareness",
  name: "Awareness"
}, {
  id: "lifelong-learning",
  name: "Lifelong Learning"
}];
const mockData = {
  entrepreneur: {
    totalEvents: 42,
    currentMonthEvents: 8,
    currentYearEvents: 42,
    totalParticipants: 3200,
    avgAttendancePerEvent: 76,
    upcomingEvents: [{
      name: "Startup Bootcamp",
      date: "2024-07-15",
      participants: 50
    }, {
      name: "Business Plan Workshop",
      date: "2024-07-20",
      participants: 30
    }, {
      name: "Investor Pitch Day",
      date: "2024-07-25",
      participants: 75
    }],
    recentEvents: [{
      name: "Marketing Fundamentals",
      date: "2024-07-05",
      participants: 45,
      status: "Completed"
    }, {
      name: "Financial Planning",
      date: "2024-07-02",
      participants: 38,
      status: "Completed"
    }]
  },
  awareness: {
    totalEvents: 28,
    currentMonthEvents: 6,
    currentYearEvents: 28,
    totalParticipants: 2100,
    avgAttendancePerEvent: 75,
    upcomingEvents: [{
      name: "Digital Literacy Workshop",
      date: "2024-07-18",
      participants: 40
    }, {
      name: "Cybersecurity Seminar",
      date: "2024-07-22",
      participants: 60
    }],
    recentEvents: [{
      name: "Tech Awareness Campaign",
      date: "2024-07-03",
      participants: 55,
      status: "Completed"
    }, {
      name: "Digital Skills Training",
      date: "2024-07-01",
      participants: 42,
      status: "Completed"
    }]
  },
  "lifelong-learning": {
    totalEvents: 35,
    currentMonthEvents: 7,
    currentYearEvents: 35,
    totalParticipants: 2800,
    avgAttendancePerEvent: 80,
    upcomingEvents: [{
      name: "Professional Development Course",
      date: "2024-07-16",
      participants: 65
    }, {
      name: "Skills Certification Program",
      date: "2024-07-19",
      participants: 45
    }, {
      name: "Leadership Training",
      date: "2024-07-24",
      participants: 35
    }],
    recentEvents: [{
      name: "Communication Skills Workshop",
      date: "2024-07-04",
      participants: 52,
      status: "Completed"
    }, {
      name: "Project Management Training",
      date: "2024-06-30",
      participants: 48,
      status: "Completed"
    }]
  }
};
export default function SSOEventOverview() {
  const [selectedPillar, setSelectedPillar] = useState<string>("entrepreneur");
  const [currentData, setCurrentData] = useState<any>(null);
  useEffect(() => {
    if (selectedPillar && mockData[selectedPillar as keyof typeof mockData]) {
      setCurrentData(mockData[selectedPillar as keyof typeof mockData]);
    }
  }, [selectedPillar]);
  const handlePillarChange = (pillar: string) => {
    setSelectedPillar(pillar);
  };
  return <div className="space-y-6">
      {/* Header with Pillar Selection */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Events Overview</h1>
          <p className="text-muted-foreground">Comprehensive view of events for your selected pillar</p>
        </div>
        <div className="flex items-center gap-4">
          <Select value={selectedPillar} onValueChange={handlePillarChange}>
            <SelectTrigger className="w-48">
              <SelectValue placeholder="Select Pillar" />
            </SelectTrigger>
            <SelectContent>
              {pillars.map(pillar => <SelectItem key={pillar.id} value={pillar.id}>
                  {pillar.name}
                </SelectItem>)}
            </SelectContent>
          </Select>
          <Badge variant="outline" className="text-primary border-primary">
            {pillars.find(p => p.id === selectedPillar)?.name}
          </Badge>
        </div>
      </div>

      {currentData && <>
          {/* Key Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
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

            

            
          </div>

          {/* Upcoming and Recent Events */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Upcoming Events */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="h-5 w-5" />
                  Upcoming Events
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {currentData.upcomingEvents.map((event: any, index: number) => <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                      <div>
                        <h4 className="font-medium">{event.name}</h4>
                        <p className="text-sm text-muted-foreground">{event.date}</p>
                      </div>
                      <div className="text-right">
                        <div className="text-sm font-medium">{event.participants} participants</div>
                        <Badge variant="secondary">Scheduled</Badge>
                      </div>
                    </div>)}
                </div>
              </CardContent>
            </Card>

            {/* Recent Events */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calendar className="h-5 w-5" />
                  Recent Events
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {currentData.recentEvents.map((event: any, index: number) => <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                      <div>
                        <h4 className="font-medium">{event.name}</h4>
                        <p className="text-sm text-muted-foreground">{event.date}</p>
                      </div>
                      <div className="text-right">
                        <div className="text-sm font-medium">{event.participants} participants</div>
                        <Badge variant="outline" className="text-green-600 border-green-600">
                          {event.status}
                        </Badge>
                      </div>
                    </div>)}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Event Summary */}
          <Card>
            <CardHeader>
              <CardTitle>Event Summary</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
                <div className="p-4 bg-primary/5 rounded-lg">
                  <div className="text-2xl font-bold text-primary">
                    {Math.round(currentData.totalEvents / 6)}
                  </div>
                  <p className="text-sm text-muted-foreground">Events per month (avg)</p>
                </div>
                <div className="p-4 bg-secondary/5 rounded-lg">
                  <div className="text-2xl font-bold text-secondary">
                    {Math.round(currentData.totalParticipants / currentData.totalEvents * 100) / 100}
                  </div>
                  <p className="text-sm text-muted-foreground">Participants per event</p>
                </div>
                <div className="p-4 bg-accent/5 rounded-lg">
                  <div className="text-2xl font-bold text-accent">
                    {currentData.upcomingEvents.length}
                  </div>
                  <p className="text-sm text-muted-foreground">Events scheduled</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </>}
    </div>;
}