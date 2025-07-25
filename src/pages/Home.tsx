import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { CalendarDays, MapPin, Users, Building2, TrendingUp, Activity } from "lucide-react"
import { NADIDistributionMap } from "@/components/NADIDistributionMap"

const statusCards = [
  { title: "Total NADI", count: "1,069 / 1,099", active: true, remark: "Refer site_profiles table based on - status 'In Operation'/Total NADI" },
  { title: "Total Membership NADI", count: "2,149,685", active: false, remark: "Refer memberships table" },
  { title: "Operations Open", count: "1,044", active: false, remark: "Refer site_profiles table based on - status 'In Operation'" },
  { title: "Operations Close", count: "25", active: false, remark: "Refer site_closures table based on - status 'Temporarily Close'" },
  { title: "Maintenance Open", count: "26", active: false, remark: "Refer maintenances table based on status 'Open'" }
]

const nadi4uCategories = [
  { name: "NADI x Entrepreneur", count: "3,980", percentage: "12%", remark: "Refer events table for NADI4U" },
  { name: "NADI x Lifelong Learning", count: "23,261", percentage: "23%", remark: "" },
  { name: "NADI x Wellbeing", count: "3,627", percentage: "2%", remark: "" },
  { name: "NADI x Awareness", count: "3,278", percentage: "2%", remark: "" },
  { name: "NADI x Government", count: "57", percentage: "", remark: "No percentage" }
]

const mapDetails = {
  nadiCenter: "NADI Felda Jengka 9",
  coordinates: "Lat Long : 3.816610,102.469935",
  district: "Dun : Pulau Tawar",
  region: "Region : Timur 1",
  phase: "Phase : Clawback 2013",
  status: "Status : In Operation",
  dusp: "DUSP : TM"
}

export default function Home() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Home Overview</h1>
          <p className="text-muted-foreground">
            Welcome to NADI Dashboard - Monitor key statistics and system overview
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <MapPin className="h-4 w-4 mr-2" />
            View Map
          </Button>
          <Button>
            <CalendarDays className="h-4 w-4 mr-2" />
            Latest Events
          </Button>
        </div>
      </div>

      {/* Key Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6">
        {statusCards.map((card, index) => (
          <Card key={card.title} className={card.active ? "border-primary" : ""}>
            <CardContent className="p-6">
              <div className="flex items-center space-x-2">
                <div className="p-2 bg-primary/10 rounded-lg">
                  {index === 0 && <Building2 className="h-5 w-5 text-primary" />}
                  {index === 1 && <Users className="h-5 w-5 text-primary" />}
                  {index > 1 && <Activity className="h-5 w-5 text-primary" />}
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">{card.title}</p>
                  <p className="text-2xl font-bold">{card.count}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* NADI4U Programs */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5" />
              NADI4U Programs
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-sm text-muted-foreground mb-4">Display total and percentage and filter by year.</p>
            {nadi4uCategories.map((category) => (
              <div key={category.name} className="flex justify-between items-center p-3 border rounded-lg">
                <div>
                  <p className="font-medium">{category.name}</p>
                  <p className="text-lg font-bold">{category.count}</p>
                  {category.percentage && <p className="text-sm text-muted-foreground">{category.percentage}</p>}
                </div>
                {category.remark && (
                  <p className="text-xs text-muted-foreground max-w-xs">{category.remark}</p>
                )}
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Maps Section */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MapPin className="h-5 w-5" />
              Maps
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-sm font-medium mb-3">When click, view detail by NADI as below:</p>
            <div className="space-y-2 text-sm">
              <p><span className="font-medium">NADI Center:</span> {mapDetails.nadiCenter}</p>
              <p><span className="font-medium">Coordinates:</span> {mapDetails.coordinates}</p>
              <p><span className="font-medium">District:</span> {mapDetails.district}</p>
              <p><span className="font-medium">Region:</span> {mapDetails.region}</p>
              <p><span className="font-medium">Phase:</span> {mapDetails.phase}</p>
              <p><span className="font-medium">Status:</span> {mapDetails.status}</p>
              <p><span className="font-medium">DUSP:</span> {mapDetails.dusp}</p>
            </div>
            <div className="mt-4 p-3 bg-muted rounded-lg">
              <p className="text-sm">
                <span className="font-medium">Malaysia Maps</span> - When Zoom In Zoom Out, view total based on:
              </p>
              <ul className="text-sm mt-2 space-y-1">
                <li>• Total NADI by State</li>
                <li>• Total NADI by District</li>
                <li>• Total NADI by Parliament</li>
                <li>• Total NADI by Dun</li>
              </ul>
            </div>
            <Button className="w-full mt-4">
              <span className="font-medium">View More</span> button - url link to display NADI Dashboard
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Latest Updates */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Latest Events at NADI</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="border-l-4 border-primary pl-4">
              <h4 className="font-semibold">Digital Skills Workshop</h4>
              <p className="text-sm text-muted-foreground">15 Dec 2024 • NADI Kuala Lumpur</p>
              <p className="text-sm mt-2">
                Empowering communities with essential digital literacy skills
              </p>
            </div>
            <div className="border-l-4 border-secondary pl-4">
              <h4 className="font-semibold">Entrepreneur Bootcamp</h4>
              <p className="text-sm text-muted-foreground">12 Dec 2024 • NADI Penang</p>
              <p className="text-sm mt-2">
                Supporting local entrepreneurs with business development
              </p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Latest News</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <h4 className="font-semibold">NADI Expansion Program 2025</h4>
              <p className="text-sm text-muted-foreground">10 Dec 2024</p>
              <p className="text-sm">
                New strategic initiatives to expand NADI reach across rural communities
              </p>
              <Badge variant="outline">Announcement</Badge>
            </div>
            <div className="space-y-2">
              <h4 className="font-semibold">Partnership with Local Universities</h4>
              <p className="text-sm text-muted-foreground">8 Dec 2024</p>
              <p className="text-sm">
                Collaborative programs to enhance educational opportunities
              </p>
              <Badge variant="outline">Partnership</Badge>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}