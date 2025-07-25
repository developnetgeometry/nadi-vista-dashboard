import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Users, TrendingUp, Filter, UserPlus } from "lucide-react"
import { useState } from "react"

const membershipStats = [
  { status: "Active Members", count: 2350, bgColor: "bg-green-50", textColor: "text-green-600", borderColor: "border-green-200" },
  { status: "Pending Applications", count: 45, bgColor: "bg-orange-50", textColor: "text-orange-600", borderColor: "border-orange-200" },
  { status: "Suspended Members", count: 12, bgColor: "bg-red-50", textColor: "text-red-600", borderColor: "border-red-200" },
  { status: "New This Month", count: 128, bgColor: "bg-blue-50", textColor: "text-blue-600", borderColor: "border-blue-200" }
]

const memberData = [
  { id: "001", name: "Ahmad Rahman", email: "ahmad@example.com", region: "Kuala Lumpur", status: "Active", joinDate: "2024-01-15" },
  { id: "002", name: "Siti Aminah", email: "siti@example.com", region: "Selangor", status: "Active", joinDate: "2024-01-20" },
  { id: "003", name: "Chen Wei", email: "chen@example.com", region: "Penang", status: "Pending", joinDate: "2024-02-01" },
  { id: "004", name: "Raj Kumar", email: "raj@example.com", region: "Johor", status: "Active", joinDate: "2024-02-10" },
  { id: "005", name: "Maria Santos", email: "maria@example.com", region: "Sabah", status: "Suspended", joinDate: "2024-01-05" }
]

export default function TPMembership() {
  const [selectedYear, setSelectedYear] = useState("2024")
  const [selectedRegion, setSelectedRegion] = useState("All")
  const [selectedStatus, setSelectedStatus] = useState("All")

  const totalMembers = membershipStats.reduce((sum, stat) => sum + stat.count, 0)

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Membership Management</h1>
          <p className="text-muted-foreground">Manage member registrations and profiles for TP</p>
        </div>
        <Button><UserPlus className="h-4 w-4 mr-2" />Add New Member</Button>
      </div>

      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="by-region">Membership by Region</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          {/* Total Membership Section */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <h2 className="text-xl font-semibold">Total Membership</h2>
              <Badge variant="outline">{totalMembers.toLocaleString()} Total</Badge>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {membershipStats.map((stat) => (
                <Card key={stat.status} className={`${stat.bgColor} ${stat.borderColor} border`}>
                  <CardContent className="p-6 text-center">
                    <div className={`text-3xl font-bold ${stat.textColor}`}>{stat.count.toLocaleString()}</div>
                    <p className={`text-sm font-medium ${stat.textColor} mt-2`}>{stat.status}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Member List Section */}
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold">Member Directory</h2>
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
                <Select value={selectedRegion} onValueChange={setSelectedRegion}>
                  <SelectTrigger className="w-32">
                    <SelectValue placeholder="Region" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="All">All Regions</SelectItem>
                    <SelectItem value="KL">Kuala Lumpur</SelectItem>
                    <SelectItem value="Selangor">Selangor</SelectItem>
                    <SelectItem value="Penang">Penang</SelectItem>
                  </SelectContent>
                </Select>
                <Select value={selectedStatus} onValueChange={setSelectedStatus}>
                  <SelectTrigger className="w-28">
                    <SelectValue placeholder="Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="All">All</SelectItem>
                    <SelectItem value="Active">Active</SelectItem>
                    <SelectItem value="Pending">Pending</SelectItem>
                    <SelectItem value="Suspended">Suspended</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="h-5 w-5" />
                  Member List
                </CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="px-6">Member ID</TableHead>
                      <TableHead>Name</TableHead>
                      <TableHead>Email</TableHead>
                      <TableHead>Region</TableHead>
                      <TableHead className="text-center">Status</TableHead>
                      <TableHead>Join Date</TableHead>
                      <TableHead className="text-center">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {memberData.map((member) => (
                      <TableRow key={member.id} className="hover:bg-muted/50">
                        <TableCell className="font-medium px-6">{member.id}</TableCell>
                        <TableCell className="font-medium">{member.name}</TableCell>
                        <TableCell>{member.email}</TableCell>
                        <TableCell>{member.region}</TableCell>
                        <TableCell className="text-center">
                          <Badge 
                            variant="secondary" 
                            className={
                              member.status === "Active" ? "bg-green-50 text-green-600 border-green-200" :
                              member.status === "Pending" ? "bg-orange-50 text-orange-600 border-orange-200" :
                              "bg-red-50 text-red-600 border-red-200"
                            }
                          >
                            {member.status}
                          </Badge>
                        </TableCell>
                        <TableCell>{member.joinDate}</TableCell>
                        <TableCell className="text-center">
                          <Button variant="outline" size="sm">View</Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="by-region" className="space-y-6">
          {/* Regional Distribution */}
          <Card>
            <CardHeader>
              <CardTitle>Membership by Region</CardTitle>
              <p className="text-sm text-muted-foreground">Distribution of members across different regions</p>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                {[
                  { region: "Kuala Lumpur", count: 650, color: "text-blue-600" },
                  { region: "Selangor", count: 480, color: "text-green-600" },
                  { region: "Penang", count: 320, color: "text-purple-600" },
                  { region: "Johor", count: 410, color: "text-orange-600" },
                  { region: "Sabah", count: 290, color: "text-red-600" },
                  { region: "Sarawak", count: 200, color: "text-indigo-600" }
                ].map((region) => (
                  <Card key={region.region} className="text-center">
                    <CardContent className="p-4">
                      <div className={`text-2xl font-bold ${region.color}`}>{region.count}</div>
                      <p className="text-sm font-medium mt-1">{region.region}</p>
                      <div className="mt-2">
                        <Progress value={(region.count / 2350) * 100} className="h-2" />
                      </div>
                      <p className="text-xs text-muted-foreground mt-1">
                        {((region.count / 2350) * 100).toFixed(1)}%
                      </p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}