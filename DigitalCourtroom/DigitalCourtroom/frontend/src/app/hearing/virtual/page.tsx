"use client"

import { useState } from "react"
import { MainLayout } from "@/components/layout/main-layout"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { UserRole } from "@/types"
import { Calendar, Camera, FileText, Mic, MicOff, Monitor, MoreVertical, Phone, Video, VideoOff } from "lucide-react"

// Mock user data
const user = {
  name: "Justice Sharma",
  email: "justice.sharma@courts.gov.in",
  role: UserRole.JUDGE,
}

// Mock hearing data
const currentHearing = {
  id: "hearing-001",
  caseNumber: "CRM-2023-042",
  title: "State vs. Williams",
  scheduledTime: "10:00 AM - 11:30 AM",
  participants: [
    { id: "user-1", name: "Justice Sharma", role: "Judge", isPresent: true },
    { id: "user-2", name: "Adv. Mehta", role: "Prosecutor", isPresent: true },
    { id: "user-3", name: "Adv. Gupta", role: "Defense Counsel", isPresent: true },
    { id: "user-4", name: "Robert Williams", role: "Defendant", isPresent: false },
    { id: "user-5", name: "Officer Singh", role: "Witness", isPresent: true },
  ],
}

// Mock upcoming hearings
const upcomingHearings = [
  {
    id: "hearing-002",
    caseNumber: "CIV-2023-156",
    title: "Kumar Property Dispute",
    scheduledDate: "Today",
    scheduledTime: "2:30 PM - 4:00 PM",
  },
  {
    id: "hearing-003",
    caseNumber: "FAM-2023-103",
    title: "Patel Divorce Proceedings",
    scheduledDate: "Tomorrow",
    scheduledTime: "11:00 AM - 12:30 PM",
  },
  {
    id: "hearing-004",
    caseNumber: "CRP-2023-027",
    title: "ABC Corp vs. XYZ Ltd",
    scheduledDate: "20 Jun 2023",
    scheduledTime: "10:00 AM - 11:30 AM",
  },
]

