"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  Scale,
  LayoutDashboard,
  FileText,
  Gavel,
  FileBox,
  Video,
  Bell,
  BarChart3,
  Users,
  Settings,
  LogOut,
  Menu,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { cn } from "@/lib/utils"
import { UserRole } from "@/types"

interface MainLayoutProps {
  children: React.ReactNode
  user: {
    name: string
    email: string
    role: UserRole
    avatarUrl?: string
  }
}

export function MainLayout({ children, user }: MainLayoutProps) {
  const pathname = usePathname()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  const navigation = [
    { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
    { name: "Cases", href: "/case", icon: FileText },
    { name: "Hearings", href: "/hearing", icon: Gavel },
    { name: "Documents", href: "/documents", icon: FileBox },
    { name: "Virtual Court", href: "/hearing/virtual", icon: Video },
    { name: "Notifications", href: "/notifications", icon: Bell },
    { name: "Analytics", href: "/analytics", icon: BarChart3 },
    { name: "Users", href: "/users", icon: Users, roles: [UserRole.ADMIN] },
    { name: "Settings", href: "/settings", icon: Settings },
  ]

  const filteredNavigation = navigation.filter((item) => !item.roles || item.roles.includes(user.role))

  return (
    <div className="min-h-screen bg-background">
      {/* Mobile menu */}
      <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
        <SheetTrigger asChild>
          <Button variant="ghost" size="icon" className="md:hidden fixed top-4 left-4 z-50">
            <Menu className="h-6 w-6" />
            <span className="sr-only">Open menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="p-0 w-64">
          <div className="flex flex-col h-full">
            <div className="flex items-center gap-2 p-4 border-b">
              <Scale className="h-6 w-6 text-primary" />
              <span className="font-bold text-lg">Digital Courtroom</span>
            </div>
            <nav className="flex-1 overflow-y-auto py-4">
              {filteredNavigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className={cn(
                    "flex items-center gap-3 px-4 py-3 text-sm font-medium",
                    pathname.startsWith(item.href)
                      ? "bg-primary/10 text-primary"
                      : "text-muted-foreground hover:bg-muted",
                  )}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <item.icon className="h-5 w-5" />
                  {item.name}
                </Link>
              ))}
            </nav>
            <div className="border-t p-4">
              <div className="flex items-center gap-3 mb-4">
                <Avatar>
                  <AvatarImage src={user.avatarUrl} />
                  <AvatarFallback>{user.name.substring(0, 2).toUpperCase()}</AvatarFallback>
                </Avatar>
                <div>
                  <p className="text-sm font-medium">{user.name}</p>
                  <p className="text-xs text-muted-foreground">{user.role}</p>
                </div>
              </div>
              <Button variant="outline" className="w-full" asChild>
                <Link href="/auth/logout">
                  <LogOut className="h-4 w-4 mr-2" />
                  Logout
                </Link>
              </Button>
            </div>
          </div>
        </SheetContent>
      </Sheet>

      {/* Desktop sidebar */}
      <div className="hidden md:fixed md:inset-y-0 md:flex md:w-64 md:flex-col">
        <div className="flex min-h-0 flex-1 flex-col border-r">
          <div className="flex items-center gap-2 h-16 px-4 border-b">
            <Scale className="h-6 w-6 text-primary" />
            <span className="font-bold text-lg">Digital Courtroom</span>
          </div>
          <div className="flex flex-1 flex-col overflow-y-auto">
            <nav className="flex-1 space-y-1 px-2 py-4">
              {filteredNavigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className={cn(
                    "group flex items-center px-2 py-2 text-sm font-medium rounded-md",
                    pathname.startsWith(item.href)
                      ? "bg-primary/10 text-primary"
                      : "text-muted-foreground hover:bg-muted",
                  )}
                >
                  <item.icon className="mr-3 h-5 w-5 flex-shrink-0" />
                  {item.name}
                </Link>
              ))}
            </nav>
          </div>
          <div className="border-t p-4">
            <div className="flex items-center gap-3 mb-4">
              <Avatar>
                <AvatarImage src={user.avatarUrl} />
                <AvatarFallback>{user.name.substring(0, 2).toUpperCase()}</AvatarFallback>
              </Avatar>
              <div>
                <p className="text-sm font-medium">{user.name}</p>
                <p className="text-xs text-muted-foreground">{user.role}</p>
              </div>
            </div>
            <Button variant="outline" className="w-full" asChild>
              <Link href="/auth/logout">
                <LogOut className="h-4 w-4 mr-2" />
                Logout
              </Link>
            </Button>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="md:pl-64">
        <header className="sticky top-0 z-10 bg-background border-b">
          <div className="flex h-16 items-center justify-between px-4 md:px-6">
            <div className="md:hidden">
              {/* Placeholder for mobile menu button */}
              <div className="w-6" />
            </div>
            <div className="flex items-center gap-4">
              <div className="relative">
                <Bell className="h-5 w-5 text-muted-foreground" />
                <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-primary text-[10px] text-primary-foreground">
                  3
                </span>
              </div>
              <div className="hidden md:block">
                <Avatar>
                  <AvatarImage src={user.avatarUrl} />
                  <AvatarFallback>{user.name.substring(0, 2).toUpperCase()}</AvatarFallback>
                </Avatar>
              </div>
            </div>
          </div>
        </header>
        <main className="p-4 md:p-6">{children}</main>
      </div>
    </div>
  )
}

