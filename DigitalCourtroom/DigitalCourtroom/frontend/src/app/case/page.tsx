"use client"

import { useState } from "react"
import Link from "next/link"
import { MainLayout } from "@/components/layout/main-layout"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { FileText, Filter, MoreHorizontal, Plus, Search } from "lucide-react"
import { UserRole, CaseStatus, CaseType } from "@/types"

// Mock user data
const user = {
  name: "Justice Sharma",
  email: "justice.sharma@courts.gov.in",
  role: UserRole.JUDGE,
}

// Mock case data
const cases = [
  {
    id: "case-001",
    caseNumber: "CIV-2023-001",
    title: "Smith vs. Johnson",
    type: CaseType.CIVIL,
    status: CaseStatus.IN_PROGRESS,
    filingDate: new Date("2023-01-15"),
    nextHearing: new Date("2023-06-20"),
    parties: "John Smith, Sarah Johnson",
  },
  {
    id: "case-002",
    caseNumber: "CRM-2023-042",
    title: "State vs. Williams",
    type: CaseType.CRIMINAL,
    status: CaseStatus.SCHEDULED,
    filingDate: new Date("2023-02-28"),
    nextHearing: new Date("2023-06-18"),
    parties: "State, Robert Williams",
  },
  {
    id: "case-003",
    caseNumber: "FAM-2023-103",
    title: "Patel Divorce Proceedings",
    type: CaseType.FAMILY,
    status: CaseStatus.PENDING,
    filingDate: new Date("2023-03-10"),
    nextHearing: new Date("2023-06-25"),
    parties: "Raj Patel, Priya Patel",
  },
  {
    id: "case-004",
    caseNumber: "CIV-2023-156",
    title: "Kumar Property Dispute",
    type: CaseType.CIVIL,
    status: CaseStatus.ADJOURNED,
    filingDate: new Date("2023-01-05"),
    nextHearing: new Date("2023-07-12"),
    parties: "Amit Kumar, Vijay Kumar",
  },
  {
    id: "case-005",
    caseNumber: "CRM-2023-089",
    title: "State vs. Sharma & Others",
    type: CaseType.CRIMINAL,
    status: CaseStatus.IN_PROGRESS,
    filingDate: new Date("2023-04-18"),
    nextHearing: new Date("2023-06-30"),
    parties: "State, Rahul Sharma, Vikram Singh",
  },
  {
    id: "case-006",
    caseNumber: "CRP-2023-027",
    title: "ABC Corp vs. XYZ Ltd",
    type: CaseType.CORPORATE,
    status: CaseStatus.SCHEDULED,
    filingDate: new Date("2023-05-02"),
    nextHearing: new Date("2023-07-05"),
    parties: "ABC Corporation, XYZ Limited",
  },
  {
    id: "case-007",
    caseNumber: "CON-2023-003",
    title: "Public Interest Litigation",
    type: CaseType.CONSTITUTIONAL,
    status: CaseStatus.PENDING,
    filingDate: new Date("2023-03-25"),
    nextHearing: null,
    parties: "Citizens Association, State Government",
  },
]