export default function VirtualHearingPage() {
  const [videoEnabled, setVideoEnabled] = useState(true)
  const [audioEnabled, setAudioEnabled] = useState(true)
  const [isRecording, setIsRecording] = useState(false)
  const [isScreenSharing, setIsScreenSharing] = useState(false)

  return (
    <MainLayout user={user}>
      <div className="space-y-6">
        <h1 className="text-3xl font-bold tracking-tight">Virtual Court Room</h1>

        <Tabs defaultValue="current" className="space-y-4">
          <TabsList>
            <TabsTrigger value="current">Current Hearing</TabsTrigger>
            <TabsTrigger value="upcoming">Upcoming Hearings</TabsTrigger>
            <TabsTrigger value="completed">Completed Hearings</TabsTrigger>
          </TabsList>

          <TabsContent value="current" className="space-y-4">
            {currentHearing ? (
              <>
                <Card>
                  <CardHeader className="pb-3">
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle>{currentHearing.title}</CardTitle>
                        <CardDescription>
                          Case #{currentHearing.caseNumber} • {currentHearing.scheduledTime}
                        </CardDescription>
                      </div>
                      <div className="flex items-center gap-2">
                        <Button variant="destructive" size="sm">
                          End Hearing
                        </Button>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
                      <div className="lg:col-span-3 space-y-4">
                        <div className="aspect-video bg-black rounded-lg relative overflow-hidden">
                          <div className="absolute inset-0 flex items-center justify-center">
                            <Video className="h-16 w-16 text-muted" />
                          </div>
                          <div className="absolute bottom-4 right-4 bg-background/80 backdrop-blur-sm p-2 rounded-md">
                            <div className="text-xs font-medium">Main Camera</div>
                          </div>
                        </div>

                        <div className="flex justify-center gap-4">
                          <Button
                            variant={videoEnabled ? "outline" : "destructive"}
                            size="icon"
                            onClick={() => setVideoEnabled(!videoEnabled)}
                          >
                            {videoEnabled ? <Video className="h-5 w-5" /> : <VideoOff className="h-5 w-5" />}
                            <span className="sr-only">{videoEnabled ? "Disable Video" : "Enable Video"}</span>
                          </Button>

                          <Button
                            variant={audioEnabled ? "outline" : "destructive"}
                            size="icon"
                            onClick={() => setAudioEnabled(!audioEnabled)}
                          >
                            {audioEnabled ? <Mic className="h-5 w-5" /> : <MicOff className="h-5 w-5" />}
                            <span className="sr-only">{audioEnabled ? "Mute" : "Unmute"}</span>
                          </Button>

                          <Button
                            variant={isScreenSharing ? "default" : "outline"}
                            size="icon"
                            onClick={() => setIsScreenSharing(!isScreenSharing)}
                          >
                            <Monitor className="h-5 w-5" />
                            <span className="sr-only">{isScreenSharing ? "Stop Sharing" : "Share Screen"}</span>
                          </Button>

                          <Button
                            variant={isRecording ? "default" : "outline"}
                            size="icon"
                            onClick={() => setIsRecording(!isRecording)}
                          >
                            <Camera className="h-5 w-5" />
                            <span className="sr-only">{isRecording ? "Stop Recording" : "Start Recording"}</span>
                          </Button>

                          <Button variant="destructive" size="icon">
                            <Phone className="h-5 w-5" />
                            <span className="sr-only">Leave</span>
                          </Button>
                        </div>
                      </div>

                      <div className="space-y-4">
                        <div className="border rounded-lg p-4">
                          <div className="flex items-center justify-between mb-4">
                            <h3 className="text-sm font-medium">Participants</h3>
                            <Button variant="ghost" size="icon">
                              <MoreVertical className="h-4 w-4" />
                              <span className="sr-only">More options</span>
                            </Button>
                          </div>

                          <div className="space-y-3">
                            {currentHearing.participants.map((participant) => (
                              <div key={participant.id} className="flex items-center justify-between">
                                <div className="flex items-center gap-2">
                                  <div className="relative">
                                    <div className="h-8 w-8 rounded-full bg-muted flex items-center justify-center">
                                      {participant.name.charAt(0)}
                                    </div>
                                    <div
                                      className={`absolute -bottom-1 -right-1 h-3 w-3 rounded-full border-2 border-background ${participant.isPresent ? "bg-green-500" : "bg-red-500"}`}
                                    />
                                  </div>
                                  <div>
                                    <p className="text-sm font-medium">{participant.name}</p>
                                    <p className="text-xs text-muted-foreground">{participant.role}</p>
                                  </div>
                                </div>
                                <div className="flex items-center gap-1">
                                  <div className="h-2 w-2 rounded-full bg-green-500" />
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>

                        <div className="border rounded-lg p-4">
                          <div className="flex items-center justify-between mb-4">
                            <h3 className="text-sm font-medium">Case Documents</h3>
                            <Button variant="ghost" size="icon">
                              <MoreVertical className="h-4 w-4" />
                              <span className="sr-only">More options</span>
                            </Button>
                          </div>

                          <div className="space-y-2">
                            <Button variant="outline" className="w-full justify-start" size="sm">
                              <FileText className="h-4 w-4 mr-2" />
                              Charge Sheet.pdf
                            </Button>
                            <Button variant="outline" className="w-full justify-start" size="sm">
                              <FileText className="h-4 w-4 mr-2" />
                              Evidence Report.pdf
                            </Button>
                            <Button variant="outline" className="w-full justify-start" size="sm">
                              <FileText className="h-4 w-4 mr-2" />
                              Witness Statement.pdf
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="pb-3">
                    <CardTitle className="text-base">Hearing Transcript</CardTitle>
                    <CardDescription>AI-assisted real-time transcription</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="h-64 overflow-y-auto border rounded-md p-4 space-y-4">
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <span className="font-medium">Justice Sharma:</span>
                          <span className="text-xs text-muted-foreground">10:02 AM</span>
                        </div>
                        <p className="text-sm">
                          Good morning everyone. This is the case of State vs. Williams, case number CRM-2023-042. Let's
                          begin with the prosecution's opening statement.
                        </p>
                      </div>

                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <span className="font-medium">Adv. Mehta:</span>
                          <span className="text-xs text-muted-foreground">10:03 AM</span>
                        </div>
                        <p className="text-sm">
                          Thank you, Your Honor. The prosecution will demonstrate that on the night of January 15th,
                          2023, the defendant, Robert Williams, was involved in...
                        </p>
                      </div>

                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <span className="font-medium">Justice Sharma:</span>
                          <span className="text-xs text-muted-foreground">10:08 AM</span>
                        </div>
                        <p className="text-sm">
                          Thank you, Advocate Mehta. Now, let's hear from the defense counsel. Advocate Gupta, please
                          proceed with your opening statement.
                        </p>
                      </div>

                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <span className="font-medium">Adv. Gupta:</span>
                          <span className="text-xs text-muted-foreground">10:09 AM</span>
                        </div>
                        <p className="text-sm">
                          Thank you, Your Honor. The defense will show that my client, Mr. Williams, was not present at
                          the scene of the alleged crime. We have evidence that...
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </>
            ) : (
              <Card>
                <CardContent className="flex flex-col items-center justify-center py-12">
                  <Calendar className="h-12 w-12 text-muted-foreground mb-4" />
                  <h3 className="text-xl font-medium mb-2">No Active Hearing</h3>
                  <p className="text-muted-foreground text-center max-w-md mb-6">
                    There are no hearings in progress at the moment. Check the upcoming hearings tab to join a scheduled
                    hearing.
                  </p>
                  <Button>Schedule a Hearing</Button>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          <TabsContent value="upcoming" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Upcoming Virtual Hearings</CardTitle>
                <CardDescription>Your scheduled hearings for the next 7 days</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {upcomingHearings.map((hearing) => (
                    <div key={hearing.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-start gap-4">
                        <div className="bg-primary/10 p-3 rounded-full">
                          <Video className="h-5 w-5 text-primary" />
                        </div>
                        <div>
                          <h4 className="font-medium">{hearing.title}</h4>
                          <p className="text-sm text-muted-foreground">Case #{hearing.caseNumber}</p>
                          <div className="flex items-center gap-2 mt-1">
                            <Calendar className="h-3 w-3 text-muted-foreground" />
                            <span className="text-xs text-muted-foreground">
                              {hearing.scheduledDate}, {hearing.scheduledTime}
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Button variant="outline" size="sm">
                          View Details
                        </Button>
                        <Button size="sm">Join Hearing</Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="completed" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Completed Hearings</CardTitle>
                <CardDescription>Access recordings and transcripts of past hearings</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-start gap-4">
                        <div className="bg-muted p-3 rounded-full">
                          <Video className="h-5 w-5 text-muted-foreground" />
                        </div>
                        <div>
                          <h4 className="font-medium">
                            {["State vs. Sharma & Others", "Patel Divorce Proceedings", "ABC Corp vs. XYZ Ltd"][i - 1]}
                          </h4>
                          <p className="text-sm text-muted-foreground">
                            Case #{["CRM-2023-089", "FAM-2023-103", "CRP-2023-027"][i - 1]}
                          </p>
                          <div className="flex items-center gap-2 mt-1">
                            <Calendar className="h-3 w-3 text-muted-foreground" />
                            <span className="text-xs text-muted-foreground">
                              {["15 Jun 2023", "12 Jun 2023", "10 Jun 2023"][i - 1]},{" "}
                              {["10:00 AM - 11:30 AM", "2:30 PM - 4:00 PM", "11:00 AM - 12:30 PM"][i - 1]}
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Button variant="outline" size="sm">
                          View Recording
                        </Button>
                        <Button variant="outline" size="sm">
                          View Transcript
                        </Button>
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

