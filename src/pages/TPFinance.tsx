import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { DollarSign, TrendingUp, Filter, Download, CreditCard, Receipt } from "lucide-react"
import { useState } from "react"

const financeStats = [
  { status: "Total Revenue", count: "RM 2.5M", bgColor: "bg-green-50", textColor: "text-green-600", borderColor: "border-green-200" },
  { status: "Monthly Expenses", count: "RM 450K", bgColor: "bg-red-50", textColor: "text-red-600", borderColor: "border-red-200" },
  { status: "Pending Invoices", count: "RM 120K", bgColor: "bg-orange-50", textColor: "text-orange-600", borderColor: "border-orange-200" },
  { status: "Net Profit", count: "RM 1.2M", bgColor: "bg-blue-50", textColor: "text-blue-600", borderColor: "border-blue-200" }
]

const transactionData = [
  { id: "TXN001", date: "2024-02-15", description: "Service Payment - Digital Identity", amount: "RM 25,000", type: "Income", status: "Completed" },
  { id: "TXN002", date: "2024-02-14", description: "Infrastructure Maintenance", amount: "RM 15,000", type: "Expense", status: "Completed" },
  { id: "TXN003", date: "2024-02-13", description: "IoT Connectivity Revenue", amount: "RM 32,000", type: "Income", status: "Completed" },
  { id: "TXN004", date: "2024-02-12", description: "Staff Training Costs", amount: "RM 8,500", type: "Expense", status: "Pending" },
  { id: "TXN005", date: "2024-02-11", description: "Cloud Services Revenue", amount: "RM 18,750", type: "Income", status: "Completed" }
]

export default function TPFinance() {
  const [selectedYear, setSelectedYear] = useState("2024")
  const [selectedMonth, setSelectedMonth] = useState("All")
  const [selectedType, setSelectedType] = useState("All")

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Finance Management</h1>
          <p className="text-muted-foreground">Monitor financial performance and transactions for TP</p>
        </div>
        <Button><Download className="h-4 w-4 mr-2" />Export Report</Button>
      </div>

      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="transactions">Transactions</TabsTrigger>
          <TabsTrigger value="invoices">Invoices</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          {/* Financial Statistics */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <h2 className="text-xl font-semibold">Financial Overview</h2>
              <Badge variant="outline">Current Month</Badge>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {financeStats.map((stat) => (
                <Card key={stat.status} className={`${stat.bgColor} ${stat.borderColor} border`}>
                  <CardContent className="p-6 text-center">
                    <div className={`text-3xl font-bold ${stat.textColor}`}>{stat.count}</div>
                    <p className={`text-sm font-medium ${stat.textColor} mt-2`}>{stat.status}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Financial Performance */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="h-5 w-5" />
                  Revenue Growth
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between text-sm">
                      <span>Monthly Target</span>
                      <span>85%</span>
                    </div>
                    <Progress value={85} className="mt-2" />
                  </div>
                  <div>
                    <div className="flex justify-between text-sm">
                      <span>Quarterly Target</span>
                      <span>72%</span>
                    </div>
                    <Progress value={72} className="mt-2" />
                  </div>
                  <div>
                    <div className="flex justify-between text-sm">
                      <span>Annual Target</span>
                      <span>68%</span>
                    </div>
                    <Progress value={68} className="mt-2" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <DollarSign className="h-5 w-5" />
                  Expense Breakdown
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between text-sm">
                      <span>Infrastructure</span>
                      <span>45%</span>
                    </div>
                    <Progress value={45} className="mt-2" />
                  </div>
                  <div>
                    <div className="flex justify-between text-sm">
                      <span>Personnel</span>
                      <span>30%</span>
                    </div>
                    <Progress value={30} className="mt-2" />
                  </div>
                  <div>
                    <div className="flex justify-between text-sm">
                      <span>Operations</span>
                      <span>25%</span>
                    </div>
                    <Progress value={25} className="mt-2" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="transactions" className="space-y-6">
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold">Transaction History</h2>
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
                <Select value={selectedType} onValueChange={setSelectedType}>
                  <SelectTrigger className="w-32">
                    <SelectValue placeholder="Type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="All">All Types</SelectItem>
                    <SelectItem value="Income">Income</SelectItem>
                    <SelectItem value="Expense">Expense</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CreditCard className="h-5 w-5" />
                  Recent Transactions
                </CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="px-6">Transaction ID</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead>Description</TableHead>
                      <TableHead>Type</TableHead>
                      <TableHead className="text-right">Amount</TableHead>
                      <TableHead className="text-center">Status</TableHead>
                      <TableHead className="text-center">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {transactionData.map((transaction) => (
                      <TableRow key={transaction.id} className="hover:bg-muted/50">
                        <TableCell className="font-medium px-6">{transaction.id}</TableCell>
                        <TableCell>{transaction.date}</TableCell>
                        <TableCell>{transaction.description}</TableCell>
                        <TableCell>
                          <Badge 
                            variant="secondary" 
                            className={
                              transaction.type === "Income" 
                                ? "bg-green-50 text-green-600 border-green-200" 
                                : "bg-red-50 text-red-600 border-red-200"
                            }
                          >
                            {transaction.type}
                          </Badge>
                        </TableCell>
                        <TableCell className={`text-right font-medium ${
                          transaction.type === "Income" ? "text-green-600" : "text-red-600"
                        }`}>
                          {transaction.amount}
                        </TableCell>
                        <TableCell className="text-center">
                          <Badge 
                            variant="secondary" 
                            className={
                              transaction.status === "Completed" 
                                ? "bg-green-50 text-green-600 border-green-200" 
                                : "bg-orange-50 text-orange-600 border-orange-200"
                            }
                          >
                            {transaction.status}
                          </Badge>
                        </TableCell>
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

        <TabsContent value="invoices" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Receipt className="h-5 w-5" />
                Invoice Management
              </CardTitle>
              <p className="text-sm text-muted-foreground">Manage invoices and billing for TP services</p>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="text-center py-8">
                  <Receipt className="mx-auto h-12 w-12 text-muted-foreground" />
                  <h3 className="mt-4 text-lg font-medium">Invoice Management</h3>
                  <p className="text-sm text-muted-foreground mt-2">
                    Create and manage invoices for your services
                  </p>
                  <Button className="mt-4">
                    <Receipt className="h-4 w-4 mr-2" />
                    Create Invoice
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}