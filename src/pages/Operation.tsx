import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Settings, Building2, Users, MapPin, UserCheck, AlertTriangle, Info, Download, Filter, Search } from "lucide-react";
import { useState, useMemo } from "react";
import { DateRangePicker } from "@/components/DateRangePicker";
import { PDFDownloadButton } from "@/components/PDFDownloadButton";
import { DateRange } from "@/components/DateRangePicker";
const operationStats = [{
  title: "Total NADI",
  count: "1,099",
  icon: Building2,
  color: "text-blue-600"
}, {
  title: "Open",
  count: "1,044",
  icon: Building2,
  color: "text-green-600"
}, {
  title: "Closed",
  count: "25",
  icon: Building2,
  color: "text-red-600"
}, {
  title: "Docket Open",
  count: "26",
  icon: AlertTriangle,
  color: "text-orange-600"
}];
const areaDistribution = [{
  area: "Urban",
  count: 440,
  percentage: 40,
  color: "bg-blue-500"
}, {
  area: "Suburban",
  count: 330,
  percentage: 30,
  color: "bg-green-500"
}, {
  area: "Rural",
  count: 220,
  percentage: 20,
  color: "bg-orange-500"
}, {
  area: "Remote",
  count: 109,
  percentage: 10,
  color: "bg-red-500"
}];
const nadiByDUSP = [{
  dusp: "TM TECH",
  count: 10,
  color: "text-blue-600"
}, {
  dusp: "MAXIS",
  count: 30,
  color: "text-green-600"
}, {
  dusp: "CELCOMDIGI",
  count: 25,
  color: "text-purple-600"
}, {
  dusp: "TIME",
  count: 15,
  color: "text-orange-600"
}, {
  dusp: "DIGI",
  count: 20,
  color: "text-red-600"
}];
const nadiByTP = [{
  tp: "MYNIC",
  count: 45,
  color: "text-blue-600",
  bgColor: "bg-blue-50",
  iconColor: "text-blue-600"
}, {
  tp: "JKM",
  count: 35,
  color: "text-green-600",
  bgColor: "bg-green-50",
  iconColor: "text-green-600"
}, {
  tp: "DOSM",
  count: 30,
  color: "text-purple-600",
  bgColor: "bg-purple-50",
  iconColor: "text-purple-600"
}, {
  tp: "JPM",
  count: 25,
  color: "text-orange-600",
  bgColor: "bg-orange-50",
  iconColor: "text-orange-600"
}];
const nadiByTPForDUSP = {
  "TM TECH": [{
    tp: "MYNIC",
    count: 8
  }, {
    tp: "JKM",
    count: 2
  }],
  "MAXIS": [{
    tp: "MYNIC",
    count: 18
  }, {
    tp: "JKM",
    count: 12
  }],
  "CELCOMDIGI": [{
    tp: "MYNIC",
    count: 15
  }, {
    tp: "DOSM",
    count: 10
  }],
  "TIME": [{
    tp: "MYNIC",
    count: 10
  }, {
    tp: "JPM",
    count: 5
  }],
  "DIGI": [{
    tp: "MYNIC",
    count: 12
  }, {
    tp: "DOSM",
    count: 8
  }]
};
const officerStats = [{
  role: "Manager",
  total: 550,
  occupied: 520,
  vacancy: 30
}, {
  role: "Assistant Manager",
  total: 549,
  occupied: 489,
  vacancy: 60
}];
const nadiDetails = [{
  name: "NADI Bukit Jalil",
  dusp: "TM",
  status: "Open",
  parliament: "Bandar Tun Razak",
  district: "Kuala Lumpur",
  phase: "Phase 2"
}, {
  name: "NADI Petaling Jaya",
  dusp: "MAXIS",
  status: "Open",
  parliament: "Petaling Jaya",
  district: "Petaling",
  phase: "Phase 1"
}, {
  name: "NADI Johor Bahru",
  dusp: "CELCOMDIGI",
  status: "Maintenance",
  parliament: "Johor Bahru",
  district: "Johor Bahru",
  phase: "Phase 2"
}];

