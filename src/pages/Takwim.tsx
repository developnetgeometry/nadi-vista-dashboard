import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Calendar, Clock, MapPin, Users } from "lucide-react"

const events = [
  {
    id: 1,
    title: "Digital Skills Workshop",
    description: "Learn essential digital literacy skills",
    date: "2024-12-15",
    time: "09:00 AM",
    location: "NADI Kuala Lumpur",
    category: "NADI4U",
    participants: 45
  },
  {
    id: 2,
    title: "Entrepreneur Bootcamp",
    description: "Business development for local entrepreneurs",
    date: "2024-12-18",
    time: "02:00 PM", 
    location: "NADI Penang",
    category: "Pupuk",
    participants: 32
  }
]

export default function Takwim() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Takwim (Calendar)</h1>
          <p className="text-muted-foreground">View and manage NADI events and programs</p>
        </div>
        <Button><Calendar className="h-4 w-4 mr-2" />Add Event</Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader><CardTitle>Calendar View</CardTitle></CardHeader>
          <CardContent>
            <div className="h-64 bg-muted rounded-lg flex items-center justify-center">
              <div className="text-center">
                <Calendar className="h-12 w-12 text-muted-foreground mx-auto mb-2" />
                <p className="text-muted-foreground">Calendar Component</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader><CardTitle>Upcoming Events</CardTitle></CardHeader>
          <CardContent className="space-y-4">
            {events.map((event) => (
              <div key={event.id} className="border rounded-lg p-4 space-y-2">
                <div className="flex justify-between items-start">
                  <h4 className="font-semibold">{event.title}</h4>
                  <Badge>{event.category}</Badge>
                </div>
                <p className="text-sm text-muted-foreground">{event.description}</p>
                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <Clock className="h-4 w-4" />
                    {event.date} {event.time}
                  </div>
                  <div className="flex items-center gap-1">
                    <MapPin className="h-4 w-4" />
                    {event.location}
                  </div>
                  <div className="flex items-center gap-1">
                    <Users className="h-4 w-4" />
                    {event.participants}
                  </div>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}