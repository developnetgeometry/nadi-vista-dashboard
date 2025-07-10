import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
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
  ArrowDown,
  Eye,
  BarChart3,
  Activity,
  Sparkles
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
    <div className="space-y-6 animate-fade-in">
      {/* Enhanced Header */}
      <div className="relative overflow-hidden rounded-xl bg-gradient-to-r from-primary/10 via-primary/5 to-transparent p-8 border border-primary/20">
        <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
        <div className="relative flex items-center justify-between">
          <div className="space-y-2">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-primary/20 rounded-lg backdrop-blur-sm">
                <Sparkles className="h-6 w-6 text-primary" />
              </div>
              <h1 className="text-4xl font-bold tracking-tight bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
                Smart Services Dashboard
              </h1>
            </div>
            <p className="text-muted-foreground text-lg">
              Monitor participation and engagement in smart services programs with real-time insights
            </p>
            <div className="flex items-center gap-4 pt-2">
              <Badge variant="secondary" className="bg-primary/10 text-primary border-primary/20">
                <Activity className="h-3 w-3 mr-1" />
                Live Data
              </Badge>
              <Badge variant="outline" className="text-muted-foreground">
                Last updated: 2 minutes ago
              </Badge>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Button 
              variant="outline" 
              size="sm" 
              onClick={handleRefresh}
              disabled={isRefreshing}
              className="hover:bg-primary/10 hover:border-primary/30 transition-all duration-300"
            >
              <RefreshCw className={`h-4 w-4 mr-2 ${isRefreshing ? 'animate-spin' : ''}`} />
              Refresh
            </Button>
            <Button variant="outline" size="sm" className="hover:bg-primary/10 hover:border-primary/30 transition-all duration-300">
              <Download className="h-4 w-4 mr-2" />
              Export
            </Button>
          </div>
        </div>
      </div>

      {/* Smart Controls */}
      <Card className="border-primary/20 shadow-lg hover:shadow-xl transition-all duration-300">
        <CardContent className="p-6">
          <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
            <div className="flex-1 max-w-md">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search services, categories, or participants..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 border-primary/20 focus:border-primary focus:ring-primary/20"
                />
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Button variant="outline" size="sm" className="hover:bg-primary/10">
                <Filter className="h-4 w-4 mr-2" />
                Filters
              </Button>
              <Button variant="outline" size="sm" className="hover:bg-primary/10">
                <BarChart3 className="h-4 w-4 mr-2" />
                Analytics
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Enhanced Key Participation Stats */}
      <Card className="border-primary/20 overflow-hidden relative group hover:shadow-xl transition-all duration-500 animate-scale-in">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-primary/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
        <CardContent className="p-8 relative">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-6">
              <div className="relative">
                <div className="absolute inset-0 bg-primary/20 rounded-xl blur-xl animate-pulse"></div>
                <div className="relative p-4 bg-gradient-to-br from-primary/20 to-primary/10 rounded-xl backdrop-blur-sm border border-primary/30">
                  <Cpu className="h-10 w-10 text-primary" />
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <p className="text-sm font-medium text-muted-foreground">Smart Services Participation</p>
                  <Badge variant="secondary" className="bg-green-500/10 text-green-600 border-green-200">
                    <ArrowUp className="h-3 w-3 mr-1" />
                    +2.3%
                  </Badge>
                </div>
                <p className="text-4xl font-bold bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
                  {participantStats.participants.toLocaleString()}
                </p>
                <p className="text-sm text-muted-foreground">
                  of {participantStats.total.toLocaleString()} total citizens ({participantStats.percentage}% participation rate)
                </p>
              </div>
            </div>
            <div className="text-right space-y-3">
              <div className="relative">
                <div className="text-6xl font-bold text-primary/20 absolute -inset-2 blur-sm"></div>
                <div className="text-6xl font-bold text-primary relative">{participantStats.percentage}%</div>
              </div>
              <Progress value={participantStats.percentage} className="w-40 h-3" />
              <div className="flex items-center justify-end gap-2 text-sm text-muted-foreground">
                <Eye className="h-4 w-4" />
                <span>Real-time tracking</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Enhanced Participant Categories */}
      <Card className="hover:shadow-lg transition-all duration-300 animate-slide-up border-primary/10">
        <CardHeader className="bg-gradient-to-r from-primary/5 to-transparent">
          <CardTitle className="flex items-center gap-3">
            <div className="p-2 bg-primary/20 rounded-lg">
              <Users className="h-5 w-5 text-primary" />
            </div>
            <span>Participant Categories</span>
            <Badge variant="outline" className="ml-auto text-xs">
              {participantCategories.length} categories
            </Badge>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6 p-6">
          {participantCategories.map((category, index) => (
            <div 
              key={category.category} 
              className="group space-y-3 p-4 rounded-lg hover:bg-muted/50 transition-all duration-300 border border-transparent hover:border-primary/20"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-3">
                  <div className={`w-3 h-3 rounded-full ${category.color} shadow-lg`}></div>
                  <span className="font-semibold text-foreground">{category.category}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-lg font-bold text-primary">
                    {category.count.toLocaleString()}
                  </span>
                  <Badge variant="secondary" className="text-xs">
                    {category.percentage}%
                  </Badge>
                </div>
              </div>
              <div className="relative">
                <Progress 
                  value={category.percentage} 
                  className="h-3 bg-muted group-hover:scale-105 transition-transform duration-300" 
                />
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-full"></div>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Enhanced Demographics Breakdown */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {demographicsData.map((demographic, index) => (
          <Card 
            key={demographic.category} 
            className="hover:shadow-lg transition-all duration-300 border-primary/10 group animate-fade-in"
            style={{ animationDelay: `${index * 200}ms` }}
          >
            <CardHeader className="bg-gradient-to-br from-primary/5 to-transparent">
              <CardTitle className="flex items-center gap-3">
                <div className="p-2 bg-primary/20 rounded-lg group-hover:scale-110 transition-transform duration-300">
                  <User className="h-5 w-5 text-primary" />
                </div>
                <span>By {demographic.category}</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 p-6">
              {demographic.data.map((item, itemIndex) => (
                <div 
                  key={item.label} 
                  className="flex justify-between items-center p-3 rounded-lg hover:bg-primary/5 transition-all duration-200 border border-transparent hover:border-primary/20"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 rounded-full bg-primary opacity-70"></div>
                    <Badge 
                      variant="outline" 
                      className="border-primary/20 text-primary hover:bg-primary/10 transition-colors duration-200"
                    >
                      {item.label}
                    </Badge>
                    <span className="text-sm text-muted-foreground font-medium">
                      {item.count.toLocaleString()}
                    </span>
                  </div>
                  <div className="text-lg font-bold text-primary">{item.percentage}%</div>
                </div>
              ))}
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Enhanced DUSP and State Distribution */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="hover:shadow-lg transition-all duration-300 border-primary/10 animate-slide-up">
          <CardHeader className="bg-gradient-to-r from-primary/5 to-transparent">
            <CardTitle className="flex items-center gap-3">
              <div className="p-2 bg-primary/20 rounded-lg">
                <Building2 className="h-5 w-5 text-primary" />
              </div>
              <span>Participation by DUSP</span>
              <Badge variant="outline" className="ml-auto text-xs">
                Top 5 Providers
              </Badge>
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <div className="space-y-4">
              {duspData.map((dusp, index) => (
                <div 
                  key={dusp.name} 
                  className="flex justify-between items-center p-4 rounded-lg hover:bg-primary/5 transition-all duration-300 border border-transparent hover:border-primary/20 group"
                >
                  <div className="flex items-center gap-4">
                    <div className="text-2xl group-hover:scale-110 transition-transform duration-300">
                      {dusp.logo}
                    </div>
                    <div>
                      <span className="font-semibold text-foreground">{dusp.name}</span>
                      <div className="text-xs text-muted-foreground">
                        Rank #{index + 1}
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-xl font-bold text-primary">
                      {dusp.count.toLocaleString()}
                    </div>
                    <div className="text-xs text-muted-foreground">participants</div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-all duration-300 border-primary/10 animate-slide-up">
          <CardHeader className="bg-gradient-to-r from-primary/5 to-transparent">
            <CardTitle className="flex items-center gap-3">
              <div className="p-2 bg-primary/20 rounded-lg">
                <MapPin className="h-5 w-5 text-primary" />
              </div>
              <span>Participation by State</span>
              <Badge variant="outline" className="ml-auto text-xs">
                {stateData.length} states
              </Badge>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 p-6">
            {stateData.map((state, index) => (
              <div 
                key={state.state} 
                className="space-y-3 p-3 rounded-lg hover:bg-primary/5 transition-all duration-300 border border-transparent hover:border-primary/20 group"
              >
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-primary"></div>
                    <span className="font-semibold text-foreground">{state.state}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-lg font-bold text-primary">
                      {state.count.toLocaleString()}
                    </span>
                    <Badge variant="secondary" className="text-xs">
                      {state.percentage}%
                    </Badge>
                  </div>
                </div>
                <div className="relative">
                  <Progress 
                    value={state.percentage} 
                    className="h-2 group-hover:scale-105 transition-transform duration-300" 
                  />
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* Enhanced Service Categories */}
      <Card className="hover:shadow-lg transition-all duration-300 border-primary/10 animate-fade-in">
        <CardHeader className="bg-gradient-to-r from-primary/5 to-transparent">
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-3">
              <div className="p-2 bg-primary/20 rounded-lg">
                <TrendingUp className="h-5 w-5 text-primary" />
              </div>
              <span>Popular Smart Services</span>
            </CardTitle>
            <Badge variant="outline" className="text-xs">
              Trending Now
            </Badge>
          </div>
        </CardHeader>
        <CardContent className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { service: "Digital Literacy", participants: 1200, growth: "+15%", trend: "up", icon: "📚" },
              { service: "E-Government Services", participants: 980, growth: "+22%", trend: "up", icon: "🏛️" },
              { service: "Online Banking", participants: 850, growth: "+8%", trend: "up", icon: "🏦" },
              { service: "Digital Health", participants: 750, growth: "+35%", trend: "up", icon: "🏥" },
              { service: "E-Commerce", participants: 650, growth: "+18%", trend: "up", icon: "🛒" },
              { service: "Social Media", participants: 550, growth: "+12%", trend: "up", icon: "💬" }
            ].map((service, index) => (
              <Card 
                key={service.service} 
                className="text-center group hover:shadow-lg transition-all duration-300 border-primary/10 hover:border-primary/30 hover:scale-105 animate-scale-in"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <CardContent className="p-6 space-y-4">
                  <div className="text-3xl group-hover:scale-110 transition-transform duration-300">
                    {service.icon}
                  </div>
                  <div>
                    <p className="font-semibold text-sm text-foreground mb-1">
                      {service.service}
                    </p>
                    <p className="text-2xl font-bold text-primary">
                      {service.participants.toLocaleString()}
                    </p>
                    <p className="text-xs text-muted-foreground">participants</p>
                  </div>
                  <div className="flex items-center justify-center gap-1">
                    <Badge 
                      variant="secondary" 
                      className="bg-green-500/10 text-green-600 border-green-200 group-hover:bg-green-500/20 transition-colors duration-300"
                    >
                      <ArrowUp className="h-3 w-3 mr-1" />
                      {service.growth}
                    </Badge>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}