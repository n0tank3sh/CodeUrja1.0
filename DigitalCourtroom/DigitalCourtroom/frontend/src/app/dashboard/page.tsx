"use client"

import type React from "react"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { MainLayout } from "@/components/layout/main-layout"
import { UserRole } from "@/types"
import { BarChart, Calendar, Clock, FileText, Gavel, Users, AlertTriangle, CheckCircle2, Clock4 } from "lucide-react"
import { PieChartComponent } from "@/components/ui/piechart"
import { RadarComponent } from "@/components/ui/radar"
import { DonutChart } from "@/components/ui/donutchart"
import CountUp from "@/components/ui/countup"

// Mock user data
const user = {
  name: "Justice Sharma",
  email: "justice.sharma@courts.gov.in",
  role: UserRole.JUDGE,
}

export default function DashboardPage() {
  return (
    <MainLayout user={user}>
      <div className="space-y-6">
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <DashboardCard
            title="Total Cases"
            value="1,284"
            description="Active cases in your jurisdiction"
            icon={<FileText className="h-5 w-5 text-muted-foreground" />}
          />
          <DashboardCard
            title="Pending Hearings"
            value="42"
            description="Scheduled for next 7 days"
            icon={<Calendar className="h-5 w-5 text-muted-foreground" />}
          />
          <DashboardCard
            title="Case Disposal Rate"
            value="68%"
            description="Improvement from last month"
            icon={<Gavel className="h-5 w-5 text-muted-foreground" />}
          />
          <DashboardCard
            title="Average Resolution"
            value="124 days"
            description="Down from 145 days last year"
            icon={<Clock className="h-5 w-5 text-muted-foreground" />}
          />
        </div>

        <Tabs defaultValue="overview" className="space-y-4">
          <TabsList>
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="upcoming">Upcoming Hearings</TabsTrigger>
            <TabsTrigger value="recent">Recent Activities</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-base">Case Distribution</CardTitle>
                  <CardDescription>By case type</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-[200px] flex items-center justify-center">
                    <PieChartComponent/>
                  </div>
                  <div className="grid grid-cols-2 gap-4 mt-4 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Civil</span>
                      <span className="font-medium">42%</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Criminal</span>
                      <span className="font-medium">28%</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Family</span>
                      <span className="font-medium">18%</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Other</span>
                      <span className="font-medium">12%</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-base">Case Status</CardTitle>
                  <CardDescription>Current status breakdown</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-[200px] flex items-center justify-center">
                    <div className="text-center text-muted-foreground">
                      <BarChart className="h-10 w-10 mx-auto mb-2" />
                      <p>Case status chart would appear here</p>
                    </div>
                  </div>
                  
                  <div className="space-y-2 mt-4">
                    <div className="flex items-center">
                      <div className="w-full flex items-center gap-2">
                        <div className="h-2 w-full bg-muted rounded-full overflow-hidden">
                          <div className="bg-red-500 h-full w-[35%]" />
                        </div>
                        <span className="text-sm font-medium">35%</span>
                      </div>
                      <span className="text-sm text-muted-foreground ml-2 w-24">Pending</span>
                    </div>
                    <div className="flex items-center">
                      <div className="w-full flex items-center gap-2">
                        <div className="h-2 w-full bg-muted rounded-full overflow-hidden">
                          <div className="bg-amber-500 h-full w-[25%]" />
                        </div>
                        <span className="text-sm font-medium">25%</span>
                      </div>
                      <span className="text-sm text-muted-foreground ml-2 w-24">In Progress</span>
                    </div>
                    <div className="flex items-center">
                      <div className="w-full flex items-center gap-2">
                        <div className="h-2 w-full bg-muted rounded-full overflow-hidden">
                          <div className="bg-green-500 h-full w-[40%]" />
                        </div>
                        <span className="text-sm font-medium">40%</span>
                      </div>
                      <span className="text-sm text-muted-foreground ml-2 w-24">Disposed</span>
                    </div>
                  </div>
                </CardContent>
                
              </Card> */}
              <DonutChart />

             

              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-base">Court Efficiency</CardTitle>
                  <CardDescription>Performance metrics</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center gap-4">
                      <div className="bg-muted p-2 rounded-full">
                        <Clock4 className="h-5 w-5 text-muted-foreground" />
                      </div>
                      <div>
                        <p className="text-sm font-medium">Average Case Duration</p>
                        <p className="text-2xl font-bold"> <CountUp
                          from={0}
                          to={Number(124)}
                          separator=", "
                          duration={1}
                          direction="up"


                        /> days</p>
                        <p className="text-xs text-muted-foreground">
                          <span className="text-green-500">↓ 15%</span> from previous year
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-4">
                      <div className="bg-muted p-2 rounded-full">
                        <CheckCircle2 className="h-5 w-5 text-muted-foreground" />
                      </div>
                      <div>
                        <p className="text-sm font-medium">Case Clearance Rate</p>
                        <p className="text-2xl font-bold">
                          
                         

                          <CountUp
                            from={0}
                            to={Number(105)}
                            separator=", "
                            duration={1}
                            direction="up"


                          />%
                          
                          
                          
                          </p>
                        <p className="text-xs text-muted-foreground">
                          <span className="text-green-500">↑ 8%</span> from previous quarter
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-4">
                      <div className="bg-muted p-2 rounded-full">
                        <AlertTriangle className="h-5 w-5 text-muted-foreground" />
                      </div>
                      <div>
                        <p className="text-sm font-medium">Adjournment Rate</p>
                        <p className="text-2xl font-bold">
                          
                          <CountUp
                            from={0}
                            to={Number(22)}
                            separator=", "
                            duration={1}
                            direction="up"


                          />%
                          
                          
                          
                          </p>
                        <p className="text-xs text-muted-foreground">
                          <span className="text-amber-500">↓ 3%</span> from previous month
                        </p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="upcoming" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Upcoming Hearings</CardTitle>
                <CardDescription>Next 7 days schedule</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <div key={i} className="flex items-start gap-4 pb-4 border-b last:border-0 last:pb-0">
                      <div className="bg-muted p-2 rounded-md text-center min-w-[60px]">
                        <p className="text-sm font-medium">{["Mon", "Tue", "Wed", "Thu", "Fri"][i % 5]}</p>
                        <p className="text-lg font-bold">{i + 10}</p>
                      </div>
                      <div className="flex-1">
                        <p className="font-medium">Case #{1000 + i * 42}</p>
                        <p className="text-sm text-muted-foreground">State vs. Defendant Name</p>
                        <div className="flex items-center gap-2 mt-1">
                          <span className="text-xs bg-muted px-2 py-0.5 rounded-full">
                            {["10:00 AM", "11:30 AM", "2:15 PM", "3:45 PM", "9:30 AM"][i % 5]}
                          </span>
                          <span className="text-xs bg-muted px-2 py-0.5 rounded-full">
                            {["Court Room 3", "Virtual", "Court Room 1", "Court Room 5", "Virtual"][i % 5]}
                          </span>
                          <span className="text-xs bg-muted px-2 py-0.5 rounded-full">
                            {["Hearing", "Arguments", "Evidence", "Witness", "Final Hearing"][i % 5]}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="recent" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Recent Activities</CardTitle>
                <CardDescription>Latest updates in your cases</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <div key={i} className="flex items-start gap-4 pb-4 border-b last:border-0 last:pb-0">
                      <div className="bg-muted p-2 rounded-full">
                        {
                          [
                            <FileText key="1" className="h-5 w-5 text-muted-foreground" />,
                            <Gavel key="2" className="h-5 w-5 text-muted-foreground" />,
                            <Users key="3" className="h-5 w-5 text-muted-foreground" />,
                            <Calendar key="4" className="h-5 w-5 text-muted-foreground" />,
                            <Clock key="5" className="h-5 w-5 text-muted-foreground" />,
                          ][i % 5]
                        }
                      </div>
                      <div className="flex-1">
                        <p className="font-medium">
                          {
                            [
                              "New document uploaded",
                              "Hearing completed",
                              "New party added to case",
                              "Hearing rescheduled",
                              "Case status updated",
                            ][i % 5]
                          }
                        </p>
                        <p className="text-sm text-muted-foreground">Case #{1000 + i * 37}</p>
                        <p className="text-xs text-muted-foreground mt-1">
                          {i} hour{i !== 1 ? "s" : ""} ago
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </MainLayout>
  )
}

function DashboardCard({
  title,
  value,
  description,
  icon,
}: {
  title: string
  value: string
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
           
           
            <span className="text-xs text-muted-foreground">{description}</span>
          </div>
          <div className="bg-muted p-3 rounded-full">{icon}</div>
        </div>
      </CardContent>
    </Card>
  )
}

