"use client"

import { useState } from "react"
import { MainLayout } from "@/components/layout/main-layout"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { UserRole, NotificationType } from "@/types"
import { Bell, Calendar, Check, Clock, FileText, Gavel, MoreHorizontal, Trash2 } from "lucide-react"

// Mock user data
const user = {
  name: "Justice Sharma",
  email: "justice.sharma@courts.gov.in",
  role: UserRole.JUDGE,
}

// Mock notification data
const notifications = [
  {
    id: "notif-001",
    type: NotificationType.HEARING_SCHEDULED,
    title: "Hearing Scheduled",
    message:
      "A new hearing has been scheduled for case CRM-2023-042 (State vs. Williams) on June 20, 2023 at 10:00 AM in Court Room 3.",
    relatedId: "case-002",
    isRead: false,
    createdAt: new Date("2023-06-15T09:30:00"),
  },
  {
    id: "notif-002",
    type: NotificationType.DOCUMENT_UPLOADED,
    title: "New Document Uploaded",
    message: "Adv. Mehta has uploaded a new document 'Evidence Report' for case CRM-2023-042 (State vs. Williams).",
    relatedId: "doc-002",
    isRead: false,
    createdAt: new Date("2023-06-14T15:45:00"),
  },
  {
    id: "notif-003",
    type: NotificationType.CASE_UPDATE,
    title: "Case Status Updated",
    message: "The status of case CIV-2023-156 (Kumar Property Dispute) has been updated to 'Adjourned'.",
    relatedId: "case-004",
    isRead: true,
    createdAt: new Date("2023-06-12T11:20:00"),
  },
  {
    id: "notif-004",
    type: NotificationType.HEARING_RESCHEDULED,
    title: "Hearing Rescheduled",
    message:
      "The hearing for case FAM-2023-103 (Patel Divorce Proceedings) has been rescheduled to June 25, 2023 at 11:00 AM.",
    relatedId: "case-003",
    isRead: true,
    createdAt: new Date("2023-06-10T14:15:00"),
  },
  {
    id: "notif-005",
    type: NotificationType.JUDGMENT_DELIVERED,
    title: "Judgment Delivered",
    message: "A judgment has been delivered for case CRP-2023-027 (ABC Corp vs. XYZ Ltd).",
    relatedId: "case-006",
    isRead: true,
    createdAt: new Date("2023-06-05T16:30:00"),
  },
]

