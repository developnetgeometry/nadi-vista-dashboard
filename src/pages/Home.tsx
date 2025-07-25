import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { CalendarDays, MapPin, Users, Building2, TrendingUp, Activity } from "lucide-react";
import { NADIDistributionMap } from "@/components/NADIDistributionMap";
const statusCards = [{
  title: "Total NADI",
  count: "1,069 / 1,099",
  active: true
}, {
  title: "Total Membership",
  count: "2,149,685",
  active: false
}, {
  title: "Operations Open",
  count: "1,044",
  active: false
}, {
  title: "Operations Close",
  count: "25",
  active: false
}, {
  title: "Maintenance Open",
  count: "26",
  active: false
}];
const nadiCategories = [{
  name: "Entrepreneur",
  percentage: 32,
  color: "bg-blue-500"
}, {
  name: "Lifelong Learning",
  percentage: 24,
  color: "bg-green-500"
}, {
  name: "Wellbeing",
  percentage: 18,
  color: "bg-purple-500"
}, {
  name: "Awareness",
  percentage: 16,
  color: "bg-orange-500"
}, {
  name: "Government",
  percentage: 10,
  color: "bg-red-500"
}];
export default function Home() {
  return <div className="space-y-6">
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
        {statusCards.map((card, index) => <Card key={card.title} className={card.active ? "border-primary" : ""}>
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
          </Card>)}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* NADI4U Category Breakdown */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5" />
              NADI4U Category Breakdown
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {nadiCategories.map(category => <div key={category.name} className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="font-medium">{category.name}</span>
                  <span className="text-muted-foreground">{category.percentage}%</span>
                </div>
                <Progress value={category.percentage} className="h-2" />
              </div>)}
          </CardContent>
        </Card>

        {/* NADI Distribution Map */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MapPin className="h-5 w-5" />
              NADI Distribution Map
            </CardTitle>
          </CardHeader>
          <CardContent>
            <NADIDistributionMap />
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
              
              <Badge variant="outline">Partnership</Badge>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>;
}