// Mock data for NADI closures
const nadiClosures = [{
  nadiName: "NADI Shah Alam",
  dusp: "TM",
  state: "Selangor",
  district: "Petaling",
  parliament: "Shah Alam",
  dun: "Kota Anggerik",
  reason: "Infrastructure maintenance"
}, {
  nadiName: "NADI Ipoh",
  dusp: "MAXIS",
  state: "Perak",
  district: "Kinta",
  parliament: "Ipoh Barat",
  dun: "Canning",
  reason: "Equipment upgrade"
}, {
  nadiName: "NADI Kota Kinabalu",
  dusp: "CELCOMDIGI",
  state: "Sabah",
  district: "Kota Kinabalu",
  parliament: "Kota Kinabalu",
  dun: "Api-Api",
  reason: "Building renovation"
}];

// Mock data for open dockets
const openDockets = [{
  state: "Selangor",
  totalNadi: 180,
  totalDocketOpen: 8
}, {
  state: "Kuala Lumpur",
  totalNadi: 85,
  totalDocketOpen: 5
}, {
  state: "Johor",
  totalNadi: 150,
  totalDocketOpen: 4
}, {
  state: "Penang",
  totalNadi: 75,
  totalDocketOpen: 3
}, {
  state: "Perak",
  totalNadi: 120,
  totalDocketOpen: 3
}];
export default function Operation() {
  const [closedDialogOpen, setClosedDialogOpen] = useState(false);
  const [maintenanceDialogOpen, setMaintenanceDialogOpen] = useState(false);
  const [duspDialogOpen, setDuspDialogOpen] = useState(false);
  const [selectedDUSP, setSelectedDUSP] = useState<string>("");
  const [selectedDUSPForTP, setSelectedDUSPForTP] = useState<string>("all");
  const [dateRange, setDateRange] = useState<DateRange | undefined>();

  // Filter states - unified filter
  const [nadiAreaMonth, setNadiAreaMonth] = useState<string>("all");
  const [nadiAreaYear, setNadiAreaYear] = useState<string>("all");
  const [officerFilterMonth, setOfficerFilterMonth] = useState<string>("all");
  const [officerFilterYear, setOfficerFilterYear] = useState<string>("all");

  // Search states
  const [genderSearch, setGenderSearch] = useState<string>("");
  const [raceSearch, setRaceSearch] = useState<string>("");
  const [stateSearch, setStateSearch] = useState<string>("");
  const downloadCSV = (data: any[], filename: string) => {
    const headers = Object.keys(data[0]);
    const csvContent = [headers.join(','), ...data.map(row => headers.map(header => `"${row[header]}"`).join(','))].join('\n');
    const blob = new Blob([csvContent], {
      type: 'text/csv;charset=utf-8;'
    });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', filename);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };
  const FilterComponent = ({
    month,
    setMonth,
    year,
    setYear,
    title
  }: {
    month: string;
    setMonth: (value: string) => void;
    year: string;
    setYear: (value: string) => void;
    title: string;
  }) => <div className="flex items-center gap-2 mb-4">
      <Filter className="h-4 w-4" />
      <span className="text-sm font-medium">{title}:</span>
      <Select value={month} onValueChange={setMonth}>
        <SelectTrigger className="w-32">
          <SelectValue placeholder="Month" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All Months</SelectItem>
          <SelectItem value="01">January</SelectItem>
          <SelectItem value="02">February</SelectItem>
          <SelectItem value="03">March</SelectItem>
          <SelectItem value="04">April</SelectItem>
          <SelectItem value="05">May</SelectItem>
          <SelectItem value="06">June</SelectItem>
          <SelectItem value="07">July</SelectItem>
          <SelectItem value="08">August</SelectItem>
          <SelectItem value="09">September</SelectItem>
          <SelectItem value="10">October</SelectItem>
          <SelectItem value="11">November</SelectItem>
          <SelectItem value="12">December</SelectItem>
        </SelectContent>
      </Select>
      <Select value={year} onValueChange={setYear}>
        <SelectTrigger className="w-24">
          <SelectValue placeholder="Year" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All Years</SelectItem>
          <SelectItem value="2024">2024</SelectItem>
          <SelectItem value="2023">2023</SelectItem>
          <SelectItem value="2022">2022</SelectItem>
        </SelectContent>
      </Select>
    </div>;
  const SearchComponent = ({
    search,
    setSearch,
    placeholder
  }: {
    search: string;
    setSearch: (value: string) => void;
    placeholder: string;
  }) => <div className="relative mb-4">
      <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
      <Input placeholder={placeholder} value={search} onChange={e => setSearch(e.target.value)} className="pl-8" />
    </div>;

  // Filter data based on search
  const filteredGenderData = useMemo(() => {
    const data = [{
      gender: "Male",
      count: 585,
      percentage: 58
    }, {
      gender: "Female",
      count: 424,
      percentage: 42
    }];
    return data.filter(item => item.gender.toLowerCase().includes(genderSearch.toLowerCase()));
  }, [genderSearch]);
  const filteredRaceData = useMemo(() => {
    const data = [{
      race: "Malay",
      count: 656,
      percentage: 65
    }, {
      race: "Chinese",
      count: 182,
      percentage: 18
    }, {
      race: "Indian",
      count: 121,
      percentage: 12
    }, {
      race: "Others",
      count: 50,
      percentage: 5
    }];
    return data.filter(item => item.race.toLowerCase().includes(raceSearch.toLowerCase()));
  }, [raceSearch]);
  const filteredStateData = useMemo(() => {
    const data = [{
      state: "Selangor",
      count: 180
    }, {
      state: "Kuala Lumpur",
      count: 85
    }, {
      state: "Johor",
      count: 150
    }, {
      state: "Penang",
      count: 75
    }, {
      state: "Perak",
      count: 120
    }];
    return data.filter(item => item.state.toLowerCase().includes(stateSearch.toLowerCase()));
  }, [stateSearch]);

  // Filter NADI TP data based on selected DUSP
  const filteredNadiTPData = useMemo(() => {
    if (selectedDUSPForTP === "all") {
      return nadiByTP.sort((a, b) => b.count - a.count);
    }
    const tpDataForDusp = nadiByTPForDUSP[selectedDUSPForTP];
    if (!tpDataForDusp) return [];
    
    return tpDataForDusp.map(tp => {
      const originalTP = nadiByTP.find(item => item.tp === tp.tp);
      return originalTP ? { ...originalTP, count: tp.count } : null;
    }).filter((item): item is NonNullable<typeof item> => item !== null)
      .sort((a, b) => b.count - a.count);
  }, [selectedDUSPForTP]);

  return <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Operation Dashboard</h1>
          <p className="text-muted-foreground">
            Monitor NADI operations, maintenance status, and workforce management
          </p>
        </div>
        <PDFDownloadButton filename="operation-dashboard" />
      </div>

      {/* Date Range Filter */}
      <div className="flex items-center gap-4">
        <DateRangePicker value={dateRange} onChange={setDateRange} placeholder="Filter by date range" />
      </div>

      <Tabs defaultValue="operation" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="operation">Operation</TabsTrigger>
          <TabsTrigger value="officer">NADI Officer</TabsTrigger>
        </TabsList>

        <TabsContent value="operation" className="space-y-6 mt-6">

      {/* Operation Statistics */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {operationStats.map(stat => <Card key={stat.title}>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-muted rounded-lg">
                    <stat.icon className={`h-6 w-6 ${stat.color}`} />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">{stat.title}</p>
                    <p className="text-2xl font-bold">{stat.count}</p>
                  </div>
                </div>
                {stat.title === "Closed" && <Dialog open={closedDialogOpen} onOpenChange={setClosedDialogOpen}>
                    <DialogTrigger asChild>
                      <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                        <Info className="h-4 w-4" />
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-4xl">
                      <DialogHeader>
                        <DialogTitle>NADI Closures</DialogTitle>
                      </DialogHeader>
                      <div className="space-y-4">
                        <Table>
                          <TableHeader>
                            <TableRow>
                              <TableHead>NADI Name</TableHead>
                              <TableHead>DUSP</TableHead>
                              <TableHead>State</TableHead>
                              <TableHead>District</TableHead>
                              <TableHead>Parliament</TableHead>
                              <TableHead>DUN</TableHead>
                              <TableHead>Reason</TableHead>
                            </TableRow>
                          </TableHeader>
                          <TableBody>
                            {nadiClosures.map((closure, index) => <TableRow key={index}>
                                <TableCell className="font-medium">{closure.nadiName}</TableCell>
                                <TableCell>{closure.dusp}</TableCell>
                                <TableCell>{closure.state}</TableCell>
                                <TableCell>{closure.district}</TableCell>
                                <TableCell>{closure.parliament}</TableCell>
                                <TableCell>{closure.dun}</TableCell>
                                <TableCell>{closure.reason}</TableCell>
                              </TableRow>)}
                          </TableBody>
                        </Table>
                        <div className="flex justify-end">
                          <Button onClick={() => downloadCSV(nadiClosures, 'nadi-closures.csv')}>
                            <Download className="h-4 w-4 mr-2" />
                            Download
                          </Button>
                        </div>
                      </div>
                    </DialogContent>
                  </Dialog>}
                {stat.title === "Docket Open" && <Dialog open={maintenanceDialogOpen} onOpenChange={setMaintenanceDialogOpen}>
                    <DialogTrigger asChild>
                      <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                        <Info className="h-4 w-4" />
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-2xl">
                      <DialogHeader>
                        <DialogTitle>Open Dockets</DialogTitle>
                      </DialogHeader>
                      <div className="space-y-4">
                        <Table>
                          <TableHeader>
                            <TableRow>
                              <TableHead>State</TableHead>
                              <TableHead>Total NADI</TableHead>
                              <TableHead>Total Docket Open</TableHead>
                            </TableRow>
                          </TableHeader>
                          <TableBody>
                            {openDockets.map((docket, index) => <TableRow key={index}>
                                <TableCell className="font-medium">{docket.state}</TableCell>
                                <TableCell>{docket.totalNadi}</TableCell>
                                <TableCell>{docket.totalDocketOpen}</TableCell>
                              </TableRow>)}
                          </TableBody>
                        </Table>
                        <div className="flex justify-end">
                          <Button onClick={() => downloadCSV(openDockets, 'open-dockets.csv')}>
                            <Download className="h-4 w-4 mr-2" />
                            Download
                          </Button>
                        </div>
                      </div>
                    </DialogContent>
                  </Dialog>}
              </div>
            </CardContent>
          </Card>)}
      </div>

          {/* NADI by Area */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MapPin className="h-5 w-5" />
                NADI by Area
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <FilterComponent month={nadiAreaMonth} setMonth={setNadiAreaMonth} year={nadiAreaYear} setYear={setNadiAreaYear} title="Filter" />
              {areaDistribution.map(area => <div key={area.area} className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="font-medium">{area.area}</span>
                    <span className="text-muted-foreground">
                      {area.count} centers ({area.percentage}%)
                    </span>
                  </div>
                  <Progress value={area.percentage} className="h-2" />
                </div>)}
            </CardContent>
          </Card>

          {/* Total NADI by DUSP */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Building2 className="h-5 w-5" />
                Total NADI by DUSP
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                {nadiByDUSP.map(item => <Card key={item.dusp} className="cursor-pointer hover:shadow-md transition-shadow" onClick={() => {
                setSelectedDUSP(item.dusp);
                setDuspDialogOpen(true);
              }}>
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <div className="p-2 bg-muted rounded-lg">
                            <Building2 className={`h-6 w-6 ${item.color}`} />
                          </div>
                          <div>
                            <p className="font-semibold text-sm">{item.dusp}</p>
                            <p className="text-2xl font-bold">{item.count}</p>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>)}
              </div>
            </CardContent>
          </Card>

          {/* Total NADI by TP */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center gap-2">
                  <Building2 className="h-5 w-5" />
                  Total NADI by TP
                </CardTitle>
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium text-muted-foreground">Filter by DUSP:</span>
                  <Select value={selectedDUSPForTP} onValueChange={setSelectedDUSPForTP}>
                    <SelectTrigger className="w-48">
                      <SelectValue placeholder="Select DUSP" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All DUSP</SelectItem>
                      <SelectItem value="TM TECH">TM TECH</SelectItem>
                      <SelectItem value="MAXIS">MAXIS</SelectItem>
                      <SelectItem value="CELCOMDIGI">CELCOMDIGI</SelectItem>
                      <SelectItem value="TIME">TIME</SelectItem>
                      <SelectItem value="DIGI">DIGI</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {filteredNadiTPData.map(item => <Card key={item.tp} className="cursor-pointer hover:shadow-md transition-shadow">
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <div className="p-2 bg-muted rounded-lg">
                            <Building2 className={`h-6 w-6 ${item.color}`} />
                          </div>
                          <div>
                            <p className="font-semibold text-sm">{item.tp}</p>
                            <p className="text-2xl font-bold">{item.count}</p>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>)}
              </div>
              {filteredNadiTPData.length === 0 && (
                <div className="text-center py-8 text-muted-foreground">
                  No TP data available for selected DUSP
                </div>
              )}
            </CardContent>
          </Card>

          {/* Total NADI by State */}
          <Card>
            <CardHeader>
              <CardTitle>Total NADI by State</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <SearchComponent search={stateSearch} setSearch={setStateSearch} placeholder="Search state..." />
              {filteredStateData.map(item => <div key={item.state} className="flex justify-between items-center">
                  <span>{item.state}</span>
                  <Badge variant="secondary">{item.count}</Badge>
                </div>)}
            </CardContent>
          </Card>

        </TabsContent>

        <TabsContent value="officer" className="space-y-6 mt-6">
          <FilterComponent month={officerFilterMonth} setMonth={setOfficerFilterMonth} year={officerFilterYear} setYear={setOfficerFilterYear} title="Filter Officer Data" />

          {/* NADI Officer Statistics */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {officerStats.map(officer => <Card key={officer.role}>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="p-2 bg-muted rounded-lg">
                        <UserCheck className="h-6 w-6 text-blue-600" />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-muted-foreground">{officer.role}</p>
                        <p className="text-2xl font-bold">{officer.occupied}/{officer.total}</p>
                        <div className="flex gap-4 text-sm mt-1">
                          <span className="text-green-600">Occupied: {officer.occupied}</span>
                          <span className="text-red-600">Vacancy: {officer.vacancy}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="mt-4">
                    <Progress value={officer.occupied / officer.total * 100} className="h-2" />
                  </div>
                </CardContent>
              </Card>)}
          </div>

          {/* Filter for Gender and Race only */}
          <Card>
            
            
          </Card>

          {/* Officer Demographics - Gender and Race only */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Total Nadi Officers by Gender</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <SearchComponent search={genderSearch} setSearch={setGenderSearch} placeholder="Search gender..." />
                {filteredGenderData.map(item => <div key={item.gender} className="flex justify-between items-center">
                    <span>{item.gender}</span>
                    <div className="flex items-center gap-2">
                      <Progress value={item.percentage} className="w-24 h-2" />
                      <span className="text-sm font-medium">{item.count} ({item.percentage}%)</span>
                    </div>
                  </div>)}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Total Nadi Officers by Race</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <SearchComponent search={raceSearch} setSearch={setRaceSearch} placeholder="Search race..." />
                {filteredRaceData.map(item => <div key={item.race} className="flex justify-between items-center">
                    <span>{item.race}</span>
                    <div className="flex items-center gap-2">
                      <Progress value={item.percentage} className="w-16 h-2" />
                      <span className="text-sm font-medium">{item.count} ({item.percentage}%)</span>
                    </div>
                  </div>)}
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>

      {/* DUSP Dialog - Move outside tabs */}
      <Dialog open={duspDialogOpen} onOpenChange={setDuspDialogOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Total NADI by TP - {selectedDUSP}</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>TP</TableHead>
                  <TableHead>Count</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {nadiByTPForDUSP[selectedDUSP]?.map((tp, index) => <TableRow key={index}>
                    <TableCell className="font-medium">{tp.tp}</TableCell>
                    <TableCell>{tp.count}</TableCell>
                  </TableRow>) || <TableRow><TableCell colSpan={2}>No data available</TableCell></TableRow>}
              </TableBody>
            </Table>
            <div className="flex justify-end">
              <Button onClick={() => downloadCSV(nadiByTPForDUSP[selectedDUSP] || [], `nadi-tp-${selectedDUSP.toLowerCase()}.csv`)}>
                <Download className="h-4 w-4 mr-2" />
                Download
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>;
}