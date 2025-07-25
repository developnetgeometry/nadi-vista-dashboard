import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { 
  Cpu, 
  Users, 
  TrendingUp, 
  Building2, 
  User, 
  MapPin, 
  Search,
  Filter,
  Download,
  RefreshCw,
  ArrowUp,
  BarChart3,
  Activity,
  Sparkles,
  Eye
} from "lucide-react"
import { useState } from "react"

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
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [isRefreshing, setIsRefreshing] = useState(false)

  const handleRefresh = async () => {
    setIsRefreshing(true)
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000))
    setIsRefreshing(false)
  }

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Smart Services Dashboard</h1>
          <p className="text-muted-foreground">
            Monitor participation and engagement in smart services programs
          </p>
        </div>
      </div>

      {/* Smart Controls */}
      <Card className="border-0 shadow-md">
        <CardContent className="p-6">
          <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
            <div className="flex-1 max-w-md">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search services, categories, or participants..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Button variant="outline" size="sm" className="hover:bg-blue-50">
                <Filter className="h-4 w-4 mr-2" />
                Filters
              </Button>
              <Button variant="outline" size="sm" className="hover:bg-blue-50">
                <BarChart3 className="h-4 w-4 mr-2" />
                Analytics
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Key Participation Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="border-0 shadow-md hover:shadow-lg transition-shadow">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Participants</p>
                <p className="text-3xl font-bold text-blue-600">{participantStats.participants.toLocaleString()}</p>
              </div>
              <div className="p-3 bg-blue-100 rounded-xl">
                <Users className="h-6 w-6 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-md hover:shadow-lg transition-shadow">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Participation Rate</p>
                <p className="text-3xl font-bold text-green-600">{participantStats.percentage}%</p>
              </div>
              <div className="p-3 bg-green-100 rounded-xl">
                <TrendingUp className="h-6 w-6 text-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-md hover:shadow-lg transition-shadow">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Citizens</p>
                <p className="text-3xl font-bold text-purple-600">{participantStats.total.toLocaleString()}</p>
              </div>
              <div className="p-3 bg-purple-100 rounded-xl">
                <User className="h-6 w-6 text-purple-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-md hover:shadow-lg transition-shadow">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Growth Rate</p>
                <p className="text-3xl font-bold text-orange-600">+2.3%</p>
              </div>
              <div className="p-3 bg-orange-100 rounded-xl">
                <ArrowUp className="h-6 w-6 text-orange-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Participant Categories */}
      <Card className="border-0 shadow-md">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users className="h-5 w-5 text-blue-600" />
            Participant Categories
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {participantCategories.map((category, index) => (
            <div key={index} className="p-4 border rounded-lg hover:shadow-sm transition-shadow">
              <div className="flex justify-between items-center mb-2">
                <div className="flex items-center gap-3">
                  <div className={`w-3 h-3 rounded-full ${category.color}`}></div>
                  <h4 className="font-medium text-sm">{category.category}</h4>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-lg font-bold text-blue-600">
                    {category.count.toLocaleString()}
                  </span>
                  <Badge variant="secondary" className="text-xs">
                    {category.percentage}%
                  </Badge>
                </div>
              </div>
              <Progress value={category.percentage} className="h-2" />
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Demographics Breakdown */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {demographicsData.map((demographic, index) => (
          <Card key={index} className="border-0 shadow-md">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User className="h-5 w-5 text-blue-600" />
                By {demographic.category}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {demographic.data.map((item, itemIndex) => (
                <div key={itemIndex} className="flex justify-between items-center p-3 rounded-lg hover:bg-gray-50 transition-all">
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 rounded-full bg-blue-600"></div>
                    <Badge variant="outline" className="text-blue-600 border-blue-200">
                      {item.label}
                    </Badge>
                    <span className="text-sm text-gray-600 font-medium">
                      {item.count.toLocaleString()}
                    </span>
                  </div>
                  <div className="text-lg font-bold text-blue-600">{item.percentage}%</div>
                </div>
              ))}
            </CardContent>
          </Card>
        ))}
      </div>

      {/* DUSP and State Distribution */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="border-0 shadow-md">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Building2 className="h-5 w-5 text-blue-600" />
              Participation by DUSP
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {duspData.map((dusp, index) => (
                <div key={index} className="flex justify-between items-center p-4 rounded-lg hover:bg-gray-50 transition-all">
                  <div className="flex items-center gap-4">
                    <div className="text-2xl">{dusp.logo}</div>
                    <div>
                      <span className="font-semibold">{dusp.name}</span>
                      <div className="text-xs text-gray-500">Rank #{index + 1}</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-xl font-bold text-blue-600">
                      {dusp.count.toLocaleString()}
                    </div>
                    <div className="text-xs text-gray-500">participants</div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-md">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MapPin className="h-5 w-5 text-blue-600" />
              Participation by State
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {stateData.map((state, index) => (
              <div key={index} className="space-y-3 p-3 rounded-lg hover:bg-gray-50 transition-all">
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-blue-600"></div>
                    <span className="font-semibold">{state.state}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-lg font-bold text-blue-600">
                      {state.count.toLocaleString()}
                    </span>
                    <Badge variant="secondary" className="text-xs">
                      {state.percentage}%
                    </Badge>
                  </div>
                </div>
                <Progress value={state.percentage} className="h-2" />
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* Popular Smart Services */}
      <Card className="border-0 shadow-md">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5 text-blue-600" />
            Popular Smart Services
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              { service: "Digital Literacy", participants: 1200, growth: "+15%", icon: "📚" },
              { service: "E-Government Services", participants: 980, growth: "+22%", icon: "🏛️" },
              { service: "Online Banking", participants: 850, growth: "+8%", icon: "🏦" },
              { service: "Digital Health", participants: 750, growth: "+35%", icon: "🏥" },
              { service: "E-Commerce", participants: 650, growth: "+18%", icon: "🛒" },
              { service: "Social Media", participants: 550, growth: "+12%", icon: "💬" }
            ].map((service, index) => (
              <div key={index} className="text-center p-4 border rounded-lg hover:shadow-sm transition-shadow">
                <div className="text-3xl mb-3">{service.icon}</div>
                <div>
                  <p className="font-semibold text-sm mb-1">{service.service}</p>
                  <p className="text-2xl font-bold text-blue-600">
                    {service.participants.toLocaleString()}
                  </p>
                  <p className="text-xs text-gray-500">participants</p>
                </div>
                <div className="mt-2">
                  <Badge variant="secondary" className="bg-green-100 text-green-600">
                    <ArrowUp className="h-3 w-3 mr-1" />
                    {service.growth}
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}