import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Users, TrendingUp, MapPin, Building2, User, UserCheck } from "lucide-react"

const membershipStats = [
  { title: "Total NADI Membership", count: "2,150,217", icon: Users },
  { title: "New Membership (from 01/07/2024)", count: "850,217", icon: UserCheck },
]

const demographicsData = [
  { category: "Gender", data: [
    { label: "Male", count: 1200000, percentage: 56 },
    { label: "Female", count: 950217, percentage: 44 }
  ]},
  { category: "Age Group", data: [
    { label: "18-25", count: 450000, percentage: 21 },
    { label: "26-35", count: 680000, percentage: 32 },
    { label: "36-45", count: 520000, percentage: 24 },
    { label: "46-60", count: 380000, percentage: 18 },
    { label: "60+", count: 120217, percentage: 5 }
  ]},
  { category: "Race", data: [
    { label: "Malay", count: 1290000, percentage: 60 },
    { label: "Chinese", count: 430000, percentage: 20 },
    { label: "Indian", count: 280000, percentage: 13 },
    { label: "Others", count: 150217, percentage: 7 }
  ]}
]

const areaData = [
  { area: "Urban", count: 860000, percentage: 40, color: "bg-blue-500" },
  { area: "Suburban", count: 650000, percentage: 30, color: "bg-green-500" },
  { area: "Rural", count: 430000, percentage: 20, color: "bg-orange-500" },
  { area: "Remote", count: 210217, percentage: 10, color: "bg-red-500" }
]

const duspData = [
  { name: "TM", count: 540000, logo: "🟦" },
  { name: "MAXIS", count: 480000, logo: "🟩" },
  { name: "CELCOMDIGI", count: 390000, logo: "🟨" },
  { name: "REDTONE", count: 340217, logo: "🟥" }
]

export default function Membership() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Membership Dashboard</h1>
          <p className="text-muted-foreground">
            Monitor membership statistics and demographics across NADI centers
          </p>
        </div>
      </div>

      {/* Key Membership Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {membershipStats.map((stat) => (
          <Card key={stat.title}>
            <CardContent className="p-6">
              <div className="flex items-center space-x-4">
                <div className="p-3 bg-primary/10 rounded-lg">
                  <stat.icon className="h-8 w-8 text-primary" />
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">{stat.title}</p>
                  <p className="text-3xl font-bold">{stat.count}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* New Membership by Area */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <MapPin className="h-5 w-5" />
            New Membership by Area
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {areaData.map((area) => (
            <div key={area.area} className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="font-medium">{area.area}</span>
                <span className="text-muted-foreground">
                  {area.count.toLocaleString()} ({area.percentage}%)
                </span>
              </div>
              <Progress value={area.percentage} className="h-2" />
            </div>
          ))}
        </CardContent>
      </Card>

      {/* DUSP Distribution */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Building2 className="h-5 w-5" />
            New Membership by DUSP
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {duspData.map((dusp) => (
              <Card key={dusp.name} className="text-center">
                <CardContent className="p-4">
                  <div className="text-3xl mb-2">{dusp.logo}</div>
                  <p className="font-semibold">{dusp.name}</p>
                  <p className="text-2xl font-bold text-primary">{dusp.count.toLocaleString()}</p>
                </CardContent>
              </Card>
            ))}
          </div>
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

      {/* OKU Status */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>OKU Status Distribution</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex justify-between items-center">
              <span>Non-OKU</span>
              <div className="flex items-center gap-2">
                <Progress value={92} className="w-24 h-2" />
                <span className="text-sm font-medium">92%</span>
              </div>
            </div>
            <div className="flex justify-between items-center">
              <span>OKU</span>
              <div className="flex items-center gap-2">
                <Progress value={8} className="w-24 h-2" />
                <span className="text-sm font-medium">8%</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Top Occupations</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {[
              { occupation: "Student", percentage: 28 },
              { occupation: "Self-employed", percentage: 22 },
              { occupation: "Private Sector", percentage: 20 },
              { occupation: "Government", percentage: 15 },
              { occupation: "Unemployed", percentage: 15 }
            ].map((item) => (
              <div key={item.occupation} className="flex justify-between items-center">
                <span>{item.occupation}</span>
                <div className="flex items-center gap-2">
                  <Progress value={item.percentage} className="w-24 h-2" />
                  <span className="text-sm font-medium">{item.percentage}%</span>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}