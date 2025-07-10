import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Cpu, Users, TrendingUp, Building2, User, MapPin } from "lucide-react"

const participantStats = {
  total: 33500,
  participants: 3980,
  percentage: 12
}

const participantCategories = [
  { category: "Children", count: 1200, percentage: 30, color: "bg-blue-500" },
  { category: "Youth", count: 1000, percentage: 25, color: "bg-green-500" },
  { category: "Students", count: 800, percentage: 20, color: "bg-purple-500" },
  { category: "Women", count: 680, percentage: 17, color: "bg-pink-500" },
  { category: "OKU", count: 300, percentage: 8, color: "bg-orange-500" }
]

const demographicsData = [
  { category: "Gender", data: [
    { label: "Female", count: 2200, percentage: 55 },
    { label: "Male", count: 1780, percentage: 45 }
  ]},
  { category: "Race", data: [
    { label: "Malay", count: 2388, percentage: 60 },
    { label: "Chinese", count: 796, percentage: 20 },
    { label: "Indian", count: 517, percentage: 13 },
    { label: "Others", count: 279, percentage: 7 }
  ]},
  { category: "Age Group", data: [
    { label: "12-17", count: 796, percentage: 20 },
    { label: "18-25", count: 1194, percentage: 30 },
    { label: "26-35", count: 955, percentage: 24 },
    { label: "36-50", count: 716, percentage: 18 },
    { label: "50+", count: 319, percentage: 8 }
  ]}
]

const duspData = [
  { name: "TM", count: 1194, logo: "🟦" },
  { name: "MAXIS", count: 955, logo: "🟩" },
  { name: "CELCOMDIGI", count: 796, logo: "🟨" },
  { name: "REDTONE", count: 637, logo: "🟥" },
  { name: "Others", count: 398, logo: "⚫" }
]

const stateData = [
  { state: "Selangor", count: 598, percentage: 15 },
  { state: "Kuala Lumpur", count: 478, percentage: 12 },
  { state: "Johor", count: 438, percentage: 11 },
  { state: "Penang", count: 398, percentage: 10 },
  { state: "Perak", count: 358, percentage: 9 },
  { state: "Others", count: 1710, percentage: 43 }
]

export default function SmartServices() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Smart Services Dashboard</h1>
          <p className="text-muted-foreground">
            Monitor participation and engagement in smart services programs
          </p>
        </div>
      </div>

      {/* Key Participation Stats */}
      <Card className="border-primary">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="p-3 bg-primary/10 rounded-lg">
                <Cpu className="h-8 w-8 text-primary" />
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">Smart Services Participation</p>
                <p className="text-3xl font-bold">
                  {participantStats.participants.toLocaleString()} / {participantStats.total.toLocaleString()}
                </p>
                <p className="text-sm text-muted-foreground">
                  ({participantStats.percentage}% participation rate)
                </p>
              </div>
            </div>
            <div className="text-right">
              <div className="text-4xl font-bold text-primary">{participantStats.percentage}%</div>
              <Progress value={participantStats.percentage} className="w-32 mt-2" />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Participant Categories */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users className="h-5 w-5" />
            Participant Categories
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {participantCategories.map((category) => (
            <div key={category.category} className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="font-medium">{category.category}</span>
                <span className="text-muted-foreground">
                  {category.count.toLocaleString()} ({category.percentage}%)
                </span>
              </div>
              <Progress value={category.percentage} className="h-2" />
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Demographics Breakdown */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {demographicsData.map((demographic) => (
          <Card key={demographic.category}>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User className="h-5 w-5" />
                By {demographic.category}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {demographic.data.map((item) => (
                <div key={item.label} className="flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    <Badge variant="outline">{item.label}</Badge>
                    <span className="text-sm text-muted-foreground">
                      {item.count.toLocaleString()}
                    </span>
                  </div>
                  <div className="text-sm font-medium">{item.percentage}%</div>
                </div>
              ))}
            </CardContent>
          </Card>
        ))}
      </div>

      {/* DUSP and State Distribution */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Building2 className="h-5 w-5" />
              Participation by DUSP
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {duspData.map((dusp) => (
                <div key={dusp.name} className="flex justify-between items-center">
                  <div className="flex items-center gap-3">
                    <span className="text-xl">{dusp.logo}</span>
                    <span className="font-medium">{dusp.name}</span>
                  </div>
                  <div className="text-lg font-bold text-primary">
                    {dusp.count.toLocaleString()}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MapPin className="h-5 w-5" />
              Participation by State
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {stateData.map((state) => (
              <div key={state.state} className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="font-medium">{state.state}</span>
                  <span className="text-muted-foreground">
                    {state.count.toLocaleString()} ({state.percentage}%)
                  </span>
                </div>
                <Progress value={state.percentage} className="h-2" />
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* Service Categories */}
      <Card>
        <CardHeader>
          <CardTitle>Popular Smart Services</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { service: "Digital Literacy", participants: 1200, growth: "+15%" },
              { service: "E-Government Services", participants: 980, growth: "+22%" },
              { service: "Online Banking", participants: 850, growth: "+8%" },
              { service: "Digital Health", participants: 750, growth: "+35%" },
              { service: "E-Commerce", participants: 650, growth: "+18%" },
              { service: "Social Media", participants: 550, growth: "+12%" }
            ].map((service) => (
              <Card key={service.service} className="text-center">
                <CardContent className="p-4">
                  <p className="font-semibold text-sm mb-2">{service.service}</p>
                  <p className="text-xl font-bold text-primary">{service.participants}</p>
                  <Badge variant="secondary" className="mt-2">
                    {service.growth}
                  </Badge>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}