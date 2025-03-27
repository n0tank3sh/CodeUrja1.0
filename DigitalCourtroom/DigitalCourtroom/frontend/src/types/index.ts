// User Types
export enum UserRole {
  JUDGE = "JUDGE",
  LAWYER = "LAWYER",
  COURT_STAFF = "COURT_STAFF",
  CITIZEN = "CITIZEN",
  ADMIN = "ADMIN",
}

export interface User {
  id: string
  name: string
  email: string
  role: UserRole
  barId?: string // For lawyers
  courtId?: string // For judges and court staff
  createdAt: Date
  updatedAt: Date
}

// Case Types
export enum CaseStatus {
  FILED = "FILED",
  PENDING = "PENDING",
  IN_PROGRESS = "IN_PROGRESS",
  SCHEDULED = "SCHEDULED",
  ADJOURNED = "ADJOURNED",
  DISPOSED = "DISPOSED",
  CLOSED = "CLOSED",
}

export enum CaseType {
  CIVIL = "CIVIL",
  CRIMINAL = "CRIMINAL",
  FAMILY = "FAMILY",
  CORPORATE = "CORPORATE",
  CONSTITUTIONAL = "CONSTITUTIONAL",
  OTHER = "OTHER",
}

export interface Case {
  id: string
  caseNumber: string
  title: string
  description: string
  type: CaseType
  status: CaseStatus
  filingDate: Date
  plaintiffs: string[] // IDs of involved parties
  defendants: string[] // IDs of involved parties
  judgerId?: string
  courtId: string
  createdAt: Date
  updatedAt: Date
}

// Hearing Types
export enum HearingType {
  PHYSICAL = "PHYSICAL",
  VIRTUAL = "VIRTUAL",
  HYBRID = "HYBRID",
}

export enum HearingStatus {
  SCHEDULED = "SCHEDULED",
  IN_PROGRESS = "IN_PROGRESS",
  COMPLETED = "COMPLETED",
  ADJOURNED = "ADJOURNED",
  CANCELLED = "CANCELLED",
}

export interface Hearing {
  id: string
  caseId: string
  scheduledDate: Date
  actualDate?: Date
  type: HearingType
  status: HearingStatus
  location: string // Court room or virtual link
  notes?: string
  attendees: string[] // IDs of attendees
  createdAt: Date
  updatedAt: Date
}

// Document Types
export enum DocumentType {
  PETITION = "PETITION",
  EVIDENCE = "EVIDENCE",
  AFFIDAVIT = "AFFIDAVIT",
  JUDGMENT = "JUDGMENT",
  ORDER = "ORDER",
  NOTICE = "NOTICE",
  OTHER = "OTHER",
}

export interface Document {
  id: string
  caseId: string
  title: string
  type: DocumentType
  fileUrl: string
  fileSize: number
  mimeType: string
  uploadedBy: string // User ID
  isPublic: boolean
  version: number
  createdAt: Date
  updatedAt: Date
}

// Notification Types
export enum NotificationType {
  CASE_UPDATE = "CASE_UPDATE",
  HEARING_SCHEDULED = "HEARING_SCHEDULED",
  HEARING_RESCHEDULED = "HEARING_RESCHEDULED",
  DOCUMENT_UPLOADED = "DOCUMENT_UPLOADED",
  SUMMONS = "SUMMONS",
  JUDGMENT_DELIVERED = "JUDGMENT_DELIVERED",
  OTHER = "OTHER",
}

export interface Notification {
  id: string
  userId: string
  type: NotificationType
  title: string
  message: string
  relatedId?: string // ID of related entity (case, hearing, etc.)
  isRead: boolean
  createdAt: Date
}

// Court Types
export interface Court {
  id: string
  name: string
  type: string
  address: string
  jurisdiction: string
  contactNumber: string
  email: string
  createdAt: Date
  updatedAt: Date
}

// Analytics Types
export interface CaseAnalytics {
  totalCases: number
  pendingCases: number
  disposedCases: number
  averageDisposalTime: number // in days
  casesByType: Record<CaseType, number>
  casesByStatus: Record<CaseStatus, number>
  monthlyCaseFiling: { month: string; count: number }[]
}

export interface CourtAnalytics {
  totalHearings: number
  completedHearings: number
  adjournedHearings: number
  averageHearingDuration: number // in minutes
  hearingsByType: Record<HearingType, number>
  courtUtilization: number // percentage
}

