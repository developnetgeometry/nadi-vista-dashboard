import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Calendar } from "@/components/ui/calendar"
import { 
  User, 
  Calendar as CalendarIcon, 
  Clock, 
  DollarSign, 
  FileText, 
  CreditCard, 
  GraduationCap,
  Home,
  Heart,
  Plane,
  Baby,
  UserX,
  Download,
  Plus,
  ArrowRight,
  ChevronDown
} from "lucide-react"
import { NavLink } from "react-router-dom"
import { useState } from "react"
import { TrainingSummary } from "@/components/staff/TrainingSummary"

const StaffHome = () => {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date())
  const currentDate = new Date().toLocaleDateString('en-GB', { 
    weekday: 'long',
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  })

  const leaveTypes = [
    { name: "Annual Leave", balance: 12, used: 8, icon: CalendarIcon, color: "blue" },
    { name: "Medical Leave", balance: 5, used: 2, icon: Heart, color: "green" },
    { name: "Compassionate Leave", balance: 3, used: 0, icon: User, color: "purple" },
    { name: "Marriage Leave", balance: 7, used: 0, icon: Heart, color: "pink" },
    { name: "Unpaid Leave", balance: 0, used: 3, icon: UserX, color: "gray" },
    { name: "Maternity Leave", balance: 90, used: 0, icon: Baby, color: "rose" }
  ]

  const quickAccessItems = [
    {
      title: "Leave Application",
      description: "Apply for leave and manage requests",
      icon: FileText,
      url: "/staff/leave",
      color: "blue"
    },
    {
      title: "Replacement Leave",
      description: "Track replacement leave balance",
      icon: Clock,
      url: "/staff/replacement",
      color: "emerald"
    },
    {
      title: "Attendance",
      description: "View attendance records and history",
      icon: Clock,
      url: "/staff/attendance",
      color: "indigo"
    },
    {
      title: "Calendar",
      description: "Manage schedules and events",
      icon: CalendarIcon,
      url: "/staff/calendar",
      color: "violet"
    },
    {
      title: "Training",
      description: "Access training programs and certificates",
      icon: GraduationCap,
      url: "/staff/training",
      color: "amber"
    },
    {
      title: "Payroll",
      description: "View salary and payment details",
      icon: CreditCard,
      url: "/staff/payroll",
      color: "green"
    }
  ]

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Header Section */}
      <div className="relative">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl" />
        <div className="relative p-6 space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-blue-100 rounded-xl">
                <Home className="h-8 w-8 text-blue-600" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">
                  Wan Ikhwan Syamirul Bin Wan Mohd Rizwan
                </h1>
                <p className="text-sm text-gray-600">Staff Manager</p>
                <p className="text-sm text-gray-500">{currentDate}</p>
              </div>
            </div>
            <div className="text-right">
              <div className="text-3xl font-bold text-blue-600">NADI</div>
              <p className="text-sm text-gray-500">HR Management System</p>
            </div>
          </div>
        </div>
      </div>

      {/* Top Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="border-0 shadow-md hover:shadow-lg transition-shadow">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Leave Types</p>
                <p className="text-3xl font-bold text-blue-600">6</p>
              </div>
              <div className="p-3 bg-blue-100 rounded-xl">
                <FileText className="h-6 w-6 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-md hover:shadow-lg transition-shadow">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Present Days</p>
                <p className="text-3xl font-bold text-green-600">22</p>
              </div>
              <div className="p-3 bg-green-100 rounded-xl">
                <Clock className="h-6 w-6 text-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-md hover:shadow-lg transition-shadow">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">On-Time %</p>
                <p className="text-3xl font-bold text-purple-600">98%</p>
              </div>
              <div className="p-3 bg-purple-100 rounded-xl">
                <Clock className="h-6 w-6 text-purple-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-md hover:shadow-lg transition-shadow">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Monthly Salary</p>
                <p className="text-3xl font-bold text-orange-600">RM 4,500</p>
              </div>
              <div className="p-3 bg-orange-100 rounded-xl">
                <DollarSign className="h-6 w-6 text-orange-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Leave Snapshot Section */}
      <Card className="border-0 shadow-md">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="h-5 w-5 text-blue-600" />
            Leave Snapshot
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {leaveTypes.map((leave, index) => (
              <div key={index} className="p-4 border rounded-lg hover:shadow-sm transition-shadow">
                <div className="flex items-center gap-3 mb-2">
                  <leave.icon className={`h-5 w-5 text-${leave.color}-600`} />
                  <h4 className="font-medium text-sm">{leave.name}</h4>
                </div>
                <div className="space-y-1">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Balance:</span>
                    <span className="font-medium">{leave.balance} days</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Used:</span>
                    <span className="font-medium">{leave.used} days</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="flex gap-3 pt-4 border-t">
            <Button className="bg-blue-600 hover:bg-blue-700">
              <Plus className="h-4 w-4 mr-2" />
              Apply Leave
            </Button>
            <Button variant="outline">
              View All Leave Types
              <ArrowRight className="h-4 w-4 ml-2" />
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Attendance Section */}
      <Card className="border-0 shadow-md">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Clock className="h-5 w-5 text-green-600" />
            Attendance Overview
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="grid grid-cols-3 gap-4">
                <div className="text-center p-3 bg-green-50 rounded-lg">
                  <p className="text-sm text-gray-600">Present Days</p>
                  <p className="text-2xl font-bold text-green-600">22</p>
                </div>
                <div className="text-center p-3 bg-orange-50 rounded-lg">
                  <p className="text-sm text-gray-600">Late Days</p>
                  <p className="text-2xl font-bold text-orange-600">1</p>
                </div>
                <div className="text-center p-3 bg-blue-50 rounded-lg">
                  <p className="text-sm text-gray-600">On-Time</p>
                  <p className="text-2xl font-bold text-blue-600">21</p>
                </div>
              </div>
              <div className="p-4 bg-gray-50 rounded-lg">
                <p className="text-sm text-gray-600 mb-1">Average Working Hours</p>
                <p className="text-lg font-semibold">8.2 hours/day</p>
              </div>
            </div>
            <div className="space-y-4">
              <div>
                <p className="text-sm font-medium text-gray-700 mb-2">Select Date for Records</p>
                <Calendar
                  mode="single"
                  selected={selectedDate}
                  onSelect={setSelectedDate}
                  className="rounded-md border"
                />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Payroll Summary */}
      <Card className="border-0 shadow-md">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <CreditCard className="h-5 w-5 text-green-600" />
            Payroll Summary
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            <div className="p-4 bg-green-50 rounded-lg">
              <p className="text-sm text-gray-600">Current Salary</p>
              <p className="text-xl font-bold text-green-600">RM 4,500</p>
            </div>
            <div className="p-4 bg-blue-50 rounded-lg">
              <p className="text-sm text-gray-600">Allowances</p>
              <p className="text-xl font-bold text-blue-600">RM 800</p>
            </div>
            <div className="p-4 bg-purple-50 rounded-lg">
              <p className="text-sm text-gray-600">YTD Income</p>
              <p className="text-xl font-bold text-purple-600">RM 63,600</p>
            </div>
            <div className="p-4 bg-orange-50 rounded-lg">
              <p className="text-sm text-gray-600">YTD Deductions</p>
              <p className="text-xl font-bold text-orange-600">RM 8,500</p>
            </div>
          </div>
          <Button className="bg-green-600 hover:bg-green-700">
            <Download className="h-4 w-4 mr-2" />
            Download Annual Statement
          </Button>
        </CardContent>
      </Card>

      {/* Training Summary */}
      <TrainingSummary />

      {/* Quick Access Menu */}
      <Card className="border-0 shadow-md">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Home className="h-5 w-5 text-indigo-600" />
            Quick Access Menu
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {quickAccessItems.map((item, index) => (
              <NavLink
                key={index}
                to={item.url}
                className="group p-4 border rounded-lg hover:shadow-md transition-all hover:border-blue-200"
              >
                <div className="flex items-start gap-4">
                  <div className={`p-3 bg-${item.color}-100 rounded-xl group-hover:bg-${item.color}-200 transition-colors`}>
                    <item.icon className={`h-6 w-6 text-${item.color}-600`} />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">
                      {item.title}
                    </h3>
                    <p className="text-sm text-gray-600 mt-1">{item.description}</p>
                  </div>
                  <ArrowRight className="h-5 w-5 text-gray-400 group-hover:text-blue-600 transition-colors" />
                </div>
              </NavLink>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Mobile Bottom Menu (Hidden on desktop) */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t shadow-lg md:hidden">
        <div className="grid grid-cols-4 gap-1">
          <NavLink to="/staff/leave" className="p-3 text-center">
            <FileText className="h-5 w-5 mx-auto mb-1" />
            <span className="text-xs">Leave</span>
          </NavLink>
          <NavLink to="/staff/attendance" className="p-3 text-center">
            <Clock className="h-5 w-5 mx-auto mb-1" />
            <span className="text-xs">Attendance</span>
          </NavLink>
          <NavLink to="/staff/payroll" className="p-3 text-center">
            <DollarSign className="h-5 w-5 mx-auto mb-1" />
            <span className="text-xs">Payroll</span>
          </NavLink>
          <NavLink to="/staff" className="p-3 text-center">
            <User className="h-5 w-5 mx-auto mb-1" />
            <span className="text-xs">Profile</span>
          </NavLink>
        </div>
      </div>
    </div>
  )
}

export default StaffHome