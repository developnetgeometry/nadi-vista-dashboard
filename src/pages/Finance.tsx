import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { FileText, Download, Search, RotateCcw, Eye } from "lucide-react"

const statusCards = [
  { status: "Editing", count: 3, bgColor: "bg-status-editing", textColor: "text-status-editing-foreground" },
  { status: "Submitted", count: 1, bgColor: "bg-status-submitted", textColor: "text-status-submitted-foreground" },
  { status: "Verified", count: 0, bgColor: "bg-status-verified", textColor: "text-status-verified-foreground" },
  { status: "Closed", count: 0, bgColor: "bg-status-closed", textColor: "text-status-closed-foreground" }
]

const financeData = [
  {
    no: 1,
    siteName: "Air Itam",
    month: "July",
    year: 2025,
    phase: "1 DUN 1 NADI",
    region: "Southern",
    status: "editing",
    income: 0.00,
    expense: 0.00,
    profit: 0.00
  },
  {
    no: 2,
    siteName: "Kampung Labuhan Dagang",
    month: "July", 
    year: 2025,
    phase: "Phase 2",
    region: "Central",
    status: "editing",
    income: 29.40,
    expense: 0.00,
    profit: 29.40
  }
]

export default function Finance() {
  const [searchTerm, setSearchTerm] = useState("")
  const [filters, setFilters] = useState({
    status: "",
    month: "July",
    year: "2025",
    region: "",
    phase: ""
  })

  const handleResetFilter = () => {
    setFilters({
      status: "",
      month: "July",
      year: "2025", 
      region: "",
      phase: ""
    })
    setSearchTerm("")
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Finance Dashboard</h1>
          <p className="text-muted-foreground">
            View and export financial statements by month.
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <FileText className="h-4 w-4 mr-2" />
            By Year Report
          </Button>
          <Button>
            <Download className="h-4 w-4 mr-2" />
            Monthly Statements
          </Button>
        </div>
      </div>

      {/* Search and Filters */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search site name..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Button onClick={handleResetFilter} variant="outline" className="gap-2">
              <RotateCcw className="h-4 w-4" />
              Reset Filter
            </Button>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            <Select value={filters.status} onValueChange={(value) => setFilters({ ...filters, status: value })}>
              <SelectTrigger>
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="editing">Editing</SelectItem>
                <SelectItem value="submitted">Submitted</SelectItem>
                <SelectItem value="verified">Verified</SelectItem>
                <SelectItem value="closed">Closed</SelectItem>
              </SelectContent>
            </Select>

            <Select value={filters.month} onValueChange={(value) => setFilters({ ...filters, month: value })}>
              <SelectTrigger>
                <SelectValue placeholder="Month" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="July">July</SelectItem>
                <SelectItem value="August">August</SelectItem>
                <SelectItem value="September">September</SelectItem>
              </SelectContent>
            </Select>

            <Select value={filters.year} onValueChange={(value) => setFilters({ ...filters, year: value })}>
              <SelectTrigger>
                <SelectValue placeholder="Year" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="2025">2025</SelectItem>
                <SelectItem value="2024">2024</SelectItem>
              </SelectContent>
            </Select>

            <Select value={filters.region} onValueChange={(value) => setFilters({ ...filters, region: value })}>
              <SelectTrigger>
                <SelectValue placeholder="Region" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Southern">Southern</SelectItem>
                <SelectItem value="Central">Central</SelectItem>
                <SelectItem value="Northern">Northern</SelectItem>
                <SelectItem value="Eastern">Eastern</SelectItem>
              </SelectContent>
            </Select>

            <Select value={filters.phase} onValueChange={(value) => setFilters({ ...filters, phase: value })}>
              <SelectTrigger>
                <SelectValue placeholder="Phase" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Phase 1">Phase 1</SelectItem>
                <SelectItem value="Phase 2">Phase 2</SelectItem>
                <SelectItem value="1 DUN 1 NADI">1 DUN 1 NADI</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Status Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {statusCards.map((card) => (
          <Card key={card.status} className={`${card.bgColor} border-0`}>
            <CardContent className="p-6 text-center">
              <div className={`text-3xl font-bold ${card.textColor}`}>
                {card.count}
              </div>
              <p className={`text-sm font-medium ${card.textColor} mt-2`}>
                {card.status}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Finance Table */}
      <Card>
        <CardContent className="pt-6">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>No</TableHead>
                <TableHead>Site Name</TableHead>
                <TableHead>Month</TableHead>
                <TableHead>Year</TableHead>
                <TableHead>Phase</TableHead>
                <TableHead>Region</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Income</TableHead>
                <TableHead>Expense</TableHead>
                <TableHead>Profit</TableHead>
                <TableHead>Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {financeData.map((row) => (
                <TableRow key={row.no}>
                  <TableCell>{row.no}</TableCell>
                  <TableCell className="font-medium">{row.siteName}</TableCell>
                  <TableCell>{row.month}</TableCell>
                  <TableCell>{row.year}</TableCell>
                  <TableCell>{row.phase}</TableCell>
                  <TableCell>{row.region}</TableCell>
                  <TableCell>
                    <Badge 
                      variant="secondary" 
                      className={row.status === 'editing' ? 'bg-status-editing text-status-editing-foreground' : ''}
                    >
                      {row.status}
                    </Badge>
                  </TableCell>
                  <TableCell>{row.income.toFixed(2)}</TableCell>
                  <TableCell>{row.expense.toFixed(2)}</TableCell>
                  <TableCell>{row.profit.toFixed(2)}</TableCell>
                  <TableCell>
                    <Button size="sm" variant="outline">
                      <Eye className="h-4 w-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}