export default function NotificationsPage() {
  const [activeTab, setActiveTab] = useState("all")
  const [notificationList, setNotificationList] = useState(notifications)

  const unreadCount = notificationList.filter((n) => !n.isRead).length

  const filteredNotifications = notificationList.filter((n) => {
    if (activeTab === "all") return true
    if (activeTab === "unread") return !n.isRead
    if (activeTab === "read") return n.isRead
    return true
  })

  const markAsRead = (id: string) => {
    setNotificationList(notificationList.map((n) => (n.id === id ? { ...n, isRead: true } : n)))
  }

  const markAllAsRead = () => {
    setNotificationList(notificationList.map((n) => ({ ...n, isRead: true })))
  }

  const deleteNotification = (id: string) => {
    setNotificationList(notificationList.filter((n) => n.id !== id))
  }

  const getNotificationIcon = (type: NotificationType) => {
    switch (type) {
      case NotificationType.CASE_UPDATE:
        return <FileText className="h-5 w-5 text-blue-500" />
      case NotificationType.HEARING_SCHEDULED:
      case NotificationType.HEARING_RESCHEDULED:
        return <Calendar className="h-5 w-5 text-purple-500" />
      case NotificationType.DOCUMENT_UPLOADED:
        return <FileText className="h-5 w-5 text-amber-500" />
      case NotificationType.SUMMONS:
        return <Bell className="h-5 w-5 text-red-500" />
      case NotificationType.JUDGMENT_DELIVERED:
        return <Gavel className="h-5 w-5 text-green-500" />
      default:
        return <Bell className="h-5 w-5 text-muted-foreground" />
    }
  }

  return (
    <MainLayout user={user}>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold tracking-tight">Notifications</h1>
          {unreadCount > 0 && (
            <Button variant="outline" onClick={markAllAsRead}>
              <Check className="h-4 w-4 mr-2" />
              Mark All as Read
            </Button>
          )}
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
          <TabsList>
            <TabsTrigger value="all">
              All
              <span className="ml-2 text-xs bg-muted px-1.5 py-0.5 rounded-full">{notificationList.length}</span>
            </TabsTrigger>
            <TabsTrigger value="unread">
              Unread
              <span className="ml-2 text-xs bg-primary text-primary-foreground px-1.5 py-0.5 rounded-full">
                {unreadCount}
              </span>
            </TabsTrigger>
            <TabsTrigger value="read">Read</TabsTrigger>
          </TabsList>

          <Card>
            <CardContent className="p-6">
              {filteredNotifications.length === 0 ? (
                <div className="text-center py-8">
                  <Bell className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-lg font-medium mb-2">No notifications</h3>
                  <p className="text-muted-foreground">
                    {activeTab === "unread"
                      ? "You have no unread notifications."
                      : "You have no notifications at this time."}
                  </p>
                </div>
              ) : (
                <div className="space-y-4">
                  {filteredNotifications.map((notification) => (
                    <div
                      key={notification.id}
                      className={`flex items-start gap-4 p-4 rounded-lg border ${!notification.isRead ? "bg-muted/50" : ""}`}
                    >
                      <div className="bg-muted p-2 rounded-full">{getNotificationIcon(notification.type)}</div>
                      <div className="flex-1">
                        <div className="flex items-start justify-between">
                          <div>
                            <h4 className="font-medium">{notification.title}</h4>
                            <p className="text-sm text-muted-foreground mt-1">{notification.message}</p>
                          </div>
                          <div className="flex items-center gap-2">
                            <div className="text-xs text-muted-foreground flex items-center">
                              <Clock className="h-3 w-3 mr-1" />
                              {formatTimeAgo(notification.createdAt)}
                            </div>
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button variant="ghost" size="icon" className="h-8 w-8">
                                  <MoreHorizontal className="h-4 w-4" />
                                  <span className="sr-only">More options</span>
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end">
                                {!notification.isRead && (
                                  <DropdownMenuItem onClick={() => markAsRead(notification.id)}>
                                    <Check className="h-4 w-4 mr-2" />
                                    Mark as read
                                  </DropdownMenuItem>
                                )}
                                <DropdownMenuItem onClick={() => deleteNotification(notification.id)}>
                                  <Trash2 className="h-4 w-4 mr-2" />
                                  Delete
                                </DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </Tabs>
      </div>
    </MainLayout>
  )
}

function formatTimeAgo(date: Date): string {
  const now = new Date()
  const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000)

  if (diffInSeconds < 60) {
    return `${diffInSeconds} seconds ago`
  }

  const diffInMinutes = Math.floor(diffInSeconds / 60)
  if (diffInMinutes < 60) {
    return `${diffInMinutes} minute${diffInMinutes !== 1 ? "s" : ""} ago`
  }

  const diffInHours = Math.floor(diffInMinutes / 60)
  if (diffInHours < 24) {
    return `${diffInHours} hour${diffInHours !== 1 ? "s" : ""} ago`
  }

  const diffInDays = Math.floor(diffInHours / 24)
  if (diffInDays < 30) {
    return `${diffInDays} day${diffInDays !== 1 ? "s" : ""} ago`
  }

  const diffInMonths = Math.floor(diffInDays / 30)
  if (diffInMonths < 12) {
    return `${diffInMonths} month${diffInMonths !== 1 ? "s" : ""} ago`
  }

  const diffInYears = Math.floor(diffInMonths / 12)
  return `${diffInYears} year${diffInYears !== 1 ? "s" : ""} ago`
}

