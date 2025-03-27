"use client"

import { useState } from "react"
import { MainLayout } from "@/components/layout/main-layout"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Download, Eye, FileText, Filter, MoreHorizontal, Search, Upload } from "lucide-react"
import { UserRole, DocumentType } from "@/types"

// Mock user data
const user = {
  name: "Justice Sharma",
  email: "justice.sharma@courts.gov.in",
  role: UserRole.JUDGE,
}

// Mock document data
const documents = [
  {
    id: "doc-001",
    title: "Charge Sheet - State vs. Williams",
    caseNumber: "CRM-2023-042",
    type: DocumentType.PETITION,
    uploadedBy: "Adv. Mehta",
    uploadedDate: new Date("2023-05-15"),
    fileSize: 2.4, // MB
    isPublic: false,
    version: 1,
  },
  {
    id: "doc-002",
    title: "Evidence Report - State vs. Williams",
    caseNumber: "CRM-2023-042",
    type: DocumentType.EVIDENCE,
    uploadedBy: "Officer Singh",
    uploadedDate: new Date("2023-05-18"),
    fileSize: 5.7, // MB
    isPublic: false,
    version: 2,
  },
  {
    id: "doc-003",
    title: "Witness Statement - State vs. Williams",
    caseNumber: "CRM-2023-042",
    type: DocumentType.AFFIDAVIT,
    uploadedBy: "Officer Singh",
    uploadedDate: new Date("2023-05-20"),
    fileSize: 1.2, // MB
    isPublic: false,
    version: 1,
  },
  {
    id: "doc-004",
    title: "Property Documents - Kumar Property Dispute",
    caseNumber: "CIV-2023-156",
    type: DocumentType.EVIDENCE,
    uploadedBy: "Adv. Gupta",
    uploadedDate: new Date("2023-04-10"),
    fileSize: 8.3, // MB
    isPublic: false,
    version: 1,
  },
  {
    id: "doc-005",
    title: "Divorce Petition - Patel Divorce Proceedings",
    caseNumber: "FAM-2023-103",
    type: DocumentType.PETITION,
    uploadedBy: "Adv. Sharma",
    uploadedDate: new Date("2023-03-15"),
    fileSize: 3.1, // MB
    isPublic: false,
    version: 1,
  },
  {
    id: "doc-006",
    title: "Financial Statement - Patel Divorce Proceedings",
    caseNumber: "FAM-2023-103",
    type: DocumentType.EVIDENCE,
    uploadedBy: "Adv. Sharma",
    uploadedDate: new Date("2023-03-18"),
    fileSize: 4.5, // MB
    isPublic: false,
    version: 2,
  },
  {
    id: "doc-007",
    title: "Court Order - ABC Corp vs. XYZ Ltd",
    caseNumber: "CRP-2023-027",
    type: DocumentType.ORDER,
    uploadedBy: "Justice Sharma",
    uploadedDate: new Date("2023-05-05"),
    fileSize: 1.8, // MB
    isPublic: true,
    version: 1,
  },
]

export default function DocumentsPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [typeFilter, setTypeFilter] = useState<string>("all")
  const [caseFilter, setCaseFilter] = useState<string>("all")

  const filteredDocuments = documents.filter((doc) => {
    const matchesSearch =
      doc.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      doc.caseNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      doc.uploadedBy.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesType = typeFilter === "all" || doc.type === typeFilter
    const matchesCase = caseFilter === "all" || doc.caseNumber === caseFilter

    return matchesSearch && matchesType && matchesCase
  })

  // Get unique case numbers for filter
  const uniqueCases = Array.from(new Set(documents.map((doc) => doc.caseNumber)))

  return (
    <MainLayout user={user}>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold tracking-tight">Document Repository</h1>
          <Button asChild>
            <a href="/documents/upload">
              <Upload className="h-4 w-4 mr-2" />
              Upload Document
            </a>
          </Button>
        </div>

        <Tabs defaultValue="all" className="space-y-4">
          <div className="flex justify-between items-center">
            <TabsList>
              <TabsTrigger value="all">All Documents</TabsTrigger>
              <TabsTrigger value="recent">Recently Uploaded</TabsTrigger>
              <TabsTrigger value="my-uploads">My Uploads</TabsTrigger>
              <TabsTrigger value="public">Public Documents</TabsTrigger>
            </TabsList>

            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm">
                <Filter className="h-4 w-4 mr-2" />
                Advanced Filters
              </Button>
            </div>
          </div>

          <Card>
            <CardContent className="p-6">
              <div className="flex flex-col md:flex-row gap-4 mb-6">
                <div className="relative flex-1">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search documents..."
                    className="pl-8"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
                <div className="flex gap-4">
                  <Select value={typeFilter} onValueChange={setTypeFilter}>
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Filter by type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Types</SelectItem>
                      <SelectItem value={DocumentType.PETITION}>Petition</SelectItem>
                      <SelectItem value={DocumentType.EVIDENCE}>Evidence</SelectItem>
                      <SelectItem value={DocumentType.AFFIDAVIT}>Affidavit</SelectItem>
                      <SelectItem value={DocumentType.JUDGMENT}>Judgment</SelectItem>
                      <SelectItem value={DocumentType.ORDER}>Order</SelectItem>
                      <SelectItem value={DocumentType.NOTICE}>Notice</SelectItem>
                      <SelectItem value={DocumentType.OTHER}>Other</SelectItem>
                    </SelectContent>
                  </Select>

                  <Select value={caseFilter} onValueChange={setCaseFilter}>
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Filter by case" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Cases</SelectItem>
                      {uniqueCases.map((caseNumber) => (
                        <SelectItem key={caseNumber} value={caseNumber}>
                          {caseNumber}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Document Title</TableHead>
                      <TableHead>Case Number</TableHead>
                      <TableHead>Type</TableHead>
                      <TableHead>Uploaded By</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead>Size</TableHead>
                      <TableHead>Version</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredDocuments.length === 0 ? (
                      <TableRow>
                        <TableCell colSpan={8} className="text-center py-8 text-muted-foreground">
                          No documents found matching your filters
                        </TableCell>
                      </TableRow>
                    ) : (
                      filteredDocuments.map((doc) => (
                        <TableRow key={doc.id}>
                          <TableCell className="font-medium">{doc.title}</TableCell>
                          <TableCell>{doc.caseNumber}</TableCell>
                          <TableCell>{doc.type}</TableCell>
                          <TableCell>{doc.uploadedBy}</TableCell>
                          <TableCell>{formatDate(doc.uploadedDate)}</TableCell>
                          <TableCell>{doc.fileSize} MB</TableCell>
                          <TableCell>v{doc.version}</TableCell>
                          <TableCell className="text-right">
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button variant="ghost" size="icon">
                                  <MoreHorizontal className="h-4 w-4" />
                                  <span className="sr-only">Open menu</span>
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end">
                                <DropdownMenuItem>
                                  <Eye className="h-4 w-4 mr-2" />
                                  View Document
                                </DropdownMenuItem>
                                <DropdownMenuItem>
                                  <Download className="h-4 w-4 mr-2" />
                                  Download
                                </DropdownMenuItem>
                                <DropdownMenuItem>
                                  <FileText className="h-4 w-4 mr-2" />
                                  View History
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
                  Showing <strong>{filteredDocuments.length}</strong> of <strong>{documents.length}</strong> documents
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

function formatDate(date: Date): string {
  return new Intl.DateTimeFormat("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  }).format(date)
}