export default function CasesPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState<string>("all")
  const [typeFilter, setTypeFilter] = useState<string>("all")

  const filteredCases = cases.filter((c) => {
    const matchesSearch =
      c.caseNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.parties.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesStatus = statusFilter === "all" || c.status === statusFilter
    const matchesType = typeFilter === "all" || c.type === typeFilter

    return matchesSearch && matchesStatus && matchesType
  })

  return (
    <MainLayout user={user}>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold tracking-tight">Case Management</h1>
          <Button asChild>
            <Link href="/case/register">
              <Plus className="h-4 w-4 mr-2" />
              Register New Case
            </Link>
          </Button>
        </div>

        <Tabs defaultValue="all" className="space-y-4">
          <div className="flex justify-between items-center">
            <TabsList>
              <TabsTrigger value="all">All Cases</TabsTrigger>
              <TabsTrigger value="active">Active</TabsTrigger>
              <TabsTrigger value="scheduled">Scheduled</TabsTrigger>
              <TabsTrigger value="disposed">Disposed</TabsTrigger>
            </TabsList>

            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm">
                <Filter className="h-4 w-4 mr-2" />
                Advanced Filters
              </Button>
              <Button variant="outline" size="icon">
                <FileText className="h-4 w-4" />
              </Button>
            </div>
          </div>

          <Card>
            <CardContent className="p-6">
              <div className="flex flex-col md:flex-row gap-4 mb-6">
                <div className="relative flex-1">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search by case number, title, or parties..."
                    className="pl-8"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
                <div className="flex gap-4">
                  <Select value={statusFilter} onValueChange={setStatusFilter}>
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Filter by status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Statuses</SelectItem>
                      <SelectItem value={CaseStatus.FILED}>Filed</SelectItem>
                      <SelectItem value={CaseStatus.PENDING}>Pending</SelectItem>
                      <SelectItem value={CaseStatus.IN_PROGRESS}>In Progress</SelectItem>
                      <SelectItem value={CaseStatus.SCHEDULED}>Scheduled</SelectItem>
                      <SelectItem value={CaseStatus.ADJOURNED}>Adjourned</SelectItem>
                      <SelectItem value={CaseStatus.DISPOSED}>Disposed</SelectItem>
                      <SelectItem value={CaseStatus.CLOSED}>Closed</SelectItem>
                    </SelectContent>
                  </Select>

                  <Select value={typeFilter} onValueChange={setTypeFilter}>
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Filter by type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Types</SelectItem>
                      <SelectItem value={CaseType.CIVIL}>Civil</SelectItem>
                      <SelectItem value={CaseType.CRIMINAL}>Criminal</SelectItem>
                      <SelectItem value={CaseType.FAMILY}>Family</SelectItem>
                      <SelectItem value={CaseType.CORPORATE}>Corporate</SelectItem>
                      <SelectItem value={CaseType.CONSTITUTIONAL}>Constitutional</SelectItem>
                      <SelectItem value={CaseType.OTHER}>Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Case Number</TableHead>
                      <TableHead>Title</TableHead>
                      <TableHead>Type</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Filing Date</TableHead>
                      <TableHead>Next Hearing</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredCases.length === 0 ? (
                      <TableRow>
                        <TableCell colSpan={7} className="text-center py-8 text-muted-foreground">
                          No cases found matching your filters
                        </TableCell>
                      </TableRow>
                    ) : (
                      filteredCases.map((c) => (
                        <TableRow key={c.id}>
                          <TableCell className="font-medium">{c.caseNumber}</TableCell>
                          <TableCell>{c.title}</TableCell>
                          <TableCell>{c.type}</TableCell>
                          <TableCell>
                            <CaseStatusBadge status={c.status} />
                          </TableCell>
                          <TableCell>{formatDate(c.filingDate)}</TableCell>
                          <TableCell>{c.nextHearing ? formatDate(c.nextHearing) : "Not scheduled"}</TableCell>
                          <TableCell className="text-right">
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button variant="ghost" size="icon">
                                  <MoreHorizontal className="h-4 w-4" />
                                  <span className="sr-only">Open menu</span>
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end">
                                <DropdownMenuItem asChild>
                                  <Link href={`/case/${c.id}`}>View Details</Link>
                                </DropdownMenuItem>
                                <DropdownMenuItem asChild>
                                  <Link href={`/case/${c.id}/schedule`}>Schedule Hearing</Link>
                                </DropdownMenuItem>
                                <DropdownMenuItem asChild>
                                  <Link href={`/case/${c.id}/documents`}>View Documents</Link>
                                </DropdownMenuItem>
                                <DropdownMenuItem asChild>
                                  <Link href={`/case/${c.id}/history`}>View History</Link>
                                </DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </TableCell>
                        </TableRow>
                      ))
                    )}
                  </TableBody>
                </Table>
              </div>

              <div className="flex items-center justify-between mt-4">
                <div className="text-sm text-muted-foreground">
                  Showing <strong>{filteredCases.length}</strong> of <strong>{cases.length}</strong> cases
                </div>
                <div className="flex items-center gap-2">
                  <Button variant="outline" size="sm" disabled>
                    Previous
                  </Button>
                  <Button variant="outline" size="sm">
                    Next
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </Tabs>
      </div>
    </MainLayout>
  )
}

function CaseStatusBadge({ status }: { status: CaseStatus }) {
  const getStatusConfig = (status: CaseStatus) => {
    switch (status) {
      case CaseStatus.FILED:
        return { label: "Filed", className: "bg-blue-100 text-blue-800" }
      case CaseStatus.PENDING:
        return { label: "Pending", className: "bg-yellow-100 text-yellow-800" }
      case CaseStatus.IN_PROGRESS:
        return { label: "In Progress", className: "bg-purple-100 text-purple-800" }
      case CaseStatus.SCHEDULED:
        return { label: "Scheduled", className: "bg-indigo-100 text-indigo-800" }
      case CaseStatus.ADJOURNED:
        return { label: "Adjourned", className: "bg-orange-100 text-orange-800" }
      case CaseStatus.DISPOSED:
        return { label: "Disposed", className: "bg-green-100 text-green-800" }
      case CaseStatus.CLOSED:
        return { label: "Closed", className: "bg-gray-100 text-gray-800" }
      default:
        return { label: status, className: "bg-gray-100 text-gray-800" }
    }
  }

  const { label, className } = getStatusConfig(status)

  return <span className={`px-2 py-1 rounded-full text-xs font-medium ${className}`}>{label}</span>
}

function formatDate(date: Date): string {
  return new Intl.DateTimeFormat("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  }).format(date)
}

