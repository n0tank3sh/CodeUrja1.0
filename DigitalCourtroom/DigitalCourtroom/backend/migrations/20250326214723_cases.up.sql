-- Add up migration script here
CREATE TABLE IF NOT EXISTS cases (
    case_number SERIAL PRIMARY KEY, -- Unique case number (auto-incremented)
    title VARCHAR(255) NOT NULL, -- Title of the case
    type_ VARCHAR(100) NOT NULL, -- Type of the case (e.g., civil, criminal)
    status VARCHAR(50) NOT NULL, -- Status of the case (e.g., open, closed, pending)
    filing_date TEXT NOT NULL, -- Filing date of the case
    next_hearing TEXT, -- Next hearing date (nullable)
    actions TEXT, -- Actions or notes related to the case
    created_at TEXT NOT NULL DEFAULT NOW()
);
