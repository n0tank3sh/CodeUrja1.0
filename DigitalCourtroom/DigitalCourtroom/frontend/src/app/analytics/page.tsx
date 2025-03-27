"use client"

import type React from "react"
import useState from "react"
import dotenv from "dotenv"

import { MainLayout } from "@/components/layout/main-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { UserRole } from "@/types"
import { BarChart, Calendar, Clock, Download, FileText, Gavel, PieChart, TrendingDown, TrendingUp } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Pie, PieChartComponent } from "@/components/ui/piechart"
import { RadarComponent } from "@/components/ui/radar"
import { LineChartComponent } from "@/components/ui/linechart"
import { HearingPieChartEfficiency } from "@/components/ui/hearingeffeciency"
import { BarGraphCourtUtilization } from "@/components/ui/courtutilization"
import { HearingDurationAnalysis } from "@/components/ui/hearingduration"
import { JudgesPerformance } from "@/components/ui/judgesperformance"

// Mock user data
const user = {
  name: "Justice Sharma",
  email: "justice.sharma@courts.gov.in",
  role: UserRole.JUDGE,
}

class TotalCases { 
  total_num: Number
  constructor() { 
    this.total_num = 0;
  }
}

export default async function AnalyticsPage() {
  dotenv.config();
  let backend = process.env["backend"];
  const [total_cases, setTotalCases] = useState<number>(0);
  //let res = await fetch(`${backend}/ncases`);
  //let ncases = await res.json();
  //let n_cases: TotalCases = Object.assign(new TotalCases(), ncases);
  //setTotalCases(n_cases.total_num);
  return (
    <MainLayout user={user}>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold tracking-tight">Analytics Dashboard</h1>
          <div className="flex items-center gap-2">
            <Select defaultValue="last30days">
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select period" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="last7days">Last 7 Days</SelectItem>
                <SelectItem value="last30days">Last 30 Days</SelectItem>
                <SelectItem value="last90days">Last 90 Days</SelectItem>
                <SelectItem value="lastyear">Last Year</SelectItem>
                <SelectItem value="custom">Custom Range</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline" size="icon">
              <Download className="h-4 w-4" />
              <span className="sr-only">Download report</span>
            </Button>
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <AnalyticsCard
            title="Total Cases"
            value= {{
              total_cases
            }}
            trend="+8%"
            trendDirection="up"
            description="vs. previous period"
            icon={<FileText className="h-5 w-5 text-muted-foreground" />}
          />
          <AnalyticsCard
            title="Case Disposal Rate"
            value="68%"
            trend="+12%"
            trendDirection="up"
            description="vs. previous period"
            icon={<Gavel className="h-5 w-5 text-muted-foreground" />}
          />
          <AnalyticsCard
            title="Avg. Resolution Time"
            value="124 days"
            trend="-15%"
            trendDirection="down"
            description="vs. previous period"
            icon={<Clock className="h-5 w-5 text-muted-foreground" />}
          />
          <AnalyticsCard
            title="Adjournment Rate"
            value="22%"
            trend="-3%"
            trendDirection="down"
            description="vs. previous period"
            icon={<Calendar className="h-5 w-5 text-muted-foreground" />}
          />
        </div>

        <Tabs defaultValue="cases" className="space-y-4">
          <TabsList>
            <TabsTrigger value="cases">Case Analytics</TabsTrigger>
            <TabsTrigger value="court">Court Efficiency</TabsTrigger>
            <TabsTrigger value="judges">Judge Performance</TabsTrigger>
          </TabsList>

          <TabsContent value="cases" className="space-y-4 ">
            <div className="grid gap-4 md:grid-cols-2">
              <Card className="flex flex-col ">
                <CardHeader className="bg-transparent ">
                  <CardTitle>Pie Chart</CardTitle>
                  <CardDescription>Browser usage statistics</CardDescription>

                </CardHeader>
                <CardContent className="px-2">
                  <div className="h-80 flex items-center justify-center">
                    {/* <div className="text-center text-muted-foreground">
                      <PieChart className="h-16 w-16 mx-auto mb-4" />
                      <p>Case distribution chart would appear here</p>
                      <p className="text-sm">Showing distribution across different case types</p>
                    </div> */}
                    <PieChartComponent/>
                  </div>
                  <div className="grid grid-cols-2 gap-4 mt-4 px-4">
                    <div className="flex justify-between">
                      <div className="flex items-center gap-2">
                        <div className="h-3 w-3 rounded-full bg-blue-500" />
                        <span className="text-sm text-muted-foreground">Civil</span>
                      </div>
                      <span className="text-sm font-medium">42%</span>
                    </div>
                    <div className="flex justify-between">
                      <div className="flex items-center gap-2">
                        <div className="h-3 w-3 rounded-full bg-red-500" />
                        <span className="text-sm text-muted-foreground">Criminal</span>
                      </div>
                      <span className="text-sm font-medium">28%</span>
                    </div>
                    <div className="flex justify-between">
                      <div className="flex items-center gap-2">
                        <div className="h-3 w-3 rounded-full bg-green-500" />
                        <span className="text-sm text-muted-foreground">Family</span>
                      </div>
                      <span className="text-sm font-medium">18%</span>
                    </div>
                    <div className="flex justify-between">
                      <div className="flex items-center gap-2">
                        <div className="h-3 w-3 rounded-full bg-yellow-500" />
                        <span className="text-sm text-muted-foreground">Other</span>
                      </div>
                      <span className="text-sm font-medium">12%</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Case Status</CardTitle>
                  <CardDescription>Current status breakdown</CardDescription>
                </CardHeader>
                <CardContent className="px-2">
                  <div className="h-80 flex items-center justify-center">
                      <RadarComponent/>
                  </div>
                  <div className="space-y-4 mt-4 px-4">
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-muted-foreground">Pending</span>
                        <span className="text-sm font-medium">35%</span>
                      </div>
                      <div className="h-2 w-full bg-muted rounded-full overflow-hidden">
                        <div className="bg-red-500 h-full w-[35%]" />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-muted-foreground">In Progress</span>
                        <span className="text-sm font-medium">25%</span>
                      </div>
                      <div className="h-2 w-full bg-muted rounded-full overflow-hidden">
                        <div className="bg-amber-500 h-full w-[25%]" />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-muted-foreground">Scheduled</span>
                        <span className="text-sm font-medium">15%</span>
                      </div>
                      <div className="h-2 w-full bg-muted rounded-full overflow-hidden">
                        <div className="bg-blue-500 h-full w-[15%]" />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-muted-foreground">Disposed</span>
                        <span className="text-sm font-medium">25%</span>
                      </div>
                      <div className="h-2 w-full bg-muted rounded-full overflow-hidden">
                        <div className="bg-green-500 h-full w-[25%]" />
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <LineChartComponent />

          </TabsContent>

          <TabsContent value="court" className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle>Hearing Efficiency</CardTitle>
                  <CardDescription>Hearing outcomes analysis</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-80 flex items-center justify-center">
                    <div className="text-center text-muted-foreground">
                      <HearingPieChartEfficiency />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4 mt-4">
                    <div className="flex justify-between">
                      <div className="flex items-center gap-2">
                        <div className="h-3 w-3 rounded-full bg-green-500" />
                        <span className="text-sm text-muted-foreground">Completed</span>
                      </div>
                      <span className="text-sm font-medium">65%</span>
                    </div>
                    <div className="flex justify-between">
                      <div className="flex items-center gap-2">
                        <div className="h-3 w-3 rounded-full bg-amber-500" />
                        <span className="text-sm text-muted-foreground">Adjourned</span>
                      </div>
                      <span className="text-sm font-medium">22%</span>
                    </div>
                    <div className="flex justify-between">
                      <div className="flex items-center gap-2">
                        <div className="h-3 w-3 rounded-full bg-red-500" />
                        <span className="text-sm text-muted-foreground">Cancelled</span>
                      </div>
                      <span className="text-sm font-medium">8%</span>
                    </div>
                    <div className="flex justify-between">
                      <div className="flex items-center gap-2">
                        <div className="h-3 w-3 rounded-full bg-blue-500" />
                        <span className="text-sm text-muted-foreground">Rescheduled</span>
                      </div>
                      <span className="text-sm font-medium">5%</span>
                    </div>
                  </div>
                </CardContent>

                {/* <CardContent>
                </CardContent> */}
              </Card>

              {/* <Card>
                <CardHeader>
                  <CardTitle>Court Utilization</CardTitle>
                  <CardDescription>Courtroom usage analysis</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-80 flex items-center justify-center">
                    <div className="text-center text-muted-foreground">
                      <BarChart className="h-16 w-16 mx-auto mb-4" />
                      <p>Court utilization chart would appear here</p>
                      <p className="text-sm">Showing utilization rates for different courtrooms</p>
                    </div>
                  </div>

                </CardContent>
              </Card> */}


              <BarGraphCourtUtilization />  

            </div>

            {/* <Card>
              <CardHeader>
                <CardTitle>Hearing Duration Analysis</CardTitle>
                <CardDescription>Average hearing duration by case type</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-80 flex items-center justify-center">
                  <div className="text-center text-muted-foreground">
                    <BarChart className="h-16 w-16 mx-auto mb-4" />
                    <p>Hearing duration chart would appear here</p>
                    <p className="text-sm">Showing average hearing duration for different case types</p>
                  </div>
                </div>
              </CardContent>
            </Card> */}

            <HearingDurationAnalysis/>
          </TabsContent>

          <TabsContent value="judges" className="space-y-4">
            {/* <Card>
              <CardHeader>
                <CardTitle>Judge Performance Metrics</CardTitle>
                <CardDescription>Comparative analysis of case disposal rates</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-96 flex items-center justify-center">
                  <div className="text-center text-muted-foreground">
                    <BarChart className="h-16 w-16 mx-auto mb-4" />
                    <p>Judge performance chart would appear here</p>
                    <p className="text-sm">Showing case disposal rates and other metrics by judge</p>
                  </div>
                </div>
              </CardContent>
            </Card> */}
            <JudgesPerformance/>
          </TabsContent>
        </Tabs>
      </div>
    </MainLayout>
  )
}

function AnalyticsCard({
  title,
  value,
  trend,
  trendDirection,
  description,
  icon,
}: {
  title: string
  value: string
  trend: string
  trendDirection: "up" | "down"
  description: string
  icon: React.ReactNode
}) {
  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex items-center justify-between space-x-4">
          <div className="flex flex-col space-y-1">
            <span className="text-sm font-medium text-muted-foreground">{title}</span>
            <span className="text-2xl font-bold">{value}</span>
            <div className="flex items-center gap-1">
              {trendDirection === "up" ? (
                <TrendingUp className="h-3 w-3 text-green-500" />
              ) : (
                <TrendingDown className="h-3 w-3 text-red-500" />
              )}
              <span className={`text-xs ${trendDirection === "up" ? "text-green-500" : "text-red-500"}`}>{trend}</span>
              <span className="text-xs text-muted-foreground">{description}</span>
            </div>
          </div>
          <div className="bg-muted p-3 rounded-full">{icon}</div>
        </div>
      </CardContent>
    </Card>
  )
}

