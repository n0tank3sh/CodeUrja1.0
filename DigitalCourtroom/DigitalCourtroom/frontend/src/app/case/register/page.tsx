"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { MainLayout } from "@/components/layout/main-layout"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { UserRole, CaseType } from "@/types"
import { CalendarIcon, ChevronLeft, FileUp, Plus, Trash2 } from "lucide-react"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { format } from "date-fns"

// Mock user data
const user = {
  name: "Justice Sharma",
  email: "justice.sharma@courts.gov.in",
  role: UserRole.JUDGE,
}

export default function RegisterCasePage() {
  const router = useRouter()
  const [activeTab, setActiveTab] = useState("details")
  const [filingDate, setFilingDate] = useState<Date | undefined>(new Date())
  const [plaintiffs, setPlaintiffs] = useState([{ name: "", address: "", contact: "" }])
  const [defendants, setDefendants] = useState([{ name: "", address: "", contact: "" }])
  const [documents, setDocuments] = useState<{ name: string; type: string; file?: File }[]>([])
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleAddPlaintiff = () => {
    setPlaintiffs([...plaintiffs, { name: "", address: "", contact: "" }])
  }

  const handleRemovePlaintiff = (index: number) => {
    if (plaintiffs.length > 1) {
      setPlaintiffs(plaintiffs.filter((_, i) => i !== index))
    }
  }

  const handleAddDefendant = () => {
    setDefendants([...defendants, { name: "", address: "", contact: "" }])
  }

  const handleRemoveDefendant = (index: number) => {
    if (defendants.length > 1) {
      setDefendants(defendants.filter((_, i) => i !== index))
    }
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0]
      setDocuments([...documents, { name: file.name, type: "PETITION", file }])
    }
  }

  const handleRemoveDocument = (index: number) => {
    setDocuments(documents.filter((_, i) => i !== index))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false)
      router.push("/case")
    }, 2000)
  }

  return (
    <MainLayout user={user}>
      <div className="space-y-6">
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" onClick={() => router.back()} className="h-8 w-8">
            <ChevronLeft className="h-4 w-4" />
            <span className="sr-only">Back</span>
          </Button>
          <h1 className="text-3xl font-bold tracking-tight">Register New Case</h1>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Case Registration Form</CardTitle>
            <CardDescription>Enter the details of the new case to be registered in the system</CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
              <TabsList className="grid grid-cols-3 w-full">
                <TabsTrigger value="details">Case Details</TabsTrigger>
                <TabsTrigger value="parties">Parties</TabsTrigger>
                <TabsTrigger value="documents">Documents</TabsTrigger>
              </TabsList>

              <form onSubmit={handleSubmit}>
                <TabsContent value="details" className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="caseTitle">Case Title</Label>
                      <Input id="caseTitle" placeholder="Enter case title" required />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="caseType">Case Type</Label>
                      <Select defaultValue={CaseType.CIVIL}>
                        <SelectTrigger id="caseType">
                          <SelectValue placeholder="Select case type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value={CaseType.CIVIL}>Civil</SelectItem>
                          <SelectItem value={CaseType.CRIMINAL}>Criminal</SelectItem>
                          <SelectItem value={CaseType.FAMILY}>Family</SelectItem>
                          <SelectItem value={CaseType.CORPORATE}>Corporate</SelectItem>
                          <SelectItem value={CaseType.CONSTITUTIONAL}>Constitutional</SelectItem>
                          <SelectItem value={CaseType.OTHER}>Other</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="filingDate">Filing Date</Label>
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button variant="outline" className="w-full justify-start text-left font-normal">
                            <CalendarIcon className="mr-2 h-4 w-4" />
                            {filingDate ? format(filingDate, "PPP") : "Select date"}
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0">
                          <Calendar mode="single" selected={filingDate} onSelect={setFilingDate} initialFocus />
                        </PopoverContent>
                      </Popover>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="court">Court</Label>
                      <Select defaultValue="district-court-1">
                        <SelectTrigger id="court">
                          <SelectValue placeholder="Select court" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="district-court-1">District Court 1</SelectItem>
                          <SelectItem value="district-court-2">District Court 2</SelectItem>
                          <SelectItem value="high-court">High Court</SelectItem>
                          <SelectItem value="family-court">Family Court</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2 md:col-span-2">
                      <Label htmlFor="description">Case Description</Label>
                      <Textarea
                        id="description"
                        placeholder="Enter detailed description of the case"
                        rows={5}
                        required
                      />
                    </div>
                  </div>

                  <div className="flex justify-end">
                    <Button type="button" onClick={() => setActiveTab("parties")}>
                      Next: Parties
                    </Button>
                  </div>
                </TabsContent>

                <TabsContent value="parties" className="space-y-6">
                  <div className="space-y-6">
                    <div>
                      <div className="flex items-center justify-between mb-4">
                        <h3 className="text-lg font-medium">Plaintiffs / Petitioners</h3>
                        <Button type="button" variant="outline" size="sm" onClick={handleAddPlaintiff}>
                          <Plus className="h-4 w-4 mr-2" />
                          Add Plaintiff
                        </Button>
                      </div>

                      {plaintiffs.map((plaintiff, index) => (
                        <div
                          key={index}
                          className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6 pb-6 border-b last:border-0"
                        >
                          <div className="space-y-2">
                            <Label htmlFor={`plaintiff-name-${index}`}>Name</Label>
                            <Input
                              id={`plaintiff-name-${index}`}
                              value={plaintiff.name}
                              onChange={(e) => {
                                const newPlaintiffs = [...plaintiffs]
                                newPlaintiffs[index].name = e.target.value
                                setPlaintiffs(newPlaintiffs)
                              }}
                              placeholder="Full name"
                              required
                            />
                          </div>

                          <div className="space-y-2">
                            <Label htmlFor={`plaintiff-address-${index}`}>Address</Label>
                            <Input
                              id={`plaintiff-address-${index}`}
                              value={plaintiff.address}
                              onChange={(e) => {
                                const newPlaintiffs = [...plaintiffs]
                                newPlaintiffs[index].address = e.target.value
                                setPlaintiffs(newPlaintiffs)
                              }}
                              placeholder="Full address"
                              required
                            />
                          </div>

                          <div className="space-y-2 flex items-end gap-2">
                            <div className="flex-1">
                              <Label htmlFor={`plaintiff-contact-${index}`}>Contact</Label>
                              <Input
                                id={`plaintiff-contact-${index}`}
                                value={plaintiff.contact}
                                onChange={(e) => {
                                  const newPlaintiffs = [...plaintiffs]
                                  newPlaintiffs[index].contact = e.target.value
                                  setPlaintiffs(newPlaintiffs)
                                }}
                                placeholder="Phone number"
                                required
                              />
                            </div>
                            {plaintiffs.length > 1 && (
                              <Button
                                type="button"
                                variant="destructive"
                                size="icon"
                                onClick={() => handleRemovePlaintiff(index)}
                              >
                                <Trash2 className="h-4 w-4" />
                                <span className="sr-only">Remove</span>
                              </Button>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>

                    <div>
                      <div className="flex items-center justify-between mb-4">
                        <h3 className="text-lg font-medium">Defendants / Respondents</h3>
                        <Button type="button" variant="outline" size="sm" onClick={handleAddDefendant}>
                          <Plus className="h-4 w-4 mr-2" />
                          Add Defendant
                        </Button>
                      </div>

                      {defendants.map((defendant, index) => (
                        <div
                          key={index}
                          className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6 pb-6 border-b last:border-0"
                        >
                          <div className="space-y-2">
                            <Label htmlFor={`defendant-name-${index}`}>Name</Label>
                            <Input
                              id={`defendant-name-${index}`}
                              value={defendant.name}
                              onChange={(e) => {
                                const newDefendants = [...defendants]
                                newDefendants[index].name = e.target.value
                                setDefendants(newDefendants)
                              }}
                              placeholder="Full name"
                              required
                            />
                          </div>

                          <div className="space-y-2">
                            <Label htmlFor={`defendant-address-${index}`}>Address</Label>
                            <Input
                              id={`defendant-address-${index}`}
                              value={defendant.address}
                              onChange={(e) => {
                                const newDefendants = [...defendants]
                                newDefendants[index].address = e.target.value
                                setDefendants(newDefendants)
                              }}
                              placeholder="Full address"
                              required
                            />
                          </div>

                          <div className="space-y-2 flex items-end gap-2">
                            <div className="flex-1">
                              <Label htmlFor={`defendant-contact-${index}`}>Contact</Label>
                              <Input
                                id={`defendant-contact-${index}`}
                                value={defendant.contact}
                                onChange={(e) => {
                                  const newDefendants = [...defendants]
                                  newDefendants[index].contact = e.target.value
                                  setDefendants(newDefendants)
                                }}
                                placeholder="Phone number"
                                required
                              />
                            </div>
                            {defendants.length > 1 && (
                              <Button
                                type="button"
                                variant="destructive"
                                size="icon"
                                onClick={() => handleRemoveDefendant(index)}
                              >
                                <Trash2 className="h-4 w-4" />
                                <span className="sr-only">Remove</span>
                              </Button>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="flex justify-between">
                    <Button type="button" variant="outline" onClick={() => setActiveTab("details")}>
                      Previous: Details
                    </Button>
                    <Button type="button" onClick={() => setActiveTab("documents")}>
                      Next: Documents
                    </Button>
                  </div>
                </TabsContent>

                <TabsContent value="documents" className="space-y-6">
                  <div className="space-y-6">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-lg font-medium">Case Documents</h3>
                      <div>
                        <input type="file" id="document-upload" className="sr-only" onChange={handleFileChange} />
                        <Label htmlFor="document-upload" asChild>
                          <Button type="button" variant="outline" size="sm" className="cursor-pointer">
                            <FileUp className="h-4 w-4 mr-2" />
                            Upload Document
                          </Button>
                        </Label>
                      </div>
                    </div>

                    {documents.length === 0 ? (
                      <div className="text-center py-8 border rounded-md">
                        <p className="text-muted-foreground">No documents uploaded yet</p>
                        <p className="text-sm text-muted-foreground mt-1">Upload at least one document to proceed</p>
                      </div>
                    ) : (
                      <div className="space-y-4">
                        {documents.map((doc, index) => (
                          <div key={index} className="flex items-center justify-between p-4 border rounded-md">
                            <div className="flex items-center gap-3">
                              <FileUp className="h-5 w-5 text-muted-foreground" />
                              <div>
                                <p className="font-medium">{doc.name}</p>
                                <p className="text-sm text-muted-foreground">
                                  {doc.file ? `${(doc.file.size / 1024 / 1024).toFixed(2)} MB` : "Unknown size"}
                                </p>
                              </div>
                            </div>
                            <div className="flex items-center gap-2">
                              <Select
                                defaultValue={doc.type}
                                onValueChange={(value) => {
                                  const newDocs = [...documents]
                                  newDocs[index].type = value
                                  setDocuments(newDocs)
                                }}
                              >
                                <SelectTrigger className="w-[180px]">
                                  <SelectValue placeholder="Document type" />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="PETITION">Petition</SelectItem>
                                  <SelectItem value="EVIDENCE">Evidence</SelectItem>
                                  <SelectItem value="AFFIDAVIT">Affidavit</SelectItem>
                                  <SelectItem value="OTHER">Other</SelectItem>
                                </SelectContent>
                              </Select>
                              <Button
                                type="button"
                                variant="destructive"
                                size="icon"
                                onClick={() => handleRemoveDocument(index)}
                              >
                                <Trash2 className="h-4 w-4" />
                                <span className="sr-only">Remove</span>
                              </Button>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  <div className="flex justify-between">
                    <Button type="button" variant="outline" onClick={() => setActiveTab("parties")}>
                      Previous: Parties
                    </Button>
                    <Button type="submit" disabled={isSubmitting || documents.length === 0}>
                      {isSubmitting ? "Registering Case..." : "Register Case"}
                    </Button>
                  </div>
                </TabsContent>
              </form>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </MainLayout>
  )
